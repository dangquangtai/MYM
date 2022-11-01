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
import Alert from '../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../hooks/useView';
import usePartner from '../../../hooks/usePartner';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE, CONFIRM_CHANGE } from '../../../store/actions.js';
import { tinyMCESecretKey, view } from '../../../store/constant';
import { userAvatar, initMentorData } from '../../../store/constants/initial';
import { Document, Page,pdfjs } from 'react-pdf';

import useStyles from './../../../utils/classes';
import FirebaseUpload from './../../FloatingMenu/FirebaseUpload/index';
import useConfirmPopup from './../../../hooks/useConfirmPopup';
import useCollaborator from '../../../hooks/useCollaborator';
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ImageOutlined as ImageIcon,
  Today as TodayIcon,
} from '@material-ui/icons';
import { Editor } from '@tinymce/tinymce-react';
import { async } from '@firebase/util';

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


const CollaboratorModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editorRef = React.useRef(null);
  const { form_buttons: formButtons } = useView();
  const {setVerified} = useCollaborator();
  const rejectButton = formButtons.find((button) => button.name === view.collaboration.detail.reject);
  const approveButton = formButtons.find((button) => button.name === view.collaboration.detail.approve);


  const [tabIndex, setTabIndex] = React.useState(0);
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);
  const handleChangeTab = (event, newValue) => {
    console.log('new', newValue)
    setTabIndex(newValue);
  };

  const { createMentor, getCareerAndTopic } = usePartner();
  const { setConfirmPopup } = useConfirmPopup();
 

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

  const [numPages, setNumPages] = useState(null);
  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const { provinces, genders, weekday } = useSelector((state) => state.metadata);
  const [openMentorForm, setOpenMentorForm] = useState(false);
  const handleCloseDialog = () => {
    setMentorData(initMentorData);
    setDocumentToDefault();
    setOpenMentorForm(false);
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: false });
  };
  const [collaborator, setCollaborator] = useState();
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
    setOpenMentorForm(false);
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

      const ret = await createMentor({
        ...mentorData,
        description:
          editorRef.current && editorRef.current.getContent()
            ? editorRef.current.getContent({ format: 'text' })
            : mentorData.description,
      });
      if (ret.return === 200) {
        await setVerified(selectedDocument.id, true);
        handleOpenSnackbar(true, 'success', 'Tạo Mentor thành công!');
      } else {
        handleOpenSnackbar(true, 'error', ret.message);
        return;
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'collaborator' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
 const handleReject = async() =>{
  await setVerified(selectedDocument.id, false);
 }
 const [pageNumber,setNumperPage] = useState(0);
 const onDocumentLoadSuccess =({ numPages })=>{
  setNumPages(numPages);
  setNumperPage(1);
 }





  useEffect(() => {
    if (!selectedDocument) return;
    setCollaborator(selectedDocument);
    setMentorData({
      ...mentorData,
      ...selectedDocument,
      phone_number: selectedDocument?.phone_number || '',
      image_url: selectedDocument?.image_url || userAvatar,
    });
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
              Chi tiết
            </Grid>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                {openMentorForm === true && (
                  <>
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
                       <Tab
                        className={classes.unUpperCase}
                        label={
                          <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                            <AccountCircleOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                            Chi tiết CV
                          </Typography>
                        }
                        value={3}
                        {...a11yProps(3)}
                      />
                    </Tabs>
                   
                  
                  </>
                )}
                {openMentorForm === false && (
                  <>
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
                            Chi tiết đăng ký
                          </Typography>
                        }
                        value={0}
                        {...a11yProps(0)}
                      />
                        </Tabs>
                  </>

                )}



              </Grid>
              {openMentorForm === true && (
                <>
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
                                    rows={1}
                                    rowsMax={2}
                                    variant="outlined"
                                    name="title"
                                    value={mentorData?.title}
                                    className={classes.multilineInputField}
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

                    <TabPanel value={tabIndex} index={3}>
                    <Grid container spacing={1}>
                      <Grid item lg={12} md={12} xs={12}>
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <AccountCircleOutlinedIcon />
                              <span>Thông tin CV</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                           
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid item lg={12} md={12} xs={12}>
                        
                                <object width="100%" height="400" data={mentorData.file_path} type="application/pdf">   </object>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  </Grid>
                </>
              )}
              {openMentorForm === false && (
                <Grid item xs={12}>

                  <TabPanel value={tabIndex} index={0}>
                    <Grid container spacing={1}>
                      <Grid item lg={6} md={6} xs={12}>
                        <div className={classes.tabItem}>
                          <div className={classes.tabItemTitle}>
                            <div className={classes.tabItemLabel}>
                              <AccountCircleOutlinedIcon />
                              <span>Thông tin</span>
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
                                  name="email_address"
                                  disabled={true}
                                  value={mentorData.fullname}
                                  className={classes.inputField}
                                  onChange={handleChangeMentor}
                                />
                              </Grid>
                            </Grid>
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid item lg={4} md={4} xs={4}>
                                <span className={classes.tabItemLabelField}>Email:</span>
                              </Grid>
                              <Grid item lg={8} md={8} xs={8}>
                                <TextField
                                  fullWidth
                                  rows={1}
                                  rowsMax={1}
                                  disabled={true}
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
                                  disabled={true}
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
                                <TextField
                                  fullWidth
                                  rows={1}
                                  disabled={true}
                                  rowsMax={1}
                                  variant="outlined"
                                  name="address"
                                  value={mentorData?.gender}
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
                                <TextField
                                  fullWidth
                                  rows={1}
                                  disabled={true}
                                  rowsMax={1}
                                  variant="outlined"
                                  name="address"
                                  value={mentorData?.province}
                                  className={classes.inputField}
                                  onChange={handleChangeMentor}
                                />
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
                                  disabled={true}
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
                                <span className={classes.tabItemLabelField}>Ngày sinh:</span>
                              </Grid>
                              <Grid item lg={8} md={8} xs={8}>
                                <TextField
                                  fullWidth
                                  rows={1}
                                  disabled={true}
                                  rowsMax={1}
                                  variant="outlined"
                                  name="address"
                                  value={mentorData?.dob}
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
                              <span>Thông tin CV</span>
                            </div>
                          </div>
                          <div className={classes.tabItemBody}>
                           
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid item lg={12} md={12} xs={12}>
                        
                                <object width="100%" height="400" data={mentorData.file_path} type="application/pdf">   </object>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  
                </Grid>
              )}

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

                {openMentorForm === false && (
                  <>
                    {approveButton && (
                      <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={() => setOpenMentorForm(true)}>
                        {approveButton.text}
                      </Button>
                    )}
                    {rejectButton && (
                      <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={handleReject}>
                        {rejectButton.text}
                      </Button>
                    )}
                  </>

                )}
                {openMentorForm === true && (
                   <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={handleSubmitForm}>
                   {'Tạo mới'}
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

export default CollaboratorModal;
