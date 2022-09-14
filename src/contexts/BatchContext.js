import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';

const BatchContext = createContext({});

export const BatchProvider = ({ children }) => {
  const createBatch = async (code) => {
    return axiosInstance.post(apiEndpoints.create_batch, code).then((response) => {
      if (response.status === 200 && response.data.return === 200) return response.data.url;
      return false;
    });
  };
  const activeCode = async (code) => {
    return axiosInstance
      .post(apiEndpoints.active_code, {
        outputtype: 'RawJson',
        ...code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const activeBatch = async (code) => {
    return axiosInstance
      .post(apiEndpoints.active_batch, {
        outputtype: 'RawJson',
        ...code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const downloadBatch = async (id) => {
    return axiosInstance
      .post(apiEndpoints.download_batch, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return  response.data.url;
        return false;
      });
  };

  return (
    <BatchContext.Provider
      value={{
        createBatch,
        activeCode,
        activeBatch,
        downloadBatch
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export default BatchContext;
