import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const UniveristyContext = createContext({});

export const UniversityProvider = ({ children }) => {
  const { setView } = useView();

  const getUniversityDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_university_detail, {
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
  const getUniversityType = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_university_type_list, {
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { typle_list,category_list } = response.data;
         
          return {typle_list,category_list };
        } else return {};
      });
  };
  
  const updateUniversity = async (university) => {
    return axiosInstance
      .post(apiEndpoints.update_university, {...university,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };
  const createUniversity = async (university) => {
    return axiosInstance
      .post(apiEndpoints.create_university, {...university,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };
  const getUniversityListDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_universitylist_detail, {
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
  const getUniversityList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_active_universitylist, {
        outputtype: 'RawJson',
        page:1,
        no_item_per_page: 100,
        search_text: '',
        order_by: '',
        order_type: '',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
         
          return list;
        } else return [];
      });
  };
  const getNewsList= async () => {
    return axiosInstance
      .post(apiEndpoints.get_activenewslist, {
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list} = response.data;
          return list;
        } else return [];
      });
  };
  
  const updateUniversityList = async (university) => {
    return axiosInstance
      .post(apiEndpoints.update_universitylist, {...university,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };
  const createUniversityList = async (university) => {
    return axiosInstance
      .post(apiEndpoints.create_universitylist, {...university,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };

  return (
    <UniveristyContext.Provider
      value={{
        getUniversityDetail,
        getUniversityType,
        updateUniversity,
        createUniversity,
        createUniversityList,
        updateUniversityList,
        getUniversityListDetail,
        getNewsList,
        getUniversityList
      }}
    >
      {children}
    </UniveristyContext.Provider>
  );
};

export default UniveristyContext;
