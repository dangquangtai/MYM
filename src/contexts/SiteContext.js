import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const SiteContext = createContext({});

export const SiteProvider = ({ children }) => {
  const { setView } = useView();

  //News
  const getNewsDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_news_detail, {
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

  const createNews = async (data) => {
    return axiosInstance.post(apiEndpoints.create_news, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateNews = async (data) => {
    return axiosInstance.post(apiEndpoints.update_news, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getNewsCategory = async () => {
    return axiosInstance.post(apiEndpoints.get_category, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list: newsCategory, landing_page: landingPage } = response.data;
        return { newsCategory, landingPage };
      } else return [];
    });
  };

  return (
    <SiteContext.Provider
      value={{
        getNewsDetail,
        createNews,
        updateNews,
        getNewsCategory,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
