import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useNotification from '../hooks/useNotification';
import useView from '../hooks/useView';


const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const { setView } = useView();
    const getNotificatonCategoryList = async () =>{
        return axiosInstance
          .post(apiEndpoints.get_all_notification_category, { guest: 'true', outputtype: 'RawJson' })
          .then((response) => {
            if (response.status === 200 && response.data.return === 200) {
              const { data } = response.data;
              return data;
            } else return {};
          });
      }

 
      const getDetailNotificatonCategory = async (id) => {
        return axiosInstance.post(apiEndpoints.get_detail_notification_category, { outputtype: 'RawJson', id }).then((response) => {
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
    //   const getTimeslotList = async (id) => {
    //     return axiosInstance
    //       .post(apiEndpoints.get_timeslot_by_mentor_id, { outputtype: 'RawJson', id: id })
    //       .then((response) => {
    //         if (response.status === 200 && response.data.return === 200) {
    //           const { list } = response.data;
    //           return list;
    //         } else return {};
    //       });
    //   };

  return (
    <NotificationContext.Provider
      value={{
        getNotificatonCategoryList,
        getDetailNotificatonCategory,
        create_notification_category,
        update_notification_category,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
