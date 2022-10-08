import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const EventCategoryContext = createContext({});

export const EventCategoryProvider = ({ children }) => {
  const { setView } = useView();

  const getEventCategoryDetail = async (id) => {
    return axiosInstance.post(apiEndpoints.get_detail_event_category, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: news, view } = response.data;
        setView({ ...view, action: 'detail' });
        return news;
      } else return {};
    });
  };

  const updateEventCategory = async (category) => {
    return axiosInstance.post(apiEndpoints.update_event_category, {
      outputtype: 'RawJson',
      ...category
    }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };


  const createEventCategory = async (category) => {
    return axiosInstance
      .post(apiEndpoints.create_event_category, { outputtype: 'RawJson', ...category})
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      })
      .catch(() => []);
  };
  const getEventCategoryList = async () => {
    return axiosInstance.post(apiEndpoints.get_event_category_list, { outputtype: 'RawJson'}).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list} = response.data;
        return list ;
      } else return {};
    });
  };

  return (
    <EventCategoryContext.Provider
      value={{
       getEventCategoryDetail,
       createEventCategory,
       updateEventCategory,
       getEventCategoryList,
      }}
    >
      {children}
    </EventCategoryContext.Provider>
  );
};

export default EventCategoryContext;
