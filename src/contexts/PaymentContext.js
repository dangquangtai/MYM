import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
  const { setView } = useView();

  const getCardBatchDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_prepaid_card_batch_detail, { outputtype: 'RawJson', id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createCardBatch = async (data) => {
    return axiosInstance
      .post(apiEndpoints.create_prepaid_card_batch, {
        outputtype: 'RawJson',
        ...data,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const updateCardBatch = async (data) => {
    return axiosInstance
      .post(apiEndpoints.update_prepaid_card_batch, {
        outputtype: 'RawJson',
        ...data,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const generateCard = async (id) => {
    return axiosInstance.post(apiEndpoints.generate_prepaid_card, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const sendEmailCard = async (id) => {
    return axiosInstance.post(apiEndpoints.send_email_prepaid_card, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const assignCard = async (data) => {
    return axiosInstance.post(apiEndpoints.assign_prepaid_card, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getCardBatchList = async (page = 1, no_item_per_page = 100, search_text = '') => {
    return axiosInstance
      .post(apiEndpoints.get_all_prepaid_card_batch, { outputtype: 'RawJson', page, no_item_per_page, search_text })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  return (
    <PaymentContext.Provider
      value={{
        getCardBatchDetail,
        createCardBatch,
        generateCard,
        sendEmailCard,
        assignCard,
        getCardBatchList,
        updateCardBatch,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
