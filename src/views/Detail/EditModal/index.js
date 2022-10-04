import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Grid, TextField, MenuItem, Select } from '@material-ui/core';
import { counsellingActions, gridSpacing } from '../../../store/constant.js';
import useStyles from '../classes';
import useBooking from '../../../hooks/useBooking';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import useMetaData from '../../../hooks/useMetaData';
import { update } from 'lodash';
import { useSelector } from 'react-redux';
const labelDay = {
  MYM_MONDAY: 'Thứ 2',
  MYM_TUESDAY: 'Thứ 3',
  MYM_WEDNESDAY: 'Thứ 4',
  MYM_THURSDAY: 'Thứ 5',
  MYM_FRIDAY: 'Thứ 6',
  MYM_SATURDAY: 'Thứ 7',
  MYM_SUNDAY: 'Chủ nhật',
};

const style = {
  title: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    position: 'relative',
  },
  buttonWrap: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    margin: '0 12px',
    background: 'rgb(70, 81, 105)',
  },
  buttonSubmit: {
    margin: '0 12px',
    background: 'rgb(97, 42, 255)',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    minWidth: '20px',
  },
};

const labelSessionDate = {
  morning: 'Sáng',
  afternoon: 'Chiều',
  night: 'Tối',
  weekend: 'Cuối tuần',
};

