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

  // Landing Page
  const getLandingPageDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_landing_page_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: landingPage, view } = response.data;
          setView({ ...view, action: 'detail' });
          return landingPage;
        } else return {};
      });
  };

  const createLandingPage = async (data) => {
    return axiosInstance.post(apiEndpoints.create_landing_page, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateLandingPage = async (data) => {
    return axiosInstance.post(apiEndpoints.update_landing_page, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  // News Category
  const getNewsCategoryDetail = async (id) => {
    return axiosInstance

      .post(apiEndpoints.get_news_category_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: newsCategory, view } = response.data;
          setView({ ...view, action: 'detail' });
          return newsCategory;
        } else return {};
      });
  };

  const createNewsCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.create_news_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const updateNewsCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.update_news_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  return (
    <SiteContext.Provider
      value={{
        getNewsDetail,
        createNews,
        updateNews,
        getNewsCategory,
        getLandingPageDetail,
        createLandingPage,
        updateLandingPage,
        getNewsCategoryDetail,
        createNewsCategory,
        updateNewsCategory,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
