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
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';
import {
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Alert from '../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { tinyMCESecretKey, view } from '../../../store/constant.js';
import useView from '../../../hooks/useView';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions.js';
import FirebaseUpload from '../../FloatingMenu/FirebaseUpload/index.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../services/firebase';
import useCareer from '../../../hooks/useCareer.js';
import { Editor } from '@tinymce/tinymce-react';
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

const CareerListModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.careerlist.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const editorRef = React.useRef(null);
  const {getCounselingCategories} = useMedia()
  const {createCareer,updateCareer,getCareerList,createCareerList,
    updateCareerList, getINCareerList} = useCareer();
  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: ''
  });
  const [activeCareerList, setCareerList] = useState([]);
  const [counselingCategoryList , setCounselling] = useState([]);
  const [Career, setCareer] = useState({
    image_url: '',
    list_title: '',
    is_hidden: true,
    is_active: true,
    list_description: '',
    order_number:0,
    career_id_list:[],
   is_show_category: true,
    counselling_category_id: ''
  });

  useEffect(() => {
    if (!selectedDocument) return;
    setCareer({
     ...Career,
     ...selectedDocument
    });
  }, [selectedDocument]);

  useEffect(() => {
    if (selectedDocument?.is_active !=Career.is_active){
      setCareer({...Career,career_id_list:[]})
    }
   
   const fetch = async () =>{
    if(Career.is_active){
      
      let data = await getINCareerList()
      setCareerList(data)
    } else {
     
       let data= await getCareerList();
      setCareerList(data)
    }
   }
   fetch()
  }, [Career.is_active]);
  useEffect(() => {
   const fetch = async () =>{
    let data = await getCounselingCategories();
    setCounselling(data)
   
   }
   fetch()
  }, []);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    setCareer({
      image_url: '',
      list_title: '',
      is_hidden: true,
      is_active: true,
      list_description: '',
      is_show_category: true,
      order_number:0,
      career_id_list:[],
      counselling_category_id: ''
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
      editorRef.current && editorRef.current.getContent() ? editorRef.current.getContent() : Career.list_description;
      if (!Career.id) {
        let check =await createCareerList({...Career, list_description: content});
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'career' });
          handleCloseDialog();
        } else {
          handleOpenSnackbar(true, 'error', 'Tạo mới lỗi!');
        }
      } else {
        let check =await updateCareerList({...Career, list_description: content});
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
              Thông tin danh sách ngành
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
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                      <DescriptionOutlinedIcon className={`${tabIndex === 2 ? classes.tabActiveIcon : ''}`} />
                        Danh sách ngành
                      </Typography>
                    }
                    value={2}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={tabIndex} index={0}>
                  <Grid container spacing={1}>
                  
                    <Grid item  lg={12} md={12} xs={12} >
                    <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Thông tin </span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tiêu đề danh sách ngành: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="list_title"
                                value={Career.list_title || ''}
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
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách chính: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                              checked={Career.is_active}
                              onChange={()=> setCareer({...Career,is_active: !Career.is_active})}
                              inputProps={{ 'aria-label': 'controlled' }} />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hiển thị tiêu đề: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                              checked={Career.is_show_category}
                              onChange={()=> setCareer({...Career,is_show_category: !Career.is_show_category})}
                              inputProps={{ 'aria-label': 'controlled' }} />

                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ẩn: </span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                            <Switch
                                checked={Career.is_hidden}
                                onChange={()=> setCareer({...Career,is_hidden: !Career.is_hidden})}
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
                  <Editor
                                apiKey={tinyMCESecretKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={Career.list_description}
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
                <TabPanel value={tabIndex} index={2}>
                  <Grid container spacing={1}>
                  <Grid item lg={12} md={12} xs={12}>
                  <div className={classes.tabItem}>
                  <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Danh sách ngành </span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                  <Grid container className={classes.gridItem} alignItems="center">
                  
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh sách ngành:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                className={classes.multpleSelectField}
                                value={Career.career_id_list || []}
                                multiple
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                onChange={(event) => setCareer({ ...Career, career_id_list: event.target.value })}
                                renderValue={(selected) => (
                                  <div className={classes.chips}>
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={activeCareerList?.find((i) => i.id === value)?.value}
                                        className={classes.chip}
                                      />
                                    ))}
                                  </div>
                                )}
                              >
                                {activeCareerList &&
                                  activeCareerList.map((item) => (
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
              { selectedDocument&&(
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateCareer()}
                  >
                    {'Lưu'}
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

export default CareerListModal;
