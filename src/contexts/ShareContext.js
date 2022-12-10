import React, { createContext } from 'react';
import { METADATA } from '../store/actions';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import { useDispatch } from 'react-redux';
import useView from './../hooks/useView';

const ShareContext = createContext({
  getProjects: () => Promise.resolve(),
});

export const ShareProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { setView } = useView();

  function getMetadata() {
    axiosInstance.post(apiEndpoints.get_metadata, { outputtype: 'RawJson', guest: true }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const {
          province_list: provinces,
          gender_list: genders,
          weekday_list: weekday,
          degree_list: degree,
          career_category_list: careers,
          career_topic_list: topics,
        } = response.data;
        dispatch({
          type: METADATA,
          provinces,
          genders,
          weekday,
          degree,
          careers,
          topics,
        });
      }
    });
  }

  const getBroadcastDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_broadcast_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: broadcast, view } = response.data;
          setView({ ...view, action: 'detail' });
          return broadcast;
        } else return {};
      });
  };

  const createBroadcast = async (data) => {
    return axiosInstance.post(apiEndpoints.create_broadcast, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateBroadcast = async (data) => {
    return axiosInstance.post(apiEndpoints.update_broadcast, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getCategoryAndChannel = async () => {
    return axiosInstance.post(apiEndpoints.get_category_and_channel, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const data = response.data;
        return data;
      } else return {};
    });
  };

  return (
    <ShareContext.Provider
      value={{ getMetadata, getBroadcastDetail, createBroadcast, updateBroadcast, getCategoryAndChannel }}
    >
      {children}
    </ShareContext.Provider>
  );
};

export default ShareContext;
