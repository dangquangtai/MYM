import React, { createContext } from 'react';
import { METADATA } from '../store/actions';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import { useDispatch } from 'react-redux';

const ShareContext = createContext({
  getProjects: () => Promise.resolve(),
});

export const ShareProvider = ({ children }) => {
  const dispatch = useDispatch();

  function getMetadata() {
    axiosInstance
      .get(apiEndpoints.get_metadata)
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { province_list: provinces, gender_list: genders, weekday_list: weekday } = response.data;
          dispatch({
            type: METADATA,
            provinces,
            genders,
            weekday
          });
        }
      });
  }

  return <ShareContext.Provider value={{ getMetadata }}>{children}</ShareContext.Provider>;
};

export default ShareContext;
