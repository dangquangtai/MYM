import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Box,
  Typography,
  Tab,
  TextField,
  Snackbar,
  Switch,
  MenuItem,
  Select
} from '@material-ui/core';
import {
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Alert from '../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { image_default, tinyMCESecretKey, view } from '../../../store/constant.js';
import useView from '../../../hooks/useView';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions.js';
import FirebaseUpload from '../../FloatingMenu/FirebaseUpload/index.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../services/firebase';
import useCareer from '../../../hooks/useCareer.js';
import useUniversity from '../../../hooks/useUniversity.js';
import { Editor } from '@tinymce/tinymce-react';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import usePartner from '../../../hooks/usePartner.js';
import useMedia from '../../../hooks/useMedia.js';
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

const CareerModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.career.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const editorRef = React.useRef(null);
  const {getPodcastlist} = useMedia();
  const {getMentorListMeta} = usePartner();
  const [podcastList, setPodcast] = useState([]);
  const [mentorList, setMentorList] = useState([]);
  const {createCareer,updateCareer,getCareerCategoryList} = useCareer();
  const {getUniversityList, getNewsList} = useUniversity();
  const [univeristyList,setUniversityList] = useState([]);
  const [newsList, setNewList] = useState([]);
  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: ''
  });

  const [Career, setCareer] = useState({
    image_url: image_default,
    career_title: '',
    is_featured: true,
    is_active: true,
    career_description: '',
    order_number:0,
    news_list_id:'',
    university_list_id:'',
    category_id: '',
    podcast_list_id: '',
    mentor_list_id: '',
    is_button_on: true,
  });
  const [CareerCategory, setCareerCategory] = useState([]);
  useEffect(() => {
    if (!selectedDocument) return;
    setCareer({
     ...Career,
     ...selectedDocument,
     career_description: selectedDocument?.career_description?.replaceAll('\n\n', '<br><br>')
    });
  }, [selectedDocument]);

  useEffect(() => {
  const fetch = async () =>{
    let data = await getUniversityList();
    setUniversityList(data);
    data = await getNewsList();
    setNewList(data);
    data= await getCareerCategoryList();
    setCareerCategory(data)
    data = await getMentorListMeta();
    setMentorList(data)
    data = await getPodcastlist();
    setPodcast(data)
  }
  fetch()
  }, []);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    setCareer({
      image_url: image_default,
      career_title: '',
      is_featured: true,
      is_active: true,
      career_description: '',
      order_number:0,
      news_list_id:'',
      university_list_id:'',
      category_id: '',
      podcast_list_id: '',
      mentor_list_id: '',
      is_button_on:true,
    });
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: false });
    
  };
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const handleOpenSnackbar = (isOpen, type, text) => {
    setSnackbarStatus({
      isOpen: isOpen,
      type: type,
      text: text,
    });
  };
  const handleUpdateCareer = async () => {
    try {
      let content =
      editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent({ format: 'text' }) : Career.career_description;
      if (!Career.id) {
        let check =await createCareer({...Career, career_description: content});
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'career' });
          handleCloseDialog();
        } else {
          handleOpenSnackbar(true, 'error', 'Tạo mới lỗi!');
        }
      } else {
        let check =await updateCareer({...Career, career_description: content});
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Cập nhập thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'career' });
          handleCloseDialog();
        }
        else {
          handleOpenSnackbar(true, 'error', 'Cập nhật lỗi!');
        }
      }
    } catch (error) {
   
    } finally {
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCareer({
      ...Career,
      [e.target.name]: value,
    });
  };
  
  const setDocumentToDefault = async () => {
    setTabIndex(0);
  };
  const setURL = (image) => {
    setCareer({
      ...Career,
      image_url: image,
    });
  };

  const handleOpenDiaLog = () => {
    setDialogUpload({open: true , type: 'image'})
  };
  const handleCloseDiaLog = () => {
    setDialogUpload({open: false , type: 'image'})
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
        folder="AvatarCareer"
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
              Thông tin ngành
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
                        Thông tin
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                          <DescriptionOutlinedIcon className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
                        Chi tiết
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
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`} >
                          <img src={Career.image_url} alt="" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình </Button>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item  lg={6} md={6} xs={6} >
                    <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Thông tin </span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên ngành: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="career_title"
                                value={Career.career_title || ''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Order number:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type='number'
                                
                                variant="outlined"
                                name="order_number"
                                value={Career.order_number}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh mục:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.category_id || ''}
                                onChange={(event) => setCareer({ ...Career, category_id: event.target.value })}
                              >
                                {CareerCategory &&
                                  CareerCategory.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>  
                         
                        
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Hoạt động: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                              checked={Career.is_active}
                              onChange={()=> setCareer({...Career,is_active: !Career.is_active})}
                              inputProps={{ 'aria-label': 'controlled' }} />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Nổi bật: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                            <Switch
                                checked={Career.is_featured}
                                onChange={()=> setCareer({...Career,is_featured: !Career.is_featured})}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item lg={3} md={3} xs={3}>
                              <span className={classes.tabItemLabelField}>Nút đăng ký: </span>
                            </Grid>
                            <Grid item lg={1} md={1} xs={1}>
                            <Switch
                                checked={Career.is_button_on}
                                onChange={()=> setCareer({...Career,is_button_on: !Career.is_button_on})}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                         
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Danh sách trường:</span>
                            </Grid>
                            <Grid item lg={7} md={7} xs={7}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.university_list_id || ''}
                                onChange={(event) => setCareer({ ...Career, university_list_id: event.target.value })}
                              >
                                 <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {univeristyList &&
                                  univeristyList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.title}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                            <Grid item lg={3} md={3} xs={12}>
                            <Link
                                    to={'/dashboard/app?type=university&id='+(Career.university_list_id===''|| !Career.university_list_id?'create':Career.university_list_id)}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="contained"
                                    style={{ color:'white',textDecoration:'none',marginLeft: 20 }}
                                    >
                                    <Button  variant="contained"
                                         style={{ background: 'rgb(97, 42, 255)' }}
                                      >{Career.university_list_id===''|| !Career.university_list_id?'Tạo mới': 'Cập nhật'}</Button>
                                  </Link>
                            </Grid>
                          </Grid>  
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh sách blogs:</span>
                            </Grid>
                            <Grid item lg={7} md={7} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.news_list_id || ''}
                                onChange={(event) => setCareer({ ...Career, news_list_id: event.target.value })}
                              >
                                 <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {newsList &&
                                  newsList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                            <Grid item lg={3} md={3} xs={12}>
                            <Link
                                    to={'/dashboard/app?type=news&id='+(Career.news_list_id===''||!Career.news_list_id?'create':Career.news_list_id)}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="contained"
                                    style={{ color:'white',textDecoration:'none',marginLeft: 20 }}
                                    >
                                    <Button  variant="contained"
                                         style={{ background: 'rgb(97, 42, 255)' }}
                                      >{Career.news_list_id===''||!Career.news_list_id?'Tạo mới':'Cập nhật'}</Button>
                                  </Link>
                            </Grid>
                          </Grid>    
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh sách Podcast:</span>
                            </Grid>
                            <Grid item lg={7} md={7} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.podcast_list_id || ''}
                                onChange={(event) => setCareer({ ...Career, podcast_list_id: event.target.value })}
                              >
                                 <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {podcastList &&
                                  podcastList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                            <Grid item lg={3} md={3} xs={12}>
                            <Link
                                    to={'/dashboard/app?type=podcast&id='+(Career.podcast_list_id===''||!Career.podcast_list_id?'create':Career.podcast_list_id)}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="contained"
                                    style={{ color:'white',textDecoration:'none',marginLeft: 20 }}
                                    >
                                    <Button  variant="contained"
                                         style={{ background: 'rgb(97, 42, 255)' }}
                                      >{Career.podcast_list_id===''||!Career.podcast_list_id?'Tạo mới':'Cập nhật'}</Button>
                                  </Link>
                            </Grid>
                          </Grid>    
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh sách mentor:</span>
                            </Grid>
                            <Grid item lg={7} md={7} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.mentor_list_id || ''}
                                onChange={(event) => setCareer({ ...Career, mentor_list_id: event.target.value })}
                              >
                                 <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {mentorList&&
                                  mentorList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                            <Grid item lg={3} md={3} xs={12}>
                            <Link
                                    to={'/dashboard/app?type=mentor&id='+(Career.mentor_list_id===''|| !Career.mentor_list_id?'create':Career.mentor_list_id)}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="contained"
                                    style={{ color:'white',textDecoration:'none',marginLeft: 20 }}
                                    >
                                    <Button  variant="contained"
                                         style={{ background: 'rgb(97, 42, 255)' }}
                                      >{Career.mentor_list_id===''|| !Career.mentor_list_id?'Tạo mới': 'Cập nhật'}</Button>
                                  </Link>
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
                  <Editor
                                apiKey={tinyMCESecretKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={Career.career_description}
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
              {!Career.id && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateCareer()}
                  >
                    {'Tạo mới'}
                  </Button>
                </Grid>
              )}
              { buttonSave && selectedDocument&& (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateCareer()}
                  >
                    {buttonSave.text}
                  </Button>
                </Grid>
              )}
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default CareerModal;
