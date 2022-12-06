import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const PartnerContext = createContext({});

export const PartnerProvider = ({ children }) => {
  const { setView } = useView();

  const getMentorDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_detail, {
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
  const getMentorbyEmail = async (email) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_by_email, {
        outputtype: 'RawJson',
        email_address:email,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200 && response.data.code === 0 ) {
          return true;
        } else return false;
      });
  };

  const createMentor = async (mentor) => {
    return axiosInstance.post(apiEndpoints.create_mentor, { outputtype: 'RawJson', ...mentor }).then((response) => {
      return response.data;
    });
  };

  const updateMentor = async (mentor) => {
    return axiosInstance.post(apiEndpoints.update_mentor, { outputtype: 'RawJson', ...mentor }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const toggleActiveMentor = async (data) => {
    return axiosInstance.post(apiEndpoints.set_active_mentor, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getMentorbyCategory = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_list_by_category_id, { outputtype: 'RawJson', category_id: id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  const getCareerAndTopic = async () => {
    return axiosInstance.post(apiEndpoints.get_career_and_topic, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const data = response.data;
        return data;
      } else return [];
    });
  };

  const generateTimeslot = async (id) => {
    return axiosInstance.post(apiEndpoints.generate_timeslot, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getTimeslot = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_timeslot_by_mentor_id, { outputtype: 'RawJson', id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  const getPartnerList = async (page = 1, no_item_per_page = 100, search_text = '') => {
    return axiosInstance
      .post(apiEndpoints.get_all_active_partner, { outputtype: 'RawJson', page, no_item_per_page, search_text })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  const getPartnerListInactive = async (page = 1, no_item_per_page = 100, search_text = '') => {
    return axiosInstance
      .post(apiEndpoints.get_all_inactive_partner, { outputtype: 'RawJson', page, no_item_per_page, search_text })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  const getPartnerDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_partner_detail, {
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
  const getPartnerCategoryList = async (page = 1, no_item_per_page = 100, search_text = '') => {
    return axiosInstance
      .post(apiEndpoints.get_all_active_partner_category, { outputtype: 'RawJson', page, no_item_per_page, search_text })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      });
  };

  const getPartnerCategoryDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_partner_category_detail, {
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

  const createPartnerCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.create_partner_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  }; 
  
  const updatePartnerCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.update_partner_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const createPartner = async (data) => {
    return axiosInstance
      .post(apiEndpoints.create_partner, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  }; 
  
  const updatePartner = async (data) => {
    return axiosInstance
      .post(apiEndpoints.update_partner, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const getMentorList = async () => {
    return axiosInstance.post(apiEndpoints.get_mentor_list, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return [];
    });
  };

  const getMentorListDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_list_mentor_detail, {
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

  const createMentorList = async (mentor) => {
    return axiosInstance
      .post(apiEndpoints.create_list_mentor, { outputtype: 'RawJson', ...mentor })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const updateMentorList = async (mentor) => {
    return axiosInstance
      .post(apiEndpoints.update_list_mentor, { outputtype: 'RawJson', ...mentor })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  return (
    <PartnerContext.Provider
      value={{
        getMentorDetail,
        updateMentor,
        createMentor,
        toggleActiveMentor,
        getMentorbyCategory,
        getCareerAndTopic,
        generateTimeslot,
        getTimeslot,
        getPartnerList,
        getPartnerDetail,
        getPartnerCategoryList,
        getMentorList,
        getMentorListDetail,
        createMentorList,
        updateMentorList,
        createPartner,
        updatePartner,
        getPartnerCategoryDetail,
        createPartnerCategory,
        updatePartnerCategory,
        getPartnerListInactive,
        getMentorbyEmail
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export default PartnerContext;
