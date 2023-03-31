import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const CareerContext = createContext({});

export const CareerProvider = ({ children }) => {
  const { setView } = useView();

  const getCareerDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_career_detail, {
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
  const getCareerCategoryDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_career_category_detail, {
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
  const getCareerList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_active_list_career, {
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
         
          return list;
        } else return {};
      });
  };
  const updateCareer = async (career) => {
    return axiosInstance
      .post(apiEndpoints.update_career, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };
  const createCareer = async (career) => {
    return axiosInstance
      .post(apiEndpoints.create_career, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return true;
        } else return false;
      });
  };
  const createCareerList = async (career) => {
    return axiosInstance
      .post(apiEndpoints.create_careerlist, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return true;
        } else return false;
      });
  };
  const updateCareerList = async (career) => {
    return axiosInstance
      .post(apiEndpoints.update_careerlist, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
        
         
          return true;
        } else return false;
      });
  };
  const createCareerCategory = async (career) => {
    return axiosInstance
      .post(apiEndpoints.create_career_category, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return true;
        } else return false;
      });
  };
  const updateCareerCategory = async (career) => {
    return axiosInstance
      .post(apiEndpoints.update_career_category, {...career,
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return true;
        } else return false;
      });
  };
  const getCareerDetailList = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_careerlist_detail, {
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
  const getINCareerList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_inactive_career, {
        outputtype: 'RawJson',
      
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };
  const getCareerListPage = async () => {
    return axiosInstance
      .post(apiEndpoints.get_careerlist_active_list, {
        outputtype: 'RawJson',
        page:1,
        no_item_per_page:100,
        order_by:'',
        order_type:'',
        search_text: '',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
         
          return list;
        } else return [];
      });
  };
  const getCareerCategoryList = async () => {
    return axiosInstance
      .post(apiEndpoints.get_career_category_list_key_value, {
        outputtype: 'RawJson',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
         
          return list;
        } else return [];
      });
  };
  return (
    <CareerContext.Provider
      value={{
        createCareer,
        getCareerDetail,
        updateCareer,
        getCareerList,
        createCareerList,
        updateCareerList,
        getCareerDetailList,
        getCareerListPage,
        createCareerCategory,
        updateCareerCategory,
        getCareerCategoryDetail,
        getCareerCategoryList,
        getINCareerList
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export default CareerContext;
