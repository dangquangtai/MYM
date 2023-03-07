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
import useSite from '../../../../hooks/useSite';
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

const NewsListModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { newsListDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.newsList.detail.save);
  const { createNewsList, updateNewsList, getAllNews } = useSite();
  const [tabIndex, setTabIndex] = React.useState(0);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [newsListData, setnewsListData] = useState({
    is_active: true,
    is_hidden: false,
    order_number: 0,
    description: '',
  });
  const [news, setNews] = useState([]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, newsListDocument: false });
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
    setnewsListData({
      is_active: true,
      is_hidden: false,
      order_number: 0,
      description: '',
    });
    setTabIndex(0);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setnewsListData({ ...newsListData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateNewsList(newsListData);
        handleOpenSnackbar(true, 'success', 'Cập nhật NewsList thành công!');
      } else {
        await createNewsList(newsListData);
        handleOpenSnackbar(true, 'success', 'Tạo mới NewsList thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'newsList' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleChangeNews = (e) => {
    const {
      target: { value },
    } = e;
    setnewsListData({ ...newsListData, news_id_list: value });
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setnewsListData({
      ...newsListData,
      ...selectedDocument,
    });
  }, [selectedDocument]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllNews();
      setNews(res);
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
              NewsList
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
                            {/* <QueueMusic /> */}
                            <span>Chi tiết NewsList</span>
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
                                value={newsListData.title || ''}
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
                                value={newsListData.description || ''}
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
                                value={newsListData.order_number || ''}
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
                                checked={newsListData.is_active || false}
                                onChange={(e) => setnewsListData({ ...newsListData, is_active: e.target.checked })}
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
                                checked={newsListData.is_hidden || false}
                                onChange={(e) => setnewsListData({ ...newsListData, is_hidden: e.target.checked })}
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
                            {/* <RadioOutlinedIcon /> */}
                            <span>Danh sách News</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>News:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                multiple
                                className={classes.multpleSelectField}
                                value={newsListData?.news_id_list || []}
                                onChange={handleChangeNews}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={news?.find((i) => i.id === value)?.title}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {news?.map((item) => (
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

export default NewsListModal;
