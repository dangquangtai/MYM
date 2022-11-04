import {
  Switch,
  Snackbar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Tab,
  Tabs,
  Typography,
  TextField,
  MenuItem,
  Select,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import Alert from '../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../hooks/useView';
import usePartner from '../../../hooks/usePartner';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE, CONFIRM_CHANGE } from '../../../store/actions.js';
import { tinyMCESecretKey, view } from '../../../store/constant';
import { userAvatar, initMentorData } from '../../../store/constants/initial';
import { timeWorking } from '../../../store/constants/time';
import ScheduleModal from '../ScheduleModal';
import { convertDate } from '../../../utils/table.js';
import useStyles from './../../../utils/classes';
import FirebaseUpload from './../../FloatingMenu/FirebaseUpload/index';
import useConfirmPopup from './../../../hooks/useConfirmPopup';
import { format as formatDate } from 'date-fns';
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ImageOutlined as ImageIcon,
  Today as TodayIcon,
} from '@material-ui/icons';
import { Editor } from '@tinymce/tinymce-react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MentorModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editorRef = React.useRef(null);
  const { form_buttons: formButtons } = useView();

  const workingDayButton = formButtons.find((button) => button.name === view.mentor.detail.workday);
  const leaveButton = formButtons.find((button) => button.name === view.mentor.detail.vacation);
  const saveButton = formButtons.find((button) => button.name === view.mentor.detail.save);
  const generateButton = formButtons.find((button) => button.name === view.mentor.detail.generate_timeslot);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { createMentor, updateMentor, getCareerAndTopic, generateTimeslot, getTimeslot } = usePartner();
  const { setConfirmPopup } = useConfirmPopup();

  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    type: '',
  });
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [mentorData, setMentorData] = useState(initMentorData);
  const [categories, setCategories] = useState({
    counselling: [],
    career: [],
    topic: [],
  });
  const [career, setCareer] = useState({
    one: [],
    two: [],
    three: [],
  });
  const [topic, setTopic] = useState({
    one: [],
    two: [],
    three: [],
  });
  const [timeslot, setTimeslot] = useState([]);

  const { mentorDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const { provinces, genders, weekday } = useSelector((state) => state.metadata);

  const handleCloseDialog = () => {
    setMentorData(initMentorData);
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, mentorDocument: false });
  };

  const handleOpenSnackbar = (isOpen, type, text) => {
    setSnackbarStatus({
      isOpen: isOpen,
      type: type,
      text: text,
    });
  };

  const setDocumentToDefault = async () => {
    setCareer({
      one: [],
      two: [],
      three: [],
    });
    setTopic({
      one: [],
      two: [],
      three: [],
    });
    setTabIndex(0);
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  };
  const setURL = (image) => {
    setMentorData({ ...mentorData, image_url: image });
  };

  const handleOpenDiaLog = () => {
    setOpenDiaLogUploadImage(true);
  };
  const handleCloseDiaLog = () => {
    setOpenDiaLogUploadImage(false);
  };

  const handleChangeMentor = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'counselling_category1_id')
      setMentorData((mentorData) => ({ ...mentorData, counselling_topic1_id: [] }));
    if (name === 'counselling_category2_id')
      setMentorData((mentorData) => ({ ...mentorData, counselling_topic2_id: [] }));
    if (name === 'counselling_category3_id')
      setMentorData((mentorData) => ({ ...mentorData, counselling_topic3_id: [] }));
    setMentorData((mentorData) => ({ ...mentorData, [name]: value }));
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateMentor({
          ...mentorData,
          description:
            editorRef.current && editorRef.current.getContent()
              ? editorRef.current.getContent({ format: 'text' })
              : mentorData.description,
        });
        handleOpenSnackbar(true, 'success', 'Cập nhật Mentor thành công!');
      } else {
        const ret = await createMentor({
          ...mentorData,
          description:
            editorRef.current && editorRef.current.getContent()
              ? editorRef.current.getContent({ format: 'text' })
              : mentorData.description,
        });
        if (ret.return === 200) {
          handleOpenSnackbar(true, 'success', 'Tạo Mentor thành công!');
        } else {
          handleOpenSnackbar(true, 'error', ret.message);
          return;
        }
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'mentor' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleSubmitWorkingDay = async (data) => {
    try {
      if (selectedDocument?.id) {
        await updateMentor(data);
        if (scheduleModal.type === 'working') {
          handleOpenSnackbar(true, 'success', 'Cập nhật lịch làm việc thành công!');
        } else {
          handleOpenSnackbar(true, 'success', 'Cập nhật lịch nghỉ phép thành công!');
        }
      }
      setMentorData({ ...mentorData, ...data });
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleSubmitSchedule = async (data) => {
    await handleSubmitWorkingDay(data);
    setScheduleModal({ isOpen: false, type: '' });
  };

  const showConfirmPopup = ({ title = 'Thông báo', message = '', action = null, payload = null, onSuccess = null }) => {
    setConfirmPopup({ type: CONFIRM_CHANGE, open: true, title, message, action, payload, onSuccess });
  };

  const handleGenerateTimeslot = () => {
    showConfirmPopup({
      message: `Bạn chắc chắn tạo lịch tự động cho mentor ${mentorData?.fullname} ?`,
      action: generateTimeslot,
      payload: mentorData?.id,
      onSuccess: successGenerateTimeslot,
    });
  };

  const successGenerateTimeslot = () => {
    handleOpenSnackbar(true, 'success', 'Tạo lịch tự động thành công!');
    getTimeslotByMentor(mentorData?.id);
  };

  const getTimeslotByMentor = async (id) => {
    const res = await getTimeslot(id);
    setTimeslot(res);
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setMentorData({
      ...mentorData,
      ...selectedDocument,
      phone_number: selectedDocument?.phone_number || '',
      image_url: selectedDocument?.image_url || userAvatar,
    });
    getTimeslotByMentor(selectedDocument.id);
  }, [selectedDocument]);

  useEffect(() => {
    const fetchCareerAndTopic = async () => {
      const data = await getCareerAndTopic();
      setCategories({
        counselling: data?.list_category || [],
        career: data?.list_career || [],
        topic: data?.list_topic || [],
      });
    };
    fetchCareerAndTopic();
  }, []);

  useEffect(() => {
    setCareer({
      one: categories?.career?.filter((item) => item.counselling_category_id === mentorData?.counselling_category1_id),
      two: categories?.career?.filter((item) => item.counselling_category_id === mentorData?.counselling_category2_id),
      three: categories?.career?.filter(
        (item) => item.counselling_category_id === mentorData?.counselling_category3_id
      ),
    });
    setTopic({
      one:
        categories?.topic?.filter((item) => item.counselling_category_id === mentorData?.counselling_category1_id) ||
        [],
      two:
        categories?.topic?.filter((item) => item.counselling_category_id === mentorData?.counselling_category2_id) ||
        [],
      three:
        categories?.topic?.filter((item) => item.counselling_category_id === mentorData?.counselling_category3_id) ||
        [],
    });
  }, [
    mentorData?.counselling_category1_id,
    mentorData?.counselling_category2_id,
    mentorData?.counselling_category3_id,
  ]);

  return (
    <React.Fragment>
      {scheduleModal.isOpen && (
        <ScheduleModal
          isOpen={scheduleModal.isOpen}
          type={scheduleModal.type}
          handleClose={() => setScheduleModal({ isOpen: false, type: '' })}
          mentor={mentorData}
          submit={handleSubmitSchedule}
        />
      )}
      {snackbarStatus.isOpen && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbarStatus.isOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarStatus({ ...snackbarStatus, isOpen: false })}
        >
          <Alert
            onClose={() => setSnackbarStatus({ ...snackbarStatus, isOpen: false })}
            severity={snackbarStatus.type}
            sx={{ width: '100%' }}
          >
            {snackbarStatus.text}
          </Alert>
        </Snackbar>
      )}
      <FirebaseUpload
        open={openDialogUploadImage || false}
        onSuccess={setURL}
        onClose={handleCloseDiaLog}
        type="image"
        folder="Mentor"
      />
      <Grid container>
        <Dialog
          open={openDialog || false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          className={classes.useradddialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            <Grid item xs={12} style={{ textTransform: 'uppercase' }}>
              Chi tiết Mentor
            </Grid>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tabs
                  value={tabIndex}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="scrollable"
                >
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <AccountCircleOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Chi tiết Mentor
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <AccountCircleOutlinedIcon className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
                        Mô tả
                      </Typography>
                    }
                    value={1}
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <TodayIcon className={`${tabIndex === 2 ? classes.tabActiveIcon : ''}`} />
                        Dịch vụ tư vấn
                      </Typography>
                    }
                    value={2}
                    {...a11yProps(2)}
                  />
                  {mentorData?.id && (
                    <Tab
                      className={classes.unUpperCase}
                      label={
                        <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                          <TodayIcon className={`${tabIndex === 3 ? classes.tabActiveIcon : ''}`} />
                          Lịch làm việc
                        </Typography>
                      }
                      value={3}
                      {...a11yProps(3)}
                    />
                  )}
                  {mentorData?.id && (
                    <Tab
                      className={classes.unUpperCase}
                      label={
                        <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                          <TodayIcon className={`${tabIndex === 4 ? classes.tabActiveIcon : ''}`} />
                          Timeslot
                        </Typography>
                      }
                      value={4}
                      {...a11yProps(4)}
                    />
                  )}
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={tabIndex} index={0}>
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={mentorData.image_url} alt="image_url" />
                          <div>
                            <div>Upload/Change Mentor's Profile Image</div>
                            <Button onClick={handleOpenDiaLog}>Chọn hình đại diện</Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin cá nhân</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Họ và tên:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="fullname"
                                value={mentorData.fullname}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Chức danh:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                variant="outlined"
                                name="title"
                                value={mentorData?.title}
                                className={classes.multilineInputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Thứ tự:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="order_number"
                                value={mentorData.order_number}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin thêm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Email:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="email_address"
                                value={mentorData.email_address}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>SĐT:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="phone_number"
                                value={mentorData.phone_number}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Giới tính:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="gender_id"
                                className={classes.multpleSelectField}
                                value={mentorData.gender_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {genders?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Link Facebook:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="fb_url"
                                value={mentorData?.fb_url}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Link LinkedIn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="linkedin_url"
                                value={mentorData?.linkedin_url}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tỉnh:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="province_id"
                                className={classes.multpleSelectField}
                                value={mentorData.province_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {provinces?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Địa chỉ:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="address"
                                value={mentorData?.address}
                                className={classes.inputField}
                                onChange={handleChangeMentor}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Được chứng nhận:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={mentorData.is_certified}
                                onChange={() =>
                                  setMentorData({ ...mentorData, is_certified: !mentorData.is_certified })
                                }
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Lịch trống gần nhất:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                disabled
                                fullWidth
                                type="datetime-local"
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                value={mentorData.next_available_date}
                                className={classes.inputField}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Editor
                        apiKey={tinyMCESecretKey}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={mentorData.description}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: 'emoticons',
                          toolbar: 'undo redo | ' + 'emoticons',
                          content_style: 'body { font-family:Roboto,sans-serif; font-size:15px }',
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                  <Grid container spacing={1}>
                    <Grid item lg={4} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin tư vấn</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Danh mục tư vấn 1:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="counselling_category1_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_category1_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {categories?.counselling?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Ngành nghề tư vấn 1:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="career_category1_id"
                                className={classes.multpleSelectField}
                                value={mentorData.career_category1_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {career?.one?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Chủ đề tư vấn 1:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                multiple
                                name="counselling_topic1_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_topic1_id || []}
                                onChange={handleChangeMentor}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={categories?.topic?.find((i) => i.id === value)?.value}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {topic?.one?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin tư vấn</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Danh mục tư vấn 2:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="counselling_category2_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_category2_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {categories?.counselling?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Ngành nghề tư vấn 2:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="career_category2_id"
                                className={classes.multpleSelectField}
                                value={mentorData.career_category2_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {career?.two?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Chủ đề tư vấn 2:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                multiple
                                name="counselling_topic2_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_topic2_id || []}
                                onChange={handleChangeMentor}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={categories?.topic?.find((i) => i.id === value)?.value}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {topic?.two?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin tư vấn</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Danh mục tư vấn 3:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="counselling_category3_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_category3_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {categories?.counselling?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Ngành nghề tư vấn 3:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                name="career_category3_id"
                                className={classes.multpleSelectField}
                                value={mentorData.career_category3_id || ''}
                                onChange={handleChangeMentor}
                              >
                                {career?.three?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={6} md={6} xs={6}>
                              <span className={classes.tabItemLabelField}>Chủ đề tư vấn 3:</span>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Select
                                multiple
                                name="counselling_topic3_id"
                                className={classes.multpleSelectField}
                                value={mentorData.counselling_topic3_id || []}
                                onChange={handleChangeMentor}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={categories?.topic?.find((i) => i.id === value)?.value}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {topic?.three?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                {mentorData?.id && (
                  <TabPanel value={tabIndex} index={3}>
                    <Grid container spacing={1}>
                      <Grid item lg={12} md={12} xs={12}>
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <TodayIcon />
                              <span>Lịch làm việc</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                            {mentorData?.workday?.map((workingDay, i) => (
                              <Grid key={i} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                                <Grid item lg={2} md={4} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label="Chọn thứ"
                                    variant="outlined"
                                    select
                                    size="small"
                                    value={workingDay.week_day}
                                  >
                                    {weekday?.map((item) => (
                                      <MenuItem key={item.id} value={item.id}>
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item lg={3} md={4} xs={12}>
                                  <Grid container spacing={1} alignItems="center">
                                    <Grid item lg={6} md={6} xs={6}>
                                      <TextField
                                        disabled
                                        fullWidth
                                        variant="outlined"
                                        label="Từ giờ"
                                        select
                                        size="small"
                                        value={workingDay.from_hour}
                                      >
                                        {timeWorking?.map((item) => (
                                          <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid item lg={6} md={6} xs={6}>
                                      <TextField
                                        disabled
                                        fullWidth
                                        variant="outlined"
                                        label="Đến giờ"
                                        select
                                        size="small"
                                        value={workingDay.to_hour}
                                      >
                                        {timeWorking?.map((item) => (
                                          <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    id="datetime-local"
                                    variant="outlined"
                                    label="Thời gian bắt đầu"
                                    type="date"
                                    size="small"
                                    value={convertDate(workingDay.applicable_from_date)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    id="datetime-local"
                                    variant="outlined"
                                    label="Thời gian kết thúc"
                                    type="date"
                                    size="small"
                                    value={convertDate(workingDay.applicable_to_date)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item lg={1} md={2} xs={12}>
                                  <Switch disabled checked={workingDay.is_active} color="primary" />
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        </div>
                      </Grid>
                      <Grid item lg={12} md={12} xs={12}>
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <TodayIcon />
                              <span>Lịch nghỉ phép</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                            {mentorData?.vacation?.map((vacationDay, i) => (
                              <Grid key={i} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                                <Grid item lg={2} md={4} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label="Chọn thứ"
                                    variant="outlined"
                                    select
                                    size="small"
                                    value={vacationDay.week_day}
                                  >
                                    {weekday?.map((item) => (
                                      <MenuItem key={item.id} value={item.id}>
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item lg={3} md={4} xs={12}>
                                  <Grid container spacing={1} alignItems="center">
                                    <Grid item lg={6} md={6} xs={6}>
                                      <TextField
                                        disabled
                                        fullWidth
                                        variant="outlined"
                                        label="Từ giờ"
                                        select
                                        size="small"
                                        value={vacationDay.from_hour}
                                      >
                                        {timeWorking?.map((item) => (
                                          <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid item lg={6} md={6} xs={6}>
                                      <TextField
                                        disabled
                                        fullWidth
                                        variant="outlined"
                                        label="Đến giờ"
                                        select
                                        size="small"
                                        value={vacationDay.to_hour}
                                      >
                                        {timeWorking?.map((item) => (
                                          <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    id="datetime-local"
                                    variant="outlined"
                                    label="Thời gian bắt đầu"
                                    type="date"
                                    size="small"
                                    value={convertDate(vacationDay.applicable_from_date)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    id="datetime-local"
                                    variant="outlined"
                                    label="Thời gian kết thúc"
                                    type="date"
                                    size="small"
                                    value={convertDate(vacationDay.applicable_to_date)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item lg={1} md={2} xs={12}>
                                  <Switch disabled checked={vacationDay.is_active} color="primary" />
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                )}
                {mentorData?.id && (
                  <TabPanel value={tabIndex} index={4}>
                    <Grid container spacing={1}>
                      <Grid item lg={10} md={12} xs={12}>
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <TodayIcon />
                              <span>Timeslot</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                            <TableContainer style={{ maxHeight: 500 }} component={Paper}>
                              <Table aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">Thứ</TableCell>
                                    <TableCell align="center">Ngày</TableCell>
                                    <TableCell align="center">Từ giờ</TableCell>
                                    <TableCell align="center">Đến giờ</TableCell>
                                    <TableCell align="center">Hoạt động</TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {timeslot.map((row) => (
                                    <TableRow key={row.id}>
                                      <TableCell align="center" component="th" scope="row">
                                        {row.weekday}
                                      </TableCell>
                                      <TableCell align="center">
                                        {formatDate(new Date(row.from_date), 'dd/MM/yyyy')}
                                      </TableCell>
                                      <TableCell align="center">
                                        {formatDate(new Date(row.from_date), 'HH:mm')}
                                      </TableCell>
                                      <TableCell align="center">{formatDate(new Date(row.to_date), 'HH:mm')}</TableCell>
                                      <TableCell align="center">
                                        <Switch checked={row.is_active} color="primary" disabled />
                                      </TableCell>
                                      <TableCell align="center">{row.is_booked ? 'Đã đặt' : 'Chưa đặt'}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: 'rgb(70, 81, 105)' }}
                  onClick={() => handleCloseDialog()}
                >
                  Đóng
                </Button>
              </Grid>
              <Grid item className={classes.gridItemInfoButtonWrap}>
                {generateButton && selectedDocument?.id && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateTimeslot}
                    className={classes.gridItemInfoButton}
                  >
                    {generateButton.text}
                  </Button>
                )}
                {workingDayButton && selectedDocument?.id && (
                  <Button
                    className={classes.gridItemInfoButton}
                    onClick={() => setScheduleModal({ isOpen: true, type: 'working' })}
                  >
                    {workingDayButton.text}
                  </Button>
                )}
                {leaveButton && selectedDocument?.id && (
                  <Button
                    className={classes.gridItemInfoButton}
                    onClick={() => setScheduleModal({ isOpen: true, type: 'vacation' })}
                  >
                    {leaveButton.text}
                  </Button>
                )}
                {saveButton && selectedDocument?.id && (
                  <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={handleSubmitForm}>
                    {saveButton.text}
                  </Button>
                )}
                {!selectedDocument?.id && (
                  <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={handleSubmitForm}>
                    Tạo mới
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default MentorModal;
