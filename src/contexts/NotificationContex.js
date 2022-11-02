import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const { setView } = useView();
  const getNotificatonCategoryList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_all_notification_category, { guest: 'true', outputtype: 'RawJson' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };

  const getDetailNotificatonCategory = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_detail_notification_category, { outputtype: 'RawJson', id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const create_notification_category = async (notificationCategory) => {
    return axiosInstance
      .post(apiEndpoints.create_notification_category, { outputtype: 'RawJson', ...notificationCategory })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };
  const update_notification_category = async (notificationCategory) => {
    return axiosInstance
      .post(apiEndpoints.update_notification_category, { outputtype: 'RawJson', ...notificationCategory })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const getNotificatonMessageList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_all_notification_category, { guest: 'true', outputtype: 'RawJson' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };

  const getDetailNotificatonMessage = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_detail_notification_message, { outputtype: 'RawJson', id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const createNotificationMessage = async (notificationMessage) => {
    return axiosInstance
      .post(apiEndpoints.create_notification_message, { outputtype: 'RawJson', ...notificationMessage })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };
  const updateNotificationMessage = async (notificationMessage) => {
    return axiosInstance
      .post(apiEndpoints.update_notification_message, { outputtype: 'RawJson', ...notificationMessage })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const addGroup = async (data) => {
    return axiosInstance
      .post(apiEndpoints.add_group_notificaton_message, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return response.data.group_id;
        return false;
      });
  };

  const removeGroup = async (data) => {
    return axiosInstance
      .post(apiEndpoints.remove_group_notificaton_message, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return response.data.group_id;
        return false;
      });
  };
  const getAllCategory = async () => {
    return axiosInstance.post(apiEndpoints.get_all_category, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };
  const getAllAccount = async () => {
    return axiosInstance.post(apiEndpoints.get_all_account, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };
  const getListObject = async (object_type) => {
    return axiosInstance
      .post(apiEndpoints.get_list_object_id, { outputtype: 'RawJson', object_type })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return {};
      });
  };

  return (
    <NotificationContext.Provider
      value={{
        getNotificatonCategoryList,
        getDetailNotificatonCategory,
        create_notification_category,
        update_notification_category,
        getNotificatonMessageList,
        getDetailNotificatonMessage,
        createNotificationMessage,
        updateNotificationMessage,
        addGroup,
        removeGroup,
        getAllAccount,
        getAllCategory,
        getListObject,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
