import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
  const { setView } = useView();

  const getBookingDetail = async (id) => {
    return axiosInstance.post(apiEndpoints.get_booking_detail, { outputtype: 'RawJson', id }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data: news, view } = response.data;
        setView({ ...view, action: 'detail' });
        return news;
      } else return {};
    });
  };

  const updateBooking = async (booking) => {
    return axiosInstance.post(apiEndpoints.update_booking, booking).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const cancelBooking = async (id) => {
    return axiosInstance
      .post(apiEndpoints.cancel_counselling, {
        outputtype: 'RawJson',
        id: id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const reviewBooking = async (id, action, note) => {
    return axiosInstance
      .post(apiEndpoints.review_booking, {
        outputtype: 'RawJson',
        id: id,
        action: action,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const approveBooking = async (id) => {
    return axiosInstance
      .post(apiEndpoints.approve_booking, {
        outputtype: 'RawJson',
        id: id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const setCompletedBooking = async (id, action = null) => {
    return axiosInstance
      .post(apiEndpoints.set_completed_state, {
        outputtype: 'RawJson',
        id: id,
        action: action,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const setNoteBooking = async (id, note, is_send) => {
    return axiosInstance
      .post(apiEndpoints.set_note_booking, {
        outputtype: 'RawJson',
        id: id,
        note: note,
        is_send: is_send,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const updateBookingMentor = async (id, data) => {
    return axiosInstance
      .post(apiEndpoints.update_booking_mentor, {
        outputtype: 'RawJson',
        id: id,
        ...data,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      })
      .catch(() => false);
  };

  const getMentorDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_detail_by_id, { outputtype: 'RawJson', id, company_code: 'MYM' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: mentor } = response.data;
          return mentor;
        } else return {};
      });
  };

  const getListUniversity = async () => {
    return axiosInstance.post(apiEndpoints.get_list_university, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const {
          data: { list: university },
        } = response;
        return university;
      } else return {};
    });
  };

  const getFeedback = async (booking_id) => {
    return axiosInstance
      .post(apiEndpoints.get_feedback_detail, { outputtype: 'RawJson', booking_id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: feedback } = response.data;
          return feedback;
        } else return {};
      });
  };

  const getMentorListByCareer = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_mentor_list_by_category_id, { outputtype: 'RawJson', category_id: id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return {};
      });
  };
  const getTimeslotList = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_timeslot_by_mentor_id, { outputtype: 'RawJson', id: id })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return {};
      });
  };

  const getCareerDemandList = async () => {
    return axiosInstance.post(apiEndpoints.get_career_demand, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data } = response;
        return data;
      } else return {};
    });
  };


  const getStatisticData = async () => {
    return axiosInstance.post(apiEndpoints.get_statistic_data, { outputtype: 'RawJson', }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data } = response.data;
        return data;
      } else return {};
    });
  };

  const getLog = async (id) => {
    return axiosInstance.post(apiEndpoints.get_log_data, { id: id, outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return {};
    });
  };

  const getLitsNote = async (id) => {
    return axiosInstance.post(apiEndpoints.get_list_note, { id: id, outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { list } = response.data;
        return list;
      } else return {};
    });
  };

  const getFullCalendar = async () => {
    return axiosInstance
      .post(apiEndpoints.get_full_calendar, { outputtype: 'RawJson' })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return [];
      })
      .catch(() => []);
  };
  const getCounsellingByEvent = async (event_id, page, no_item_per_page, search_text, order_by, order_type) => {
    return axiosInstance
      .post(apiEndpoints.get_counselling_by_evnet_id, {
        outputtype: 'RawJson',
        event_id: event_id,
        company_code: 'MYM',
        page: page,
        no_item_per_page: no_item_per_page,
        search_text: search_text,
        order_by: order_by,
        order_type: order_type
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list } = response.data;
          return list;
        } else return {};
      });
  };
  return (
    <BookingContext.Provider
      value={{
        getBookingDetail,
        updateBooking,
        cancelBooking,
        reviewBooking,
        setNoteBooking,
        setCompletedBooking,
        getMentorDetail,
        getListUniversity,
        getFeedback,
        getTimeslotList,
        getMentorListByCareer,
        updateBookingMentor,
        getCareerDemandList,
        approveBooking,
        getStatisticData,
        getLog,
        getLitsNote,
        getFullCalendar,
        getCounsellingByEvent,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
