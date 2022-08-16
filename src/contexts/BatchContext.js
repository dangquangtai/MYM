import React, { createContext } from 'react';
import { vibEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';

const BatchContext = createContext({});

export const BatchProvider = ({ children }) => {
  const createBatch = async (code) => {
    return axiosInstance.post(vibEndpoints.create_batch, code).then((response) => {
      if (response.status === 200 && response.data.return === 200) return response.data.url;
      return false;
    });
  };
  const activeCode = async (code) => {
    return axiosInstance
      .post(vibEndpoints.active_code, {
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
      .post(vibEndpoints.active_batch, {
        outputtype: 'RawJson',
        ...code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  return (
    <BatchContext.Provider
      value={{
        createBatch,
        activeCode,
        activeBatch
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export default BatchContext;
