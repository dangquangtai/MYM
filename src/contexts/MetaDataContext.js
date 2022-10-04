import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';


const MetaDataContext = createContext({});

export const MetaDataProvider = ({ children }) => {



  const getCareerTopicList = async () =>{
    return axiosInstance
      .post(apiEndpoints.get_metadata, { guest: 'true', outputtype: 'RawJson' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { career_topic_list } = response.data;
          return career_topic_list;
        } else return {};
      });
  }
  const getCareerCategoryList = async () =>{
    return axiosInstance
    .post(apiEndpoints.get_metadata, { guest: 'true', outputtype: 'RawJson' })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { career_category_list } = response.data;
        return career_category_list;
      } else return {};
    });
  }
  const getGenderList = async () =>{
    return axiosInstance
    .post(apiEndpoints.get_metadata, { guest: 'true', outputtype: 'RawJson' })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { gender_list} = response.data;
        return gender_list;
      } else return {};
    });
  }
  const getProvinceList = async () =>{
    return axiosInstance
    .post(apiEndpoints.get_metadata, { guest: 'true', outputtype: 'RawJson' })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { province_list} = response.data;
        return province_list;
      } else return {};
    });
  }
  const getDegreeList = async () =>{
    return axiosInstance
    .post(apiEndpoints.get_metadata, { guest: 'true', outputtype: 'RawJson' })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { degree_list} = response.data;
        return degree_list;
      } else return {};
    });
  }
  return (
    <MetaDataContext.Provider
      value={{
        getCareerCategoryList,
        getCareerTopicList,
        getDegreeList,
        getProvinceList,
        getGenderList,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
};

export default MetaDataContext;
