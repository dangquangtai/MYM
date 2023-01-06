import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { gridSpacing } from './../../../store/constant';
import useChart from './../../../hooks/useChart';
import EPieChart from '../../Chart/EPieChart';
import EHoritionalBarChart from '../../Chart/EHoritionalBarChart';
import EClolorfullBarChart from '../../Chart/EClolorfullBarChart';
import ELineChart from '../../Chart/ELineChart';
import { useSelector } from 'react-redux';

const BookingDashboard = () => {
  const { getBookingDataByCareer } = useChart();
  const [dataMentor, setDataMentor] = useState([]);
  const [dataCareer, setDataCareer] = useState([]);
  const [dataRatting, setDataRatting] = useState([]);
  const [dataComputeBooking, setdataComputeBooking] = useState([]);
  const [countOfPercentSchool, setcountOfPercentSchool] = useState([]);
  const [dataReasonCancel, setdataReasonCancel] = useState([]);
  const [dataLoginAndRegister, setdataLoginAndRegister] = useState([]);
  const [formData, setFormData] = useState({
    from_date: new Date(Date.now() - 3600 * 1000 * 24 * 6),
    to_date: new Date(Date.now()),
  });
  const { selectedApp } = useSelector((state) => state.app);

  useEffect(() => {
    if (selectedApp.app_code === 'BOOKING') getChartByCareer();
  }, []);

  const getChartByCareer = async () => {
    try {
      const data = await getBookingDataByCareer(formData);
      setDataCareer(data?.data);
      setDataMentor(data?.data_count_of_booking_by_mentor_name);
      setDataRatting(data?.data_mentor_ratting);
      setdataComputeBooking(data?.data_compute_booking);
      setcountOfPercentSchool(data?.data_percent_school);
      setdataReasonCancel(data?.data_cancel_reason);
      setdataLoginAndRegister(data?.data_login_and_register);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {selectedApp.app_code === 'BOOKING' && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={7} xs={12}>
                <ELineChart
                  xAxis={dataComputeBooking.xAxis}
                  series={dataComputeBooking.series}
                  title={'Số lượng đăng ký trong 7 ngày'}
                ></ELineChart>
              </Grid>
              <Grid item lg={5} xs={12}>
                <EPieChart name={dataCareer.chart_name} series={dataCareer.chart_data} title={'Ngành nghề'}></EPieChart>
              </Grid>
              <Grid item lg={12} xs={12}>
                <EHoritionalBarChart
                  xAxis={dataMentor.xAxis}
                  series={dataMentor.series}
                  title={'Mentor'}
                ></EHoritionalBarChart>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={12} xs={12}>
                <EPieChart
                  name={countOfPercentSchool.chart_name}
                  series={countOfPercentSchool.chart_data}
                  percent={true}
                  title={'Trường'}
                  height={'580px'}
                ></EPieChart>
              </Grid>
              <Grid item lg={6} xs={12}>
                <EClolorfullBarChart
                  xAxis={dataRatting.xAxis}
                  series={dataRatting.colorful_series}
                  title={'Ratting'}
                ></EClolorfullBarChart>
              </Grid>
              <Grid item lg={6} xs={12}>
                <EPieChart
                  name={dataReasonCancel.chart_name}
                  series={dataReasonCancel.chart_data}
                  title={'Lý do hủy booking'}
                ></EPieChart>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={12} xs={12}>
                  <ELineChart
                    xAxis={dataLoginAndRegister.xAxis}
                    series={dataLoginAndRegister.series}
                    title={'Truy cập và tài khoản'}
                  ></ELineChart>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};

export default BookingDashboard;
