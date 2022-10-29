import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { view } from '../../../../store/constant';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions';
import Alert from '../../../../component/Alert';
import { initMentorListData, userAvatar,initNotification } from '../../../../store/constants/initial';
import {
  QueueMusic,
  History,
  DescriptionOutlined as DescriptionOutlinedIcon,
  RadioOutlined as RadioOutlinedIcon,
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import useStyles from './../../../../utils/classes';
import usePartner from './../../../../hooks/usePartner';
import useMedia from './../../../../hooks/useMedia';
import { Autocomplete } from '@material-ui/lab';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useNotification from '../../../../hooks/useNotification';

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

const NotificationCategoryModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { notificationCategoryDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.notificationCategory.detail.save);
  const { create_notification_category, update_notification_category, getMentorList } = useNotification();
  const { getCounselingCategories } = useMedia();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  // console.log(formButtons)

  // const [mentorListData, setMentorListData] = useState(initMentorListData);
  const [categories, setCategories] = useState([]);
  const [listMentor, setListMentor] = useState([]);
  const [notificationCategory, setnotificationCategory] = useState(initNotification);
  const [selectednotificationCategory, setselectednotificationCategory] = useState([]);
//  console.log(notificationCategory);
  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, notificationCategoryDocument: false });
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleOpenSnackbar = (isOpen, type, text) => {
    setSnackbarStatus({
      isOpen: isOpen,
      type: type,
      text: text,
    });
  };

  const setURL = (image) => {
    setnotificationCategory({ ...notificationCategory, image_url: image });
  };

  const setDocumentToDefault = async () => {
    // setMentorListData(initMentorListData);
    setnotificationCategory(initNotification);
    setTabIndex(0);
  };

  const handleOpenDiaLog = () => {
    setOpenDiaLogUploadImage(true);
  };

  const handleCloseDiaLog = () => {
    setOpenDiaLogUploadImage(false);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setnotificationCategory({ ...notificationCategory, [name]: value });
  };

//   const handleChangeMentor = (e, value) => {
//     setSelectedMentor(value);
//     setMentorListData({ ...mentorListData, mentor_id_list: value.map((item) => item.id) });
//   };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await update_notification_category(notificationCategory);
        handleOpenSnackbar(true, 'success', 'Cập nhật danh mục thông báo thành công!');
      } else {
        await create_notification_category(notificationCategory);
        handleOpenSnackbar(true, 'success', 'Tạo mới danh mục thông báo thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'notificationCategory' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };


  useEffect(() => {
    if (!selectedDocument) return;
    setnotificationCategory({
      ...notificationCategory,
      ...selectedDocument,
      image_url: selectedDocument.image_url || userAvatar,
    });
    // setSelectedMentor(listMentor.filter((item) => selectedDocument?.mentor_id_list?.includes(item.id)));
  }, [selectedDocument]);

//   useEffect(() => {
//     const fetch = async () => {
//       const data = await getCounselingCategories();
//       setCategories(data);
//       const res = await getMentorList();
//       setListMentor(res);
//     };
//     fetch();
//   }, []);

  return (
    <React.Fragment>
      {snackbarStatus.isOpen && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbarStatus.isOpen}
          autoHideDuration={3000}
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
              MentorList
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
                        <DescriptionOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Nội dung
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <History className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
                        Lịch sử thay đổi
                      </Typography>
                    }
                    value={1}
                    {...a11yProps(1)}
                  />
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
                          <img src={notificationCategory.image_url} alt="image_url" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={handleOpenDiaLog}>Chọn hình đại diện</Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <QueueMusic />
                            <span>Chi tiết danh mục thông báo</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tiêu đề:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="title"
                                value={notificationCategory.title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ngày tạo:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={1}
                                rowsMax={1}
                                readOnly={true}
                                disabled
                                variant="outlined"
                                name="description"
                                value={notificationCategory.created_date}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Người tạo:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={1}
                                rowsMax={1}
                                readOnly={true}
                                disabled
                                variant="outlined"
                                name="description"
                                value={notificationCategory.created_by}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={notificationCategory.is_active}
                                onChange={() =>
                                  setnotificationCategory({ ...notificationCategory, is_hidden: !notificationCategory.is_hidden })
                                }
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
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
                            <RadioOutlinedIcon />
                            <span>Danh sách Mentor</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Tin nhắn thông báo:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              {/* <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                className={classes.multpleSelectField}
                                value={mentorListData?.podcast_id_list}
                                onChange={handleChangePodcast}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={podcastList?.find((i) => i.id === value)?.title}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {podcastList?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.title}
                                  </MenuItem>
                                ))}
                              </Select> */}
                              <Autocomplete
                                id="mentor-list"
                                multiple
                                size="small"
                                options={listMentor}
                                getOptionLabel={(option) => option?.fullname}
                                value={selectednotificationCategory}
                                // onChange={handleChangeMentor}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" placeholder="Mentor" />
                                )}
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
                    <Grid item lg={6} md={6} xs={12}></Grid>
                    <Grid item lg={6} md={6} xs={12}></Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-between">
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

export default NotificationCategoryModal;
