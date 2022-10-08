import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const AccountContext = createContext({});

export const AccountProvider = ({ children }) => {
  const { setView } = useView();

  const getAccountDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_account_detail, {
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
  const getAllTask = async () => {
    return axiosInstance
      .post(apiEndpoints.get_all_task, {
        outputtype: 'RawJson',
        company_id: null,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const getAllUser = async () => {
    return axiosInstance
      .post(apiEndpoints.get_all_account_list, {
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };
  const createAccount = async (account) => {
    return axiosInstance.post(apiEndpoints.create_account, account).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };
  const activeAccount = async (account) => {
    return axiosInstance
      .post(apiEndpoints.active_account, {
        outputtype: 'RawJson',
        ...account,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };
  const updateAccount = async (account) => {
    return axiosInstance.post(apiEndpoints.update_account, account).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  return (
    <AccountContext.Provider
      value={{
        getAccountDetail,
        createAccount,
        updateAccount,
        activeAccount,
        getAllTask,
        getAllUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
