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
import Alert from '../../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions.js';
import { view } from '../../../../store/constant';
import useStyles from '../../../../utils/classes';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useShare from './../../../../hooks/useShare';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  InfoOutlined as InfoOutlinedIcon,
  Attachment as AttachmentIcon,
} from '@material-ui/icons';
import useNotification from '../../../../hooks/useNotification.js';
import { initObjectType, initBroadcastData } from './../../../../store/constants/initial';
import { Autocomplete } from '@material-ui/lab';

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

const BroadcastModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { broadcastDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.broadcast.detail.save);
  const { createBroadcast, updateBroadcast, getCategoryAndChannel } = useShare();
  const { getListObject } = useNotification();
  const [tabIndex, setTabIndex] = React.useState(0);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [broadcastData, setBroadcastData] = useState({});
  const [broadcast, setBroadcast] = useState({
    channel: [],
    category: [],
  });
  const [objectList, setObjectList] = useState([]);
  const [selectedObject, setSelectedObject] = useState(initBroadcastData);
  const objectTypes = initObjectType;

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, broadcastDocument: false });
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

  const setDocumentToDefault = async () => {
    setBroadcastData(initBroadcastData);
    setSelectedObject(null);
    setTabIndex(0);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setBroadcastData({ ...broadcastData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateBroadcast(broadcastData);
        handleOpenSnackbar(true, 'success', 'Cập nhật Broadcast thành công!');
      } else {
        await createBroadcast(broadcastData);
        handleOpenSnackbar(true, 'success', 'Tạo mới Broadcast thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'broadcast' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setBroadcastData({
      ...broadcastData,
      ...selectedDocument,
    });
  }, [selectedDocument]);

  useEffect(() => {
    const fetch = async () => {
      const { channel_list, category_list } = await getCategoryAndChannel();
      setBroadcast({
        channel: channel_list,
        category: category_list,
      });
    };
    fetch();
  }, []);

  const getObject = async (type) => {
    const list = await getListObject(type);
    setObjectList(list);
    setSelectedObject(list.find((object) => object.id === selectedDocument?.object_id) || null);
  };

  useEffect(() => {
    if (!broadcastData.object_type) return;
    getObject(broadcastData.object_type);
  }, [broadcastData.object_type]);

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
              Chi tiết Broadcast
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
                        <HistoryIcon className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
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
                    <Grid item lg={7} md={7} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <InfoOutlinedIcon />
                            <span>Thông tin Broadcast</span>
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
                                name="subject"
                                value={broadcastData.subject || ''}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nội dung:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={7}
                                rowsMax={10}
                                variant="outlined"
                                name="body"
                                value={broadcastData.body || ''}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh mục:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="category_id"
                                className={classes.multpleSelectField}
                                value={broadcastData.category_id || ''}
                                onChange={handleChanges}
                              >
                                {broadcast.category?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Channel:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                multiple
                                name="channel_code"
                                className={classes.multpleSelectField}
                                value={broadcastData.channel_code || []}
                                onChange={handleChanges}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={broadcast.channel?.find((i) => i.id === value)?.value}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {broadcast.channel?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ngày gửi:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                type="datetime-local"
                                name="scheduled_datetime"
                                value={broadcastData.scheduled_datetime || ''}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={broadcastData.is_active || true}
                                onChange={(e) => setBroadcastData({ ...broadcastData, is_active: e.target.checked })}
                                color="primary"
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Is Actionable:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={broadcastData.is_actionable || false}
                                onChange={(e) =>
                                  setBroadcastData({ ...broadcastData, is_actionable: e.target.checked })
                                }
                                color="primary"
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Gửi cho tất cả:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={broadcastData.is_send_all || false}
                                onChange={(e) => setBroadcastData({ ...broadcastData, is_send_all: e.target.checked })}
                                color="primary"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={5} md={5} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <InfoOutlinedIcon />
                            <span>Thông tin thêm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Action Title:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="action_title"
                                value={broadcastData.action_title || ''}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Type:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="object_type"
                                className={classes.multpleSelectField}
                                value={broadcastData.object_type || ''}
                                onChange={handleChanges}
                              >
                                {objectTypes?.map((item) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>ID:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Autocomplete
                                size="small"
                                options={objectList}
                                getOptionLabel={(option) => option.value}
                                value={selectedObject}
                                onChange={(event, newValue) => {
                                  setBroadcastData({ ...broadcastData, object_id: newValue?.id });
                                  setSelectedObject(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" className={classes.inputField} />
                                )}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      {!broadcastData.is_send_all && (
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <InfoOutlinedIcon />
                              <span>Email</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={10}
                                  rowsMax={15}
                                  variant="outlined"
                                  name="email_list_string"
                                  value={broadcastData.email_list_string || ''}
                                  className={classes.multilineInputField}
                                  onChange={handleChanges}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      )}
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
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={handleSubmitForm}
                    disabled={broadcastData?.is_completed}
                  >
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

export default BroadcastModal;
