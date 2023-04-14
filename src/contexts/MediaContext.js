import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const MediaContext = createContext({});

export const MediaProvider = ({ children }) => {
  const { setView } = useView();

  //Podcast
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
  const getPodcastlist = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_podcast_list, {
        outputtype: 'RawJson',
     
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
  
          return list;
        } else return [];
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

  const getAllPodcast = async () => {
    return axiosInstance
      .post(apiEndpoints.get_all_active_podcast, {
        outputtype: 'RawJson',
        page: 1,
        no_item_per_page: 100,
        search_text: '',
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  //Episode
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
    return axiosInstance
      .post(apiEndpoints.get_all_active_episode, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return {};
      });
  };

  //Playlist
  const getPlaylistDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_playlist_detail, {
        outputtype: 'RawJson',
        playlist_id: id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createPlaylist = async (data) => {
    return axiosInstance.post(apiEndpoints.create_playlist, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updatePlaylist = async (data) => {
    return axiosInstance.post(apiEndpoints.update_playlist, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
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
    <MediaContext.Provider
      value={{
        getPodcastDetail,
        createPodcast,
        updatePodcast,
        getAllPodcast,
        getCounselingCategories,
        getEpisodeDetail,
        createEpisode,
        updateEpisode,
        getAllEpisode,
        getPlaylistDetail,
        createPlaylist,
        updatePlaylist,
        getPodcastlist
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
