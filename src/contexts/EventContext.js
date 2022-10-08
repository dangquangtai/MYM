import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const EventContext = createContext({});

export const EventProvider = ({ children }) => {
  const { setView } = useView();

  const getEventDetail = async (id) => {
    return axiosInstance.post(apiEndpoints.get_detail_event, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: news, view } = response.data;
        setView({ ...view, action: 'detail' });
        return news;
      } else return {};
    });
  };

  const updateEvent = async (event, mentor_id_list) => {
    return axiosInstance.post(apiEndpoints.update_event, { outputtype: 'RawJson',
    ...event, mentor_id_list: mentor_id_list}).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const createEvent = async (event, mentor_id_list) => {
    return axiosInstance
      .post(apiEndpoints.create_event, {
        outputtype: 'RawJson',
        ...event,
        mentor_id_list: mentor_id_list
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

 

  return (
    <EventContext.Provider
      value={{
       createEvent,
       updateEvent,
       getEventDetail
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
