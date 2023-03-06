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
  Checkbox,
  ListItemText,
  Paper,
  ListItem,
  ListItemIcon,
  List,
  FormControl,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AttachFileOutlined,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  PostAddOutlined,
  InfoOutlined,
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
import Chip from './../../../../component/Chip/index';

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
  const { createNews, updateNews, getNewsCategory, searchPublishedNews } = useSite();
  const editorRef = React.useRef(null);

  const [newsData, setNews] = useState({
    is_active: true,
    is_featured: false,
    source_name: '',
    source_url: '',
    related_news_id_list: [],
  });
  const [landingPage, setLandingPage] = useState([]);

  const [relatedNews, setRelatedNews] = useState([]);
  const [publishedNews, setPublishedNews] = React.useState([]);
  const [featuredNews, setFeaturedNews] = React.useState([]);
  const [checkedNews, setCheckedNews] = React.useState([]);

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
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, newsDocument: false });
  };

  const handleChangeTab = (news, newValue) => {
    setTabIndex(newValue);
    let tmpContent =
      editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent() : newsData?.content;
    setNews({ ...newsData, content: tmpContent });
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
    setNews({ is_active: true, is_featured: false });
    setFeaturedNews([]);
    setPublishedNews([]);
    setCheckedNews([]);
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
      const data = {
        ...newsData,
        content:
          editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent() : newsData?.content,
        related_news_id_list: featuredNews ? featuredNews.map((news) => news.id) : [],
      };
      if (selectedDocument?.id) {
        await updateNews(data);
        handleOpenSnackbar(true, 'success', 'Cập nhật thành công!');
      } else {
        await createNews(data);
        handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'news' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const _searchPublishedNews = async (event) => {
    if (event.key !== 'Enter') return;
    if (!newsData.landing_page_id) return;
    const publishedNew = await searchPublishedNews(newsData?.id || '', newsData.landing_page_id, event.target.value);
    // get news not in featuredNews
    const notInFeaturedNews = publishedNew.filter((news) => !featuredNews.find((fnews) => fnews.id === news.id));
    setPublishedNews(notInFeaturedNews);
  };

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter(({ id }) => b.find((news) => news.id === id) !== undefined);
  }

  const handleToggle = (news) => () => {
    const currentIndex = checkedNews.findIndex((checkedNews) => checkedNews.id === news.id);
    const newChecked = [...checkedNews];

    if (currentIndex === -1) {
      newChecked.push(news);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedNews(newChecked);
  };

  const SelectedNewList = (news) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list" className={classes.listSelectedNews}>
        {news?.map((news) => {
          const labelId = `transfer-list-item-${news.id}-label`;
          return (
            <ListItem key={news.id} role="listitem" button onClick={handleToggle(news)}>
              <ListItemIcon>
                <Checkbox
                  checked={checkedNews.findIndex((checkNews) => checkNews.id === news.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${news.title}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const leftChecked = intersection(checkedNews, publishedNews);
  const rightChecked = intersection(checkedNews, featuredNews);

  const handleCheckedRight = () => {
    setFeaturedNews(featuredNews.concat(leftChecked));
    setPublishedNews(not(publishedNews, leftChecked));
    setCheckedNews(not(checkedNews, leftChecked));
  };

  const handleCheckedLeft = () => {
    setPublishedNews(publishedNews.concat(rightChecked));
    setFeaturedNews(not(featuredNews, rightChecked));
    setCheckedNews(not(checkedNews, rightChecked));
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setNews({
      ...newsData,
      ...selectedDocument,
    });
    setFeaturedNews(selectedDocument?.related_news_list);
    console.log(selectedDocument?.related_news_list);
  }, [selectedDocument]);

  useEffect(() => {
    const getCategories = async () => {
      const { newsCategory, landingPage } = await getNewsCategory();
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
                        <InfoOutlined />
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
                        <DescriptionOutlinedIcon />
                        Nội dung
                      </Typography>
                    }
                    value={1}
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <PostAddOutlined />
                        Tin liên quan
                      </Typography>
                    }
                    value={2}
                    {...a11yProps(2)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <AttachFileOutlined />
                        File đính kèm
                      </Typography>
                    }
                    value={3}
                    {...a11yProps(3)}
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
                                rows={6}
                                maxRows={10}
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
                      {/* <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Tin liên quan</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={12} md={12} xs={12}>
                              <TextField
                                fullWidth
                                select
                                multiple
                                size="small"
                                variant="outlined"
                                name="related_news_id_list"
                                value={newsData.related_news_id_list || []}
                                onChange={handleChanges}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                  </div>
                                )}
                              >
                                {relatedNews?.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    <Checkbox checked={newsData?.related_news_id_list.indexOf(option.id) > -1} />
                                    <ListItemText primary={option.title} />
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </div>
                      </div> */}
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
                <TabPanel value={tabIndex} index={2}>
                  <Grid container spacing={1}>
                    <Grid item lg={12} md={12} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Tin liên quan</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item lg={8} xs={12}>
                              <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                  // disabled={shouldDisabledView}
                                  label="Tìm kiếm tin liên quan"
                                  variant="outlined"
                                  onKeyDown={_searchPublishedNews}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                              <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                                <Grid item lg={5}>
                                  {SelectedNewList(publishedNews)}
                                </Grid>
                                <Grid item>
                                  <Grid container direction="column" alignItems="center">
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      className={classes.button}
                                      onClick={handleCheckedRight}
                                      disabled={leftChecked.length === 0}
                                      aria-label="move selected right"
                                    >
                                      &gt;
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      className={classes.button}
                                      onClick={handleCheckedLeft}
                                      disabled={rightChecked.length === 0}
                                      aria-label="move selected left"
                                    >
                                      &lt;
                                    </Button>
                                  </Grid>
                                </Grid>
                                <Grid item lg={5}>
                                  {SelectedNewList(featuredNews)}
                                </Grid>
                              </Grid>
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
                            <span>File đính kèm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}></Grid>
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
