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
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
} from '@material-ui/icons';
import { Editor } from '@tinymce/tinymce-react';
import { storage } from '../../../../services/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import useStyles from './../../../../utils/classes';
import useView from './../../../../hooks/useView';
import useSite from './../../../../hooks/useSite';
import { view } from '../../../../store/constant.js';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../../store/actions.js';
import Alert from './../../../../component/Alert/index';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import { tinyMCESecretKey } from './../../../../store/constant';

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

const NewsModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form_buttons: formButtons } = useView();
  const { newsDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const [categories, setCategories] = useState([]);
  const { createNews, updateNews, getNewsCategory } = useSite();
  const editorRef = React.useRef(null);

  const [newsData, setNews] = useState({});
  const [landingPage, setLandingPage] = useState([]);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const buttoncreateNews = formButtons.find((button) => button.name === view.news.detail.save);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: '',
  });
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleCloseDialog = () => {
    setNews({});
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, newsDocument: false });
  };

  const handleChangeTab = (news, newValue) => {
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
    setTabIndex(0);
    if (editorRef.current) editorRef.current.setContent('');
  };
  const setURL = (image) => {
    if (dialogUpload.type === 'image') {
      setNews({ ...newsData, image_url: image });
    } else {
      setNews({ ...newsData, map_image_url: image });
    }
  };

  const handleOpenDiaLog = (type) => {
    setDialogUpload({
      open: true,
      type: type,
    });
  };

  const handleCloseUploadDiaLog = () => {
    setDialogUpload({
      open: false,
      type: '',
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setNews({ ...newsData, [name]: value });
  };
  const handleSubmitForm = async () => {
    try {
      let content =
        editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent() : newsData.content;
      if (selectedDocument?.id) {
        await updateNews({
          ...newsData,
          content: content,
        });
        handleOpenSnackbar(true, 'success', 'Cập nhật thành công!');
      } else {
        console.log(editorRef.current.getContent());
        await createNews({
          ...newsData,
          content: content,
        });
        handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'news' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setNews({
      ...newsData,
      ...selectedDocument,
    });
  }, [selectedDocument]);

  useEffect(() => {
    const getCategories = async () => {
      const { newsCategory, landingPage } = await getNewsCategory();
      console.log(newsCategory, landingPage);
      setCategories(newsCategory);
      setLandingPage(landingPage);
    };
    getCategories();
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
      <FirebaseUpload
        open={dialogUpload.open || false}
        onSuccess={setURL}
        onClose={handleCloseUploadDiaLog}
        folder="News"
        type="image"
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
                        Chi tiết
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <DescriptionOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Nội dung
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
                    <Grid item lg={6} md={6} xs={6}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={newsData.image_url} alt="" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình </Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Thông tin</span>
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
                                autoFocus
                                name="title"
                                size="small"
                                type="text"
                                variant="outlined"
                                onChange={handleChanges}
                                value={newsData.title || ''}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh mục:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                name="category_id"
                                variant="outlined"
                                value={newsData.category_id || ''}
                                onChange={handleChanges}
                              >
                                {categories?.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mô tả:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                maxRows={8}
                                name="description"
                                size="small"
                                type="text"
                                variant="outlined"
                                onChange={handleChanges}
                                value={newsData.description || ''}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Thông tin thêm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Landing Page:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                name="landing_page_id"
                                value={newsData.landing_page_id || ''}
                                onChange={handleChanges}
                              >
                                {landingPage?.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nguồn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                name="source_name"
                                size="small"
                                type="text"
                                variant="outlined"
                                onChange={handleChanges}
                                value={newsData.source_name || ''}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>URL nguồn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                name="source_url"
                                size="small"
                                type="text"
                                variant="outlined"
                                onChange={handleChanges}
                                value={newsData.source_url || ''}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                onChange={(e) => setNews({ ...newsData, is_active: e.target.checked })}
                                checked={newsData.is_active || false}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nổi bật:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={newsData.is_featured || false}
                                onChange={(e) => setNews({ ...newsData, is_featured: e.target.checked })}
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
                            <span>Nội dung</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Editor
                                apiKey={tinyMCESecretKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={newsData.content}
                                init={{
                                  height: 500,
                                  menubar: false,
                                  plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                  ],
                                  toolbar:
                                    'undo redo | formatselect | ' +
                                    'image |' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | fullscreen preview | help',
                                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                  file_picker_types: 'image',
                                  image_title: false,
                                  image_description: false,
                                  automatic_uploads: true,
                                  images_upload_handler: async function (blobInfo, success, failure) {
                                    const newName = `${blobInfo.filename()}-${new Date().getTime()}`;
                                    const file = new File([blobInfo.blob()], newName, { type: blobInfo.blob().type });
                                    const storageRef = ref(storage, `News/Upload/${file.name}`);
                                    const uploadTask = uploadBytesResumable(storageRef, file);
                                    uploadTask.on(
                                      'state_changed',
                                      (snapshot) => {
                                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        console.log('Upload is ' + progress + '% done');
                                      },
                                      (error) => {
                                        console.log(error);
                                        failure('');
                                      },
                                      () => {
                                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                          success(downloadURL);
                                        });
                                      }
                                    );
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
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
                {buttoncreateNews && selectedDocument?.id && (
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleSubmitForm()}
                  >
                    {buttoncreateNews.text}
                  </Button>
                )}
                {!selectedDocument?.id && (
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleSubmitForm()}
                  >
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

export default NewsModal;
