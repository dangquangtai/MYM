import React, { createContext } from 'react';
import { vibEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';

const ChartContext = createContext({});

export const ChartProvider = ({ children }) => {
  const getBarChartData = async (date) => {
    return axiosInstance.post(vibEndpoints.get_bar_chart_data, { outputtype: 'RawJson', ...date }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const { data } = response.data;
        return data;
      } else return {};
    });
  };

  const getBookingDataByStatus = async (date) => {
    return axiosInstance
      .post(vibEndpoints.get_booking_status_data_horitional_barchart, { outputtype: 'RawJson', ...date })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };
  const getBookingDataByMentor = async (date) => {
    return axiosInstance
      .post(vibEndpoints.get_count_of_booking_by_mentor_data_horitional_barchart, { outputtype: 'RawJson', ...date  })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };
  const getBookingDataByCareer = async (date) => {
    return axiosInstance
      .post(vibEndpoints.get_booking_by_career_pie_chart, { outputtype: 'RawJson', ...date  })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };
  const getBookingDataByRatting = async (date) => {
    return axiosInstance
      .post(vibEndpoints.get_mentor_ratting_colorfull_bar_chart, { outputtype: 'RawJson', ...date  })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data } = response.data;
          return data;
        } else return {};
      });
  };

  return (
    <ChartContext.Provider
      value={{
        getBarChartData,
        getBookingDataByStatus,
        getBookingDataByMentor,
        getBookingDataByCareer,
        getBookingDataByRatting,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContext;
