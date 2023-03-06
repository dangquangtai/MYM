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
import useBanner from '../../../../hooks/useBanner';
import {
  QueueMusic,
  History,
  DescriptionOutlined as DescriptionOutlinedIcon,
  RadioOutlined as RadioOutlinedIcon,
} from '@material-ui/icons';
import useStyles from './../../../../utils/classes';

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

const BannerListModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { bannerListDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.bannerList.detail.save);
  const { createBannerList, updateBannerList, getAllBanner } = useBanner();
  const [tabIndex, setTabIndex] = React.useState(0);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [bannerListData, setbannerListData] = useState({});
  const [banners, setBanners] = useState([]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, bannerListDocument: false });
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
    setbannerListData({});
    setTabIndex(0);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setbannerListData({ ...bannerListData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateBannerList(bannerListData);
        handleOpenSnackbar(true, 'success', 'Cập nhật BannerList thành công!');
      } else {
        await createBannerList(bannerListData);
        handleOpenSnackbar(true, 'success', 'Tạo mới BannerList thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'bannerList' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleChangeBanner = (e) => {
    const {
      target: { value },
    } = e;
    setbannerListData({ ...bannerListData, banner_id_list: value });
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setbannerListData({
      ...bannerListData,
      ...selectedDocument,
    });
  }, [selectedDocument]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBanner();
      setBanners(res);
    };
    fetchData();
  }, []);

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
              BannerList
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
                            <QueueMusic />
                            <span>Chi tiết BannerList</span>
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
                                value={bannerListData.title || ''}
                                size="small"
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mô tả:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                variant="outlined"
                                name="description"
                                value={bannerListData.description || ''}
                                size="small"
                                onChange={handleChanges}
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
                                variant="outlined"
                                type="number"
                                name="order_number"
                                value={bannerListData.order_number || ''}
                                size="small"
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
                                checked={bannerListData.is_active || false}
                                onChange={(e) => setbannerListData({ ...bannerListData, is_active: e.target.checked })}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ẩn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={bannerListData.is_hidden || false}
                                onChange={(e) => setbannerListData({ ...bannerListData, is_hidden: e.target.checked })}
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
                            <span>Danh sách Banner</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Banner:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                multiple
                                className={classes.multpleSelectField}
                                value={bannerListData?.banner_id_list || []}
                                onChange={handleChangeBanner}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={banners?.find((i) => i.id === value)?.title}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {banners?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.title}
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

export default BannerListModal;
