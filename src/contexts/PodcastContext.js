import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const PodcastContext = createContext({});

export const PodcastProvider = ({ children }) => {
  const { setView } = useView();

  const getPodcastDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_podcast_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: podcast, view } = response.data;
          setView({ ...view, action: 'detail' });
          return podcast;
        } else return {};
      });
  };

  const createPodcast = async (data) => {
    return axiosInstance.post(apiEndpoints.create_podcast, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updatePodcast = async (data) => {
    return axiosInstance.post(apiEndpoints.update_podcast, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getEpisodeDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_episode_detail, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: episode, view } = response.data;
          setView({ ...view, action: 'detail' });
          return episode;
        } else return {};
      });
  };

  const createEpisode = async (data) => {
    return axiosInstance.post(apiEndpoints.create_episode, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateEpisode = async (data) => {
    return axiosInstance.post(apiEndpoints.update_episode, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getAllEpisode = async (data) => {
    return axiosInstance.post(apiEndpoints.get_all_active_episode, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return {};
    });
  };

  const getCounselingCategories = async () => {
    return axiosInstance.post(apiEndpoints.get_counseling_categoies, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };

  return (
    <PodcastContext.Provider
      value={{
        getPodcastDetail,
        createPodcast,
        updatePodcast,
        getCounselingCategories,
        getEpisodeDetail,
        createEpisode,
        updateEpisode,
        getAllEpisode
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export default PodcastContext;
