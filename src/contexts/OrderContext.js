import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { setView } = useView();

  const getOrderDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_order_detai, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const processPaymentOrder = async (id) => {
    return axiosInstance
      .post(apiEndpoints.approve_pending_order, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return true;
        } else return false;
      });
  };


  return (
    <OrderContext.Provider
      value={{
        getOrderDetail,
        processPaymentOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