export default function EditModal({ profile, mentor, document, isOpen, handleClose, handleSubmit, handleGoBack }) {
  const { getMentorListByCareer, getMentorDetail, getTimeslotList } = useBooking();
  const { getCareerTopicList, getCareerCategoryList, getProvinceList, getDegreeList, getGenderList } = useMetaData();
  const classes = useStyles();
  const [isDisabledSaving, setIsDisabledSaving] = useState(false);
  const [formData, setFormData] = useState({ email: '', number_phone: '' });

  const [mentorFormData, setMentorFormData] = useState({ id: '' });

  const [currentMentor, setCurrentMentor] = useState();
  const [timeslot, setTimeslot] = useState([]);
  const [formDemand, setFormDemand] = useState([]);

  const [selectedMentor, setSelectedMentor] = useState({});

  const [mentorList, setMentorList] = useState([]);

  const {
    provinces: provinceList,
    genders: genderList,
    degree: degreeList,
    careers: careerCategoryList,
    topics: careerTopicList,
  } = useSelector((state) => state.metadata);

  const [sessionDate, setSessionDate] = useState({
    morning: false,
    afternoon: false,
    night: false,
    weekend: false,
  });

  const [updateMentor, setUpdateMentor] = useState({
    mentor_id: '',
    timeslot_id: '',
    id: '',
  });

  const handleSubmitForm = async () => {
    if (profile) {
      handleSubmit(formData, formData.email !== formData.email_address);
    } else {
      handleSubmit(updateMentor);
    }
  };

  const handleChangeDemand = (event) => {
    const {
      target: { value },
    } = event;
    setFormDemand(typeof value === 'string' ? value.split(',') : value);
    setFormData({ ...formData, demand: value.join(',') });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMentorChange = async (e) => {
    if (e.target.name === 'mentor_id') {
      let currentSelectedMentor = mentorList.find((item) => item.id === e.target.value) || mentorList[0] || undefined;
      if (currentSelectedMentor) {
        let mentor = await getMentorDetail(e.target.value);
        setMentorFormData(mentor);
      }
      const detailMentor = await getMentorDetail(e.target.value);
      setCurrentMentor(detailMentor);
      let timeslotAPI = await getTimeslotList(e.target.value);
      setTimeslot(timeslotAPI);
      return;
    }
    setMentorFormData({ ...mentorFormData, [e.target.name]: e.target.value, schedule_id: '' });
  };

  const handleClickSchedule = (id) => {
    setMentorFormData({ ...mentorFormData, schedule_id: id, date: '' });
    setUpdateMentor({ mentor_id: mentorFormData.id, timeslot_id: id });
  };

  const convertDateTime = (date, time, time2, datetime, datetime2) => {
    if (!date && !time) return '';

    return (
      labelDay[date] +
      ' ' +
      time +
      'h - ' +
      time2 +
      'h ' +
      '( ' +
      datetime.split('T')[0] +
      ' - ' +
      datetime2.split('T')[0] +
      ' )'
    );
  };

  const handleClickButtonSession = (type) => {
    const newSessionDate = { ...sessionDate, [type]: !sessionDate[type] };
    setSessionDate(newSessionDate);
    const session = Object.keys(newSessionDate)
      .filter((item) => newSessionDate[item])
      .map((item) => labelSessionDate[item])
      .join(',');
    getAndSetListMentor({ session });
  };

  const getAndSetListMentor = async (data) => {
    // const conditions = {
    //   career: document.career,
    //   demand: document.demand,
    //   ...data
    // }
    let mentors = await getMentorListByCareer(mentor.career_category_id);

    setMentorFormData({ id: mentor.id, ...mentor, schedule_id: document.time_slot_id });

    setMentorList(mentors);
    let timeslotapi = await getTimeslotList(mentor.id);
    setTimeslot(timeslotapi);
  };

  useEffect(() => {
    if (profile?.email_address) {
      // getTocpicAndCareerCategory();
      if (profile?.demand) {
        setFormDemand(profile.demand.split(','));
      }
      setFormData({
        email: profile.email_address,
        number_phone: profile.number_phone,
        ...profile,
      });
    }
    if (mentor && document) {
      setCurrentMentor(mentor);
      getAndSetListMentor({
        session: '',
      });
    }
  }, [profile, mentor]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`${classes.editBox} ${mentor ? classes.editBoxMentor : ''}`}>
          <div id="modal-modal-title" style={style.title} variant="h6" component="h2">
            {mentor && (
              <div style={{ float: 'left' }}>
                <Button className={classes.buttonClose} onClick={() => handleGoBack('profile')}>
                  <ArrowBackIcon />
                </Button>
              </div>
            )}
            <div>{profile ? 'Chỉnh sửa thông tin khách hàng' : 'Chỉnh sửa thông tin Mentor'}</div>
            <div>
              <Button style={style.closeButton} onClick={handleClose}>
                <ClearIcon />
              </Button>
            </div>
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            {profile && (
              <>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Họ và tên:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="fullname"
                      value={formData.fullname}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Email:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="email"
                      value={formData.email}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>SĐT:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="number_phone"
                      value={formData?.number_phone}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Trình độ học vấn:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <Select
                      className={classes.multpleSelectField}
                      value={formData.degree_id || ''}
                      onChange={(event) => setFormData({ ...formData, degree_id: event.target.value })}
                    >
                      <MenuItem value="">
                        <em>Không chọn</em>
                      </MenuItem>
                      {degreeList &&
                        degreeList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Điểm mạnh:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="strength"
                      value={formData?.strength}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Điểm yếu:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="weakness"
                      value={formData?.weakness}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Ngành nghề:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <Select
                      labelId="demo-multiple-name-label-1"
                      id="demo-multiple-name-1"
                      className={classes.multpleSelectField}
                      value={formData.career_category_id || ''}
                      onChange={(event) => setFormData({ ...formData, career_category_id: event.target.value })}
                    >
                      <MenuItem value="">
                        <em>Không chọn</em>
                      </MenuItem>
                      {careerCategoryList &&
                        careerCategoryList.map((item) => (
                          <MenuItem key={item.id} value={item.id} selected={formData.career_category_id === item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Nhu cầu tư vấn:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <Select
                      multiple={true}
                      className={classes.multpleSelectField}
                      value={formData.topic_id_list || []}
                      onChange={(event) => setFormData({ ...formData, topic_id_list: event.target.value })}
                    >
                      {careerTopicList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Giới tính:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <Select
                      className={classes.multpleSelectField}
                      value={formData.gender_id || ''}
                      onChange={(event) => setFormData({ ...formData, gender_id: event.target.value })}
                    >
                      {genderList &&
                        genderList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Tỉnh:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <Select
                      className={classes.multpleSelectField}
                      value={formData.province_id || ''}
                      onChange={(event) => setFormData({ ...formData, province_id: event.target.value })}
                    >
                      {provinceList &&
                        provinceList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={4} md={4} xs={12}>
                    <span className={classes.tabItemLabelField}>Trường:</span>
                  </Grid>
                  <Grid item lg={8} md={8} xs={12}>
                    <TextField
                      fullWidth
                      rows={1}
                      rowsMax={1}
                      variant="outlined"
                      name="current_school"
                      value={formData?.current_school}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.gridItem} alignItems="center">
                  <Grid item lg={12} md={12} xs={12}>
                    <span className={classes.tabItemLabelField}>Câu hỏi cho mentor:</span>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <TextField
                      multiline
                      fullWidth
                      rows={3}
                      rowsMax={3}
                      variant="outlined"
                      name="question"
                      value={formData?.question}
                      className={classes.inputField}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {mentor && (
              <Grid container>
                <Grid item lg={6} md={6} xs={12} style={{ paddingRight: '20px', borderRight: '1px solid #000' }}>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Họ và tên:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <Select
                        name="mentor_id"
                        labelId="demo-multiple-name-label-2"
                        id="demo-multiple-name-2"
                        className={classes.multpleSelectField}
                        value={mentorFormData.id}
                        onChange={handleMentorChange}
                      >
                        {mentorList?.map((mentorInfo) => (
                          <MenuItem key={mentorInfo.id} value={mentorInfo.id}>
                            {mentorInfo.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Lịch cố định:</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} style={{ justifyContent: 'center' }} alignItems="center">
                    {timeslot?.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleClickSchedule(item.id)}
                        className={`${classes.mentorSchedule} ${
                          mentorFormData.schedule_id === item.id ? 'active' : ''
                        }`}
                      >
                        <div>{item.weekday}</div>
                        <div>{item.from_date.split('T')[0] || ''}</div>
                        <div>{item.from_date.split('T')[1] || ''}</div>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} xs={12} style={{ paddingLeft: '20px' }}>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Họ và tên</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        variant="outlined"
                        name="fullname"
                        value={currentMentor?.fullname}
                        className={classes.inputField}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Email:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        variant="outlined"
                        name="email_address"
                        value={currentMentor?.email_address}
                        className={classes.inputField}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>SĐT:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        variant="outlined"
                        name="phone_number"
                        value={currentMentor?.phone_number}
                        className={classes.inputField}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Chuyên ngành:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        variant="outlined"
                        name="career"
                        value={currentMentor?.career}
                        className={classes.inputField}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Title:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      <TextField
                        disabled
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={2}
                        variant="outlined"
                        name="title"
                        value={currentMentor?.title}
                        className={`${classes.inputField} inputFieldDisabled`}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Workday 1:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      {currentMentor?.workday?.length > 0 && (
                        <TextField
                          disabled
                          fullWidth
                          rows={1}
                          rowsMax={1}
                          variant="outlined"
                          name="weakness"
                          value={
                            currentMentor &&
                            convertDateTime(
                              currentMentor?.workday[0].week_day,
                              currentMentor?.workday[0].from_hour,
                              currentMentor?.workday[0].to_hour,
                              currentMentor?.workday[0].applicable_from_date,
                              currentMentor?.workday[0].applicable_to_date
                            )
                          }
                          className={classes.inputField}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem} alignItems="center">
                    <Grid item lg={4} md={4} xs={12}>
                      <span className={classes.tabItemLabelField}>Workday 2:</span>
                    </Grid>
                    <Grid item lg={8} md={8} xs={12}>
                      {currentMentor?.workday?.length > 1 && (
                        <TextField
                          disabled
                          fullWidth
                          rows={1}
                          rowsMax={1}
                          variant="outlined"
                          name="career"
                          value={convertDateTime(
                            currentMentor?.workday[1].week_day,
                            currentMentor?.workday[1].from_hour,
                            currentMentor?.workday[1].to_hour,
                            currentMentor?.workday[1].applicable_from_date,
                            currentMentor?.workday[1].applicable_to_date
                          )}
                          className={classes.inputField}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </div>
          <div id="modal-modal-footer" sx={{ mt: 2 }}>
            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.buttonCancel} onClick={() => handleClose(true)}>
                Huỷ bỏ
              </Button>
              {(timeslot.length > 0 || profile) && (
                <Button
                  disabled={isDisabledSaving}
                  type="button"
                  variant="contained"
                  style={style.buttonSubmit}
                  onClick={handleSubmitForm}
                >
                  Lưu
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
