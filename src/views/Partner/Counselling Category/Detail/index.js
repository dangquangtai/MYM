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
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { image_default, view } from '../../../../store/constant';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions';
import Alert from '../../../../component/Alert';
import { initMentorListData, initPartnerData, userAvatar } from '../../../../store/constants/initial';
import {
  QueueMusic,
  History,
  DescriptionOutlined as DescriptionOutlinedIcon,
  RadioOutlined as RadioOutlinedIcon,
  ImageOutlined as ImageIcon,
  QuestionAnswer
} from '@material-ui/icons';
import useStyles from './../../../../utils/classes';
import usePartner from './../../../../hooks/usePartner';
import useMedia from './../../../../hooks/useMedia';
import useCounsellingCategory from './../../../../hooks/useCounsellingCategory';
import { Autocomplete } from '@material-ui/lab';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';

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

const CounsellingCategoryModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { counsellingCategoryDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.counsellingCategory.detail.save);
  const { getMenuItemList, updateCounsellingCategory, createCounsellingCategory } = useCounsellingCategory();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);
  const [defaultText, setDefaultText] = useState({});
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [counsellingCategoryData, setcounsellingCategoryData] = useState({
    image_url: image_default,
  });
  const [menuItems, setMenuItems] = useState([]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, counsellingCategoryDocument: false });
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
    setcounsellingCategoryData({ ...counsellingCategoryData, image_url: image });
  };

  const setDocumentToDefault = async () => {
    setcounsellingCategoryData({ image_url: image_default });
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
    setcounsellingCategoryData({ ...counsellingCategoryData, [name]: value });
  };
  const handleChangesDefaultText = (e) => {
    const { name, value } = e.target;
    setDefaultText({ ...defaultText, [name]: value });
  };

  //   const handleChangeMentor = (e, value) => {
  //     setSelectedMentor(value);
  //     setcounsellingCategoryData({ ...counsellingCategoryData, mentor_id_list: value.map((item) => item.id) });
  //   };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateCounsellingCategory({...counsellingCategoryData, default_text: defaultText});
        handleOpenSnackbar(true, 'success', 'Cập nhật dịch vụ thành công!');
      } else {
        await createCounsellingCategory(counsellingCategoryData);
        handleOpenSnackbar(true, 'success', 'Tạo mới dịch vụ thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'counsellingCategory' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setcounsellingCategoryData({
      ...counsellingCategoryData,
      ...selectedDocument,
    });
    setDefaultText({ ...selectedDocument.default_text });
  }, [selectedDocument]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMenuItemList();
      setMenuItems(data);
    };
    fetch();
  }, []);

  return (
    <React.Fragment>
      {snackbarStatus.isOpen && (
        <>
          <span>xzcxzc</span>
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
        </>
      )}
      <FirebaseUpload
        open={openDialogUploadImage || false}
        onSuccess={setURL}
        onClose={handleCloseDiaLog}
        type="image"
        folder="CounsellingCategory"
      />
      <Grid container>
        <Dialog
          open={openDialog || false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          className={classes.partnerdialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            <Grid item xs={12} style={{ textTransform: 'uppercase' }}>
              Dịch Vụ
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
                        <QuestionAnswer className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
                        Câu hỏi
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
                      <div className={classes.tabItem} style={{ maxHeight: 150 }}>
                        <div className={classes.tabItemTitle} style={{ padding: '5px' }}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={counsellingCategoryData.image_url} alt="image_url" style={{ height: 80 }} />
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
                            <span>Chi tiết dịch vụ</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên dịch vụ(*):</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="category_name"
                                value={counsellingCategoryData.category_name}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nhãn dịch vụ:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="category_label"
                                value={counsellingCategoryData.category_label}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mã dịch vụ(*):</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="category_code"
                                value={counsellingCategoryData.category_code}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Số thứ tự(*):</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="order_number"
                                value={counsellingCategoryData.order_number}
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
                                variant="outlined"
                                name="content"
                                value={counsellingCategoryData.content}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mô tả:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                name="description"
                                value={counsellingCategoryData.description}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách mentor:</span>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                              <TextField
                                fullWidth
                                name="description"
                                value={counsellingCategoryData.mentorlist_title}
                                className={classes.inputField}
                                disabled
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Link
                                to={'/dashboard/app?type=mentor&id=' + counsellingCategoryData.mentorlist_id}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                style={{ color: 'white', textDecoration: 'none', marginLeft: 10 }}
                              >
                                <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }}>
                                  Cập nhật
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách bài viết:</span>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                              <TextField
                                fullWidth
                                name="description"
                                value={counsellingCategoryData.newslist_title}
                                className={classes.inputField}
                                disabled
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Link
                                to={'/dashboard/app?type=news&id=' + counsellingCategoryData.newslist_id}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                style={{ color: 'white', textDecoration: 'none', marginLeft: 10 }}
                              >
                                <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }}>
                                  Cập nhật
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách ngành nghề:</span>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                              <TextField
                                fullWidth
                                name="description"
                                value={counsellingCategoryData.careerlist_title}
                                className={classes.inputField}
                                disabled
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Link
                                to={'/dashboard/app?type=career&id=' + counsellingCategoryData.careerlist_id}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                style={{ color: 'white', textDecoration: 'none', marginLeft: 10 }}
                              >
                                <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }}>
                                  Cập nhật
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách Podcast:</span>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                              <TextField
                                fullWidth
                                name="description"
                                value={counsellingCategoryData.podcastlist_title}
                                className={classes.inputField}
                                disabled
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Link
                                to={'/dashboard/app?type=podcast&id=' + counsellingCategoryData.podcastlist_id}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                style={{ color: 'white', textDecoration: 'none', marginLeft: 10 }}
                              >
                                <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }}>
                                  Cập nhật
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>

                          {/* <Grid container className={classes.gridItem} alignItems="center">
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
                                value={counsellingCategoryData.title}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid> */}
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Menu Item:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="category_id"
                                className={classes.multpleSelectField}
                                value={counsellingCategoryData.menu_item_id || ''}
                                onChange={handleChanges}
                              >
                                {menuItems?.map((item) => (
                                  <MenuItem key={item.Key} value={item.Key}>
                                    {item.Value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ẩn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={counsellingCategoryData.is_hidden}
                                onChange={() =>
                                  setcounsellingCategoryData({
                                    ...counsellingCategoryData,
                                    is_hidden: !counsellingCategoryData.is_hidden,
                                  })
                                }
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
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
                    <Grid item lg={12} md={12} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <QuestionAnswer/>
                            <span>Câu hỏi</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                            {!!defaultText.default_text1_name &&(
                                <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>{defaultText.default_text1_name +':'}</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                variant="outlined"
                                name="default_text1"
                                multiline
                                rows={4}
                                fullWidth
                                value={defaultText.default_text1}
                                className={classes.inputField}
                                onChange={handleChangesDefaultText}
                              />
                            </Grid>
                          </Grid>
                            )}
                          {!!defaultText.default_text2_name &&(
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>{defaultText.default_text2_name +':'}</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                name="default_text2"
                                value={defaultText.default_text2}
                                className={classes.inputField}
                                onChange={handleChangesDefaultText}
                              />
                            </Grid>
                          </Grid>
                           )}
                            {!!defaultText.default_text3_name &&(
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>{defaultText.default_text3_name +':'}</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                name="default_text3"
                                value={defaultText.default_text3}
                                className={classes.inputField}
                                onChange={handleChangesDefaultText}
                              />
                            </Grid>
                          </Grid>
                                )}
                           {!!defaultText.default_text4_name &&(
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>{defaultText.default_text4_name +':'}</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                 multiline
                                 rows={4}
                                 fullWidth
                                variant="outlined"
                                name="default_text4"
                                value={defaultText.default_text4}
                                className={classes.inputField}
                                onChange={handleChangesDefaultText}
                              />
                            </Grid>
                          </Grid>
                                )}
                        </div>
                      </div>
                    </Grid>
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

export default CounsellingCategoryModal;
