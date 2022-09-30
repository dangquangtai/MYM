import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const PartnerContext = createContext({});

export const PartnerProvider = ({ children }) => {
  const { setView } = useView();

  const getMentorDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_detail, {
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
      return response.data;
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

  const getCareerAndTopic = async () => {
    return axiosInstance.post(apiEndpoints.get_career_and_topic, { outputtype: 'RawJson'}).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const data = response.data;
        return data;
      } else return [];
    });
  };

  const generateTimeslot = async (id) => {
    return axiosInstance.post(apiEndpoints.generate_timeslot, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  }

  const getTimeslot = async (id) => {
    return axiosInstance.post(apiEndpoints.get_timeslot_by_mentor_id, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };

  return (
    <PartnerContext.Provider
      value={{
        getMentorDetail,
        updateMentor,
        createMentor,
        toggleActiveMentor,
        getMentorbyCategory,
        getCareerAndTopic,
        generateTimeslot,
        getTimeslot
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export default PartnerContext;