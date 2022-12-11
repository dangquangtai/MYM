import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MonetizationOnTwoTone from '@material-ui/icons/MonetizationOnTwoTone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { gridSpacing } from './../../../store/constant';
import useBooking from './../../../hooks/useBooking';
import BarChart from './../../Chart/BarChart';
import useChart from './../../../hooks/useChart';
import HoritionalBarChart from './../../Chart/HoritionalBarChart';
import PieChart from './../../Chart/PieChart';
import ColofullBarChart from './../../Chart/ColofullBarChart';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import DateFnsUtils from '@date-io/date-fns';
import EPieChart from '../../Chart/EPieChart';
import EHoritionalBarChart from '../../Chart/EHoritionalBarChart';
import EStackableBarChart from '../../Chart/EStackableBarChart';
import EClolorfullBarChart from '../../Chart/EClolorfullBarChart';
import ELineChart from '../../Chart/ELineChart';
import { useSelector } from 'react-redux';
import StarIcon from '@material-ui/icons/Star';

const BookingDashboard = () => {
    const theme = useTheme();
    const { getStatisticData } = useBooking();
    const { getBookingDataByCareer } = useChart();
    const [statistic, setStatistic] = useState({});
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [dataStatus, setDataStatus] = useState([]);
    const [dataMentor, setDataMentor] = useState([]);
    const [dataCareer, setDataCareer] = useState([]);
    const [dataRatting, setDataRatting] = useState([]);
    const [dataComputeBooking, setdataComputeBooking] = useState([]);
    const [countOfPercentSchool, setcountOfPercentSchool] = useState([]);
    const [dataReasonCancel, setdataReasonCancel] = useState([]);
    const [formData, setFormData] = useState({
        // from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        from_date: new Date(Date.now() - 3600 * 1000 * 24 * 6),
        to_date: new Date(Date.now()),
    });
    const { selectedApp } = useSelector((state) => state.app);

    useEffect(() => {

        getChartByCareer();
    }, []);



    const getChartByCareer = async () => {
        try {
            const data = await getBookingDataByCareer(formData);
            setDataCareer(data?.data);
            setDataStatus(data?.data_booking_status_display);
            setCategories(data?.data_booking_set_time?.xAxis);
            setSeries(data?.data_booking_set_time?.series);
            setDataMentor(data?.data_count_of_booking_by_mentor_name);
            setDataRatting(data?.data_mentor_ratting);
            setdataComputeBooking(data?.data_compute_booking)
            setcountOfPercentSchool(data?.data_percent_school)
            setdataReasonCancel(data?.data_cancel_reason)
            // console.log(dataCareer?.data_count_of_booking_by_mentor_name);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async () => {
        try {
            // getBarChartData();
            // getChartByStatus();
            // getChartByMentor();
            // getChartByCareer();
            // getChartByRatting();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                {/* <Grid container spacing={gridSpacing} justifyContent="flex-end">
          <Grid item xs={6} sm={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Grid container spacing={gridSpacing} justifyContent="flex-end" alignItems='flex-end'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Từ ngày"
                    format="dd/MM/yyyy"
                    value={formData.from_date}
                    onChange={date => setFormData({ ...formData, from_date: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    keyboardIcon={<EventTwoToneIcon />}
                  />
                </Grid>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Đến ngày"
                    format="dd/MM/yyyy"
                    value={formData.to_date}
                    onChange={date => setFormData({ ...formData, to_date: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    keyboardIcon={<EventTwoToneIcon />}
                  />
                </Grid>
                <Grid item xs="auto">
                  <Button color="primary" onClick={handleSubmit}>
                    Áp dụng
                  </Button>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Grid> */}
            </Grid>
            {selectedApp.app_code === 'BOOKING' && (
                <>
                    <Grid item xs={12}>
                        {/* <Grid container spacing={gridSpacing}>
                            <Grid item lg={5} xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={6} sm={6} xs={12}>
                                        <ReportCard
                                            primary={statistic.total}
                                            secondary="Tổng đăng ký"
                                            color={theme.palette.info.main}
                                            iconPrimary={MonetizationOnTwoTone}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={6} xs={12}>
                                        <ReportCard
                                            primary={statistic.processing}
                                            secondary="Tiềm năng"
                                            color={theme.palette.warning.main}
                                            iconPrimary={StarIcon}
                                            footerData=""
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={7} xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={4} sm={6} xs={12}>
                                        <ReportCard
                                            primary={statistic.scheduled}
                                            secondary="Đang chờ tư vấn"
                                            color={theme.palette.primary.main}
                                            iconPrimary={ScheduleIcon}
                                            footerData=""
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={6} xs={12}>
                                        <ReportCard
                                            primary={statistic.completed}
                                            secondary="Đã hoàn thành"
                                            color={theme.palette.success.main}
                                            iconPrimary={CheckCircleOutlineIcon}
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={6} xs={12}>
                                        <ReportCard
                                            primary={statistic.cancel}
                                            secondary="Bị hủy"
                                            color={theme.palette.error.main}
                                            iconPrimary={CancelOutlinedIcon}
                                            footerData=""
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={7} xs={12}>
                                <ELineChart xAxis={dataComputeBooking.xAxis} series={dataComputeBooking.series} title={'Số lượng đăng ký trong 7 ngày'}>

                                </ELineChart>
                                {/* <EHoritionalBarChart
                                    xAxis={dataStatus.xAxis}
                                    series={dataStatus.series}
                                    title={'Số lượng đăng ký trong 7 ngày'}
                                ></EHoritionalBarChart> */}
                            </Grid>
                            <Grid item lg={5} xs={12}>
                                <EPieChart name={dataCareer.chart_name} series={dataCareer.chart_data} title={'Ngành nghề'} ></EPieChart>
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
                            {/* <Grid item lg={12} xs={12}>
                                <EStackableBarChart xAxis={categories} series={series} title={'Booking'}></EStackableBarChart>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>

                            <Grid item lg={12} xs={12} >
                                <EPieChart name={countOfPercentSchool.chart_name} series={countOfPercentSchool.chart_data} percent={true} title={'Trường'} height={'580px'} ></EPieChart>
                            </Grid>

                        </Grid>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={6} xs={12}>
                                <EClolorfullBarChart
                                    xAxis={dataRatting.xAxis}
                                    series={dataRatting.colorful_series}
                                    title={'Ratting'}
                                ></EClolorfullBarChart>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <EPieChart name={dataReasonCancel.chart_name} series={dataReasonCancel.chart_data} title={'Lý do hủy booking'} ></EPieChart>
                            </Grid>

                        </Grid>
                    </Grid>
                </>
            )}
        </React.Fragment>
    );
};

export default BookingDashboard;