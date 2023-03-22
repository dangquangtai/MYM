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
  Select,
  MenuItem,
  Slide,
  Tab,
  Tabs,
  Typography,
  TextField,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { image_default, view } from '../../../../store/constant';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions';
import Alert from '../../../../component/Alert';
import {
  QueueMusic,
  History,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  RadioOutlined as RadioOutlinedIcon,
} from '@material-ui/icons';
import { initObjectType, initNotificationMessage } from '../../../../store/constants/initial';
import useStyles from './../../../../utils/classes';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useBanner from './../../../../hooks/useBanner';
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

const BannerModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listObject, setlistObject] = useState([]);
  const [listObjectType, setlistObjectType] = useState(initObjectType);
  const { form_buttons: formButtons } = useView();
  const { bannerDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.banner.detail.save);
  const { createBanner, updateBanner } = useBanner();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { getListObject } = useNotification();
  const [services,setService] =useState(['HIGH_SCHOOL','UEB_MENTOR','CAREER'])
  const [action, setAction] = useState({...initNotificationMessage.action,image_url:image_default, code:''});
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: '',
  });
  const [bannerType, setBannerType] = useState([
    { id: 'VIDEO', value: 'Video' },
    { id: 'IMAGE', value: 'Hình ảnh' },
  ]);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const [banner, setbanner] = useState({
    image_url: image_default,
    video_url: '',
    is_active: true,
  });

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, bannerDocument: false });
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
    if (dialogUpload.type === 'image') {
      if (choice) {
        setAction({ ...action, image_url: image });
      } else setbanner({ ...banner, image_url: image });
    }
    if (dialogUpload.type === 'video') {
      setbanner({ ...banner, video_url: image });
    }
  };

  const setDocumentToDefault = async () => {
    setbanner({
      image_url: image_default,
      video_url: '',
      is_active: true,
    });
    setAction({image_url:image_default});
    setTabIndex(0);
  };

  const handleOpenDiaLog = (type) => {
    setDialogUpload({ open: true, type: type });
  };
  const [choice, setChoice] = useState(false);
  const handleCloseDiaLog = (type) => {
    setDocumentToDefault();
    setDialogUpload({ open: false, type: type });
  };
  const handleChangeObjectType = async (e) => {
    const { name, value } = e.target;
    const newBanner = { ...action, [name]: value };
    setAction(newBanner);
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setbanner({ ...banner, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateBanner({...banner,action:action});
        handleOpenSnackbar(true, 'success', 'Cập nhật banner thành công!');
      } else {
        await createBanner({...banner,action:action});
        handleOpenSnackbar(true, 'success', 'Tạo mới banner thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'banner' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setbanner({
      ...banner,
      ...selectedDocument,
    });
    setService(['HIGH_SCHOOL','UEB_MENTOR','CAREER']);
    setAction({...action,...selectedDocument.action})
  }, [selectedDocument]);
  useEffect(() => {
    getListObjectByType(action.object_type);
  }, [action.object_type]);

  const getListObjectByType = async (type) => {
    const listObject = await getListObject(type);
    setlistObject(listObject);
  };
  const handleChangeAction = (e) => {
    const { name, value } = e.target;
    const newAction = { ...action, [name]: value };
    setAction(newAction);
  };
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
        open={dialogUpload.open || false}
        onSuccess={setURL}
        onClose={handleCloseDiaLog}
        type={dialogUpload.type === 'video' ? 'video' : 'image'}
        folder="Banner"
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
              Banner
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
                    <Grid item lg={12} md={12} xs={12}>
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
                              <img src={banner.image_url} alt="" />
                              <div>
                                <Button
                                  onClick={() => {
                                    handleOpenDiaLog('image');
                                    setChoice(false);
                                  }}
                                >
                                  Chọn ảnh banner
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <div className={classes.tabItem}>
                            <div className={classes.tabItemTitle}>
                              <div className={classes.tabItemLabel}>
                                <ImageIcon />
                                <span>Video</span>
                              </div>
                            </div>
                            <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                              <img
                                src={
                                  'https://firebasestorage.googleapis.com/v0/b/huongnghiepnhanh.appspot.com/o/Banner%2Fpng-transparent-computer-icons-video-player-scalable-graphics-youtube-video-player-icon-angle-rectangle-triangle-thumbnail.png?alt=media&token=143b3b76-4202-4f49-92a3-32218a6b465d'
                                }
                                alt=""
                              />
                              <div>
                                {banner.banner_type === 'VIDEO' ? (
                                  <Button onClick={() => handleOpenDiaLog('video')}>Chọn video</Button>
                                ) : undefined}
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <QueueMusic />
                            <span>Chi tiết Banner</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên banner(*):</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="title"
                                value={banner.title || ''}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Số thứ tự:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                name="order_number"
                                value={banner.order_number || ''}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Loại banner(*):</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="banner_type"
                                labelId="career-label"
                                id="banner_type"
                                className={classes.multpleSelectField}
                                value={banner.banner_type || ''}
                                onChange={handleChanges}
                              >
                                {bannerType?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={banner.is_active || false}
                                onChange={(e) => setbanner({ ...banner, is_active: e.target.checked })}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <Grid container spacing={1}>
                        {/* <Grid item lg={6} md={6} xs={6}>
                          <div className={classes.tabItem}>
                            <div className={classes.tabItemTitle}>
                              <div className={classes.tabItemLabel}>
                                <ImageIcon />
                                <span>Hình ảnh</span>
                              </div>
                            </div>
                            <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                              <img src={action.image_url} alt="" />
                              <div>
                                <Button
                                  onClick={() => {
                                    handleOpenDiaLog('image');
                                    setChoice(true);
                                  }}
                                >
                                  Chọn ảnh
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Grid> */}
                        <Grid item lg={12} md={12} xs={12}>
                          <div className={classes.tabItem}>
                            <div className={classes.tabItemTitle}>
                              <div className={classes.tabItemLabel}>
                                <RadioOutlinedIcon />
                                <span>Action</span>
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
                                    variant="outlined"
                                    name="title"
                                    value={action.title}
                                    className={classes.inputField}
                                    onChange={handleChangeAction}
                                  />
                                </Grid>
                              </Grid>
                              <Grid container className={classes.gridItemInfo} alignItems="center">
                                <Grid item lg={4} md={4} xs={4}>
                                  <span className={classes.tabItemLabelField}>Action label:</span>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="label"
                                    value={action.label}
                                    className={classes.inputField}
                                    onChange={handleChangeAction}
                                  />
                                </Grid>
                              </Grid>
                              <Grid container className={classes.gridItemInfo} alignItems="center">
                                <Grid item lg={4} md={4} xs={4}>
                                  <span className={classes.tabItemLabelField}>Link:</span>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="link"
                                    value={action.link}
                                    className={classes.inputField}
                                    onChange={handleChangeAction}
                                  />
                                </Grid>
                              </Grid>
                              <Grid container className={classes.gridItemInfo} alignItems="center">
                                <Grid item lg={4} md={4} xs={4}>
                                  <span className={classes.tabItemLabelField}>Object Type:</span>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                  <Select
                                    name="object_type"
                                    labelId="career-label"
                                    className={classes.multpleSelectField}
                                    value={action.object_type}
                                    onChange={handleChangeObjectType}
                                  >
                                    {listObjectType?.map((item) => (
                                      <MenuItem key={item} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Grid>
                              </Grid>
                              <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Object ID:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="object_id"
                                labelId="career-label"
                                id="object_id"
                                className={classes.multpleSelectField}
                                value={action.object_id}
                                onChange={handleChangeAction}
                              >
                                {listObject?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                              <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mã dịch vụ:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="code"
                                labelId="career-label"
                                className={classes.multpleSelectField}
                                value={action.code}
                                onChange={handleChangeAction}
                              >
                                {services.map((item) => (
                                  <MenuItem key={item} value={item} selected={item===action.code}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
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

export default BannerModal;
