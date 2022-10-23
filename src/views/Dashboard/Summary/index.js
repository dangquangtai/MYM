import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MonetizationOnTwoTone from '@material-ui/icons/MonetizationOnTwoTone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ReportCard from './../ReportCard/index';
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

const Summnary = () => {
  const theme = useTheme();
  const { getStatisticData } = useBooking();
  const {
    getBarChartData: getBarChart,
    getBookingDataByStatus,
    getBookingDataByMentor,
    getBookingDataByCareer,
    getBookingDataByRatting,
  } = useChart();
  const [statistic, setStatistic] = useState({});
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [dataStatus, setDataStatus] = useState({ series: [], categories: [] });
  const [dataMentor, setDataMentor] = useState({ series: [], categories: [] });
  const [dataCareer, setDataCareer] = useState({ series: [], labels: [] });
  const [dataRatting, setDataRatting] = useState({ series: [], categories: [], colors: [] });
  const [formData, setFormData] = useState({
    from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to_date: new Date(Date.now() + 3600 * 1000 * 24),
  });

  useEffect(() => {
    getStatistic();
    // getChartByStatus();
    // getChartByMentor();
    // getBarChartData();
    // getChartByCareer();
    // getChartByRatting();
  }, []);

  const getStatistic = async () => {
    try {
      const data = await getStatisticData();
      setStatistic(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getBarChartData = async () => {
    try {
      const data = await getBarChart(formData);
      setCategories(data.categories);
      setSeries(data.series);
    } catch (e) {
      console.log(e);
    }
  };

  const getChartByStatus = async () => {
    try {
      const data = await getBookingDataByStatus(formData);
      setDataStatus(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getChartByMentor = async () => {
    try {
      const data = await getBookingDataByMentor(formData);
      setDataMentor(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getChartByCareer = async () => {
    try {
      const data = await getBookingDataByCareer(formData);
      setDataCareer({
        series: data.series[0].data.map(Number),
        labels: data.categories,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getChartByRatting = async () => {
    try {
      const data = await getBookingDataByRatting(formData);
      setDataRatting({
        series: data.series[0].data.map(Number),
        categories: data.categories,
        colors: data.colors,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      getBarChartData();
      getChartByStatus();
      getChartByMentor();
      getChartByCareer();
      getChartByRatting();
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
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
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
                  primary={statistic.handle}
                  secondary="Cần xử lý"
                  color={theme.palette.warning.main}
                  iconPrimary={InfoOutlinedIcon}
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
                  secondary="Đã lên lịch"
                  color={theme.palette.success.main}
                  iconPrimary={ScheduleIcon}
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <ReportCard
                  primary={statistic.completed}
                  secondary="Đã hoàn thành"
                  color={theme.palette.primary.main}
                  iconPrimary={CheckCircleOutlineIcon}
                  footerData=""
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <ReportCard
                  primary={statistic.cancel}
                  secondary="Đã huỷ"
                  color={theme.palette.error.main}
                  iconPrimary={CancelOutlinedIcon}
                  footerData=""
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} xs={12}>
            <HoritionalBarChart
              categories={dataStatus.categories}
              series={dataStatus.series}
              title="Thống kê tình trạng đăng ký theo trạng thái"
              horizontal={true}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <HoritionalBarChart
              categories={dataMentor.categories}
              series={dataMentor.series}
              title="Thống kê tình trạng đăng ký theo Mentor"
              horizontal={true}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} xs={12}>
            <BarChart categories={categories} series={series} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} xs={12}>
            <PieChart labels={dataCareer.labels} series={dataCareer.series} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <ColofullBarChart
              series={dataRatting.series}
              categories={dataRatting.categories}
              colors={dataRatting.colors}
            />
          </Grid>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
};

export default Summnary;
