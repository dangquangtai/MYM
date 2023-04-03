import React, { createContext } from 'react';
import { METADATA } from '../store/actions';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import { useDispatch } from 'react-redux';
import useView from './../hooks/useView';
import apiServices from './../services/api';

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
          university_list: universities,
        } = response.data;
        dispatch({
          type: METADATA,
          provinces,
          genders,
          weekday,
          degree,
          careers,
          topics,
          universities,
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

  const getChatBoxList = async () => {
    return axiosInstance.post(apiEndpoints.get_chat_box_list, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        return response.data.list;
      } else return [];
    });
  };

  const fetchChatBox = async () => {
    return apiServices
      .post(apiEndpoints.get_chat_box_list, { outputtype: 'RawJson', company_code: 'MYM' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return response.data.list;
        } else return [];
      });
  };

  const getChatMessage = async (id, page = 1, no_item_per_page = 10) => {
    return axiosInstance
      .post(apiEndpoints.get_chat_message_list, { outputtype: 'RawJson', id, page, no_item_per_page })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return response.data.list;
        } else return [];
      });
  };

  const postChatMessage = async (chatbox_id, content) => {
    return apiServices
      .post(apiEndpoints.post_chat_message, { outputtype: 'RawJson', chatbox_id, content, company_code: 'MYM' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          return response.data.list;
        } else return [];
      });
  };

  return (
    <ShareContext.Provider
      value={{
        getMetadata,
        getBroadcastDetail,
        createBroadcast,
        updateBroadcast,
        getCategoryAndChannel,
        getChatBoxList,
        getChatMessage,
        postChatMessage,
        fetchChatBox,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
};

export default ShareContext;
