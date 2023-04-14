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
        const { list: newsCategory, landing_page: landingPage, templates } = response.data;
        return { newsCategory, landingPage, templates };
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

  const searchPublishedNews = async (id, landing_page_id, search_text) => {
    return axiosInstance
      .post(apiEndpoints.search_published_news, { outputtype: 'RawJson', id, landing_page_id, search_text })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list: news } = response.data;
          return news;
        } else return [];
      });
  };

  const getAllNews = async () => {
    return axiosInstance.post(apiEndpoints.get_all_news, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list: news } = response.data;
        return news;
      } else return [];
    });
  };

  const getNewsListDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_newslist_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: newsList, view } = response.data;
          setView({ ...view, action: 'detail' });
          return newsList;
        } else return {};
      });
  };

  const createNewsList = async (data) => {
    return axiosInstance.post(apiEndpoints.create_new_newslist, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateNewsList = async (data) => {
    return axiosInstance.post(apiEndpoints.update_newslist, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  // QnA
  const getQnADetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_qna_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: qna, view } = response.data;
          setView({ ...view, action: 'detail' });
          return qna;
        } else return {};
      });
  };
  const createQnA = async (data) => {
    return axiosInstance.post(apiEndpoints.create_qna, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateQnA = async (data) => {
    return axiosInstance.post(apiEndpoints.update_qna, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getAllLandingPage = async () => {
    return axiosInstance.post(apiEndpoints.get_list_landing_page, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: ldpage } = response.data;
        return ldpage;
      } else return [];
    });
  };
  const getCategoryByLandingPage = async (id) => {
    return axiosInstance.post(apiEndpoints.get_list_category, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: category } = response.data;
        return category;
      } else return [];
    });
  };
  const getNewsByLandingPage = async (id) => {
    return axiosInstance.post(apiEndpoints.get_list_news, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: news } = response.data;
        return news;
      } else return [];
    });
  };
  const getSubCategory = async (id) => {
    return axiosInstance.post(apiEndpoints.get_list_sub_category, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: subCate } = response.data;
        return subCate;
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
        getLandingPageDetail,
        createLandingPage,
        updateLandingPage,
        getNewsCategoryDetail,
        createNewsCategory,
        updateNewsCategory,
        searchPublishedNews,
        getAllNews,
        getNewsListDetail,
        createNewsList,
        updateNewsList,
        getQnADetail,
        getAllLandingPage,
        getCategoryByLandingPage,
        getNewsByLandingPage,
        getSubCategory,
        createQnA,
        updateQnA,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
