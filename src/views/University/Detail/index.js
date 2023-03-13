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
  Select,
  MenuItem,
  TextField,
  Snackbar,
} from '@material-ui/core';
import {
  History as HistoryIcon,
  
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import {Checkbox} from '@material-ui/core';
import Alert from '../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../services/firebase';
import { gridSpacing,tinyMCESecretKey, view } from '../../../store/constant.js';
import useView from '../../../hooks/useView';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions.js';
import FirebaseUpload from '../../FloatingMenu/FirebaseUpload/index.js';
import MultipleFirebaseUpload from '../../FloatingMenu/FirebaseUpload/multiple.js';
import useCareer from '../../../hooks/useCareer.js';
import useUniversity from '../../../hooks/useUniversity.js';
import { Editor } from '@tinymce/tinymce-react';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
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

const UniveristyModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons, name, tabs, disabled_fields } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.user.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const {getCareerListPage} = useCareer();
  const editorRef = React.useRef(null);
  const {getUniversityType,updateUniversity ,createUniversity,getNewsList } = useUniversity();
  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: ''
  });
  const [type_list,setType] = useState([])
  const [category_list, setCategory] = useState([])
  const [careerList , setCareerList] = useState([])
  const [university, setuniversity] = useState({
   university_name:'',
   university_code:'',
   is_active: true,
   is_hidden: false,
   description:'',
   image_url:'',
   university_category_id: '',
   university_type_id: '',
   career_list_id:'',
   news_list_id:'',
   image_url_list:[]
  });

  useEffect(() => {

    if (!selectedDocument) return;
    setuniversity({
      ...university,
      ...selectedDocument,
    });
  }, [selectedDocument]);
  const [newsList, setNewList] = useState([]);
  useEffect(() => {
    const fetch = async() =>{
      const data = await getUniversityType();
      setType(data.typle_list)
      setCategory(data.category_list)
      let data2 = await getCareerListPage();
      setCareerList(data2)
      data2 = await getNewsList();
      setNewList(data2)
    }
    fetch()
   
  }, []);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    setuniversity({
      university_name:'',
      university_code:'',
      is_active: true,
      is_hidden: false,
      description:'',
      image_url:'',
      university_category_id: '',
      unibersity_type_id: '',
      career_list_id:'',
      news_list_id:'',
      image_url_list:[]
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
  const handleUpdateuniversity = async () => {
    try {
      let description =editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent({ format: 'text' }) : university.description;
      if (!university.id) {
        let check = await createUniversity({...university, description:description });
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'university' });
          handleCloseDialog();
        } else {
          handleOpenSnackbar(true, 'error', 'Tạo mới lỗi!');
        }
      } else {
        let check = await updateUniversity({...university, description: description});
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Cập nhập thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'university' });
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
    setuniversity({
      ...university,
      [e.target.name]: value,
    });
  };
  
  const setDocumentToDefault = async () => {
    setTabIndex(0);
  };
  const setURL = (image) => {
    setuniversity({
      ...university,
      image_url: image,
    });
  };
  const setURLList = (image) => {
    setuniversity({
      ...university,
      image_url_list: image,
    });
  };

  const handleOpenDiaLog = () => {
    setDialogUpload({open: true , type: 'image'})
  };
  const handleCloseDiaLog = () => {
    setDialogUpload({open: false ,openmultiple:false, type: 'image'})
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
        folder="Avataruniversity"
        type="image"
      />
      <MultipleFirebaseUpload
       open={dialogUpload.openmultiple || false}
       onSuccess={setURLList}
       onClose={handleCloseDiaLog}
       folder="Avataruniversity"
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
              Thông tin trường
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
                          <img src={university.image_url} alt="" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình </Button>
                          </div>
                        </div>
                    
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Danh sách hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`} >
                          {university?.image_url_list.map((image_url)=>(
                              <img src={image_url} alt="" />
                          ))}
                        
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => setDialogUpload({openmultiple: true , type: 'image'})}>Chọn hình </Button>
                          </div>
                        </div>
                    
                      </div>
                    </Grid>
                    <Grid item  lg={6} md={6} xs={6} >
                    <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <universityCircleOutlinedIcon />
                            <span>Thông tin trường</span>
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Mã trường: </span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={10}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="university_code"
                                value={university.university_code || ''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Tên trường:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={10}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="university_name"
                                value={university.university_name}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Hoạt động: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Checkbox 
                              checked={university.is_active}
                              onChange={()=> setuniversity({...university,is_active: !university.is_active})}
                              inputProps={{ 'aria-label': 'controlled' }} />
                            </Grid>
                           
                          </Grid>
                          

                         
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh mục:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={university.university_type_id || ''}
                                onChange={(event) => setuniversity({ ...university, university_type_id: event.target.value })}
                              >
                                <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {type_list &&
                                  type_list.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Loại:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={university.university_category_id || ''}
                                onChange={(event) => setuniversity({ ...university, university_category_id: event.target.value })}
                              >
                                {category_list &&
                                  category_list.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>    
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh sách ngành:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={university.career_list_id || ''}
                                onChange={(event) => setuniversity({ ...university, career_list_id: event.target.value })}
                              >
                                {careerList &&
                                  careerList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.list_title}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>    
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh sách blogs:</span>
                            </Grid>
                            <Grid item lg={10} md={10} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={university.news_list_id || ''}
                                onChange={(event) => setuniversity({ ...university, news_list_id: event.target.value })}
                              >
                                {newsList &&
                                  newsList.map((item) => (
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
                <TabPanel value={tabIndex} index={1}>
                  <Grid container spacing={1}>
                  <Grid item lg={12} md={12} xs={12}>
                  <div className={classes.tabItem}>
                  <Editor
                                apiKey={tinyMCESecretKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={university.description}
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
              {!university.id && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateuniversity()}
                  >
                    {'Tạo mới'}
                  </Button>
                </Grid>
              )}
              { university.id && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateuniversity()}
                  >
                    Lưu
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

export default UniveristyModal;
