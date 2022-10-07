import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const MarketingContext = createContext({});

export const MarketingProvider = ({ children }) => {
  const { setView } = useView();

  const getBatchDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_batch_detail, {
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

  const createBatch = async (batch) => {
    return axiosInstance.post(apiEndpoints.create_batch, { outputtype: 'RawJson', ...batch }).then((response) => {
      return response.data;
    });
  };

  const updateBatch = async (batch) => {
    return axiosInstance.post(apiEndpoints.update_batch, { outputtype: 'RawJson', ...batch }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const generateVoucher = async (id) => {
    return axiosInstance.post(apiEndpoints.generate_voucher, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const sendEmailVoucher = async (id) => {
    return axiosInstance.post(apiEndpoints.send_email_voucher, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  return (
    <MarketingContext.Provider
      value={{
        getBatchDetail,
        updateBatch,
        createBatch,
        generateVoucher,
        sendEmailVoucher,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};

export default MarketingContext;
