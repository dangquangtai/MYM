import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const MentorContext = createContext({});

export const MentorProvider = ({ children }) => {
  const { setView } = useView();

  const getMentorDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_detail_by_id, {
        outputtype: 'RawJson', id
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createMentor = async (mentor) => {
    return axiosInstance.post(apiEndpoints.create_mentor, { outputtype: 'RawJson', ...mentor }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateMentor = async (mentor) => {
    return axiosInstance.post(apiEndpoints.update_mentor, { outputtype: 'RawJson', ...mentor }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const toggleActiveMentor = async (data) => {
    return axiosInstance.post(apiEndpoints.set_active_mentor, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  }

  const getMentorbyCategory = async (id) => {
    return axiosInstance.post(apiEndpoints.get_mentor_list_by_category_id, { outputtype: 'RawJson', category_id: id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };

  return (
    <MentorContext.Provider
      value={{
        getMentorDetail,
        updateMentor,
        createMentor,
        toggleActiveMentor,
        getMentorbyCategory
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export default MentorContext;