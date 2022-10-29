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
  Select,
  MenuItem,
} from '@material-ui/core';
import Alert from '../../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions.js';
import { view } from '../../../../store/constant';
import useStyles from './../classes';
import { initBatchData, userAvatar } from '../../../../store/constants/initial.js';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useEventCategory from './../../../../hooks/useEventCategory';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
  GraphicEq as GraphicEqIcon,
  ImportantDevices,
} from '@material-ui/icons';
import { NoPaddingAutocomplete } from '../../../../component/Autocomplete/index.js';

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

const EventCategoryModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { eventcategoryDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const {  } = useEventCategory();
  const [eventcategory, setCategory] = React.useState({
    category_name:'',
    category_code:''
  });
  const [tabIndex, setTabIndex] = React.useState(0);
  const buttoncreateEvent =formButtons.find((button) => button.name === view.eventcategory.detail.save);
  const {  createEventCategory, updateEventCategory,} = useEventCategory();
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const handleCloseDialog = () => {
    setCategory({category_name:''});
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, eventcategoryDocument: false });
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
 
    setTabIndex(0);
  };
  const setURL = (image) => {
    
  };

  const handleOpenDiaLog = (type) => {
   
  };

  const handleCloseUploadDiaLog = () => {
   
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setCategory({ ...eventcategory, [name]: value });
  };

  const handleSelectPartner = (e, partner) => {
   
  };

  const handleSelectEvent = (e, event) => {
   
  
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateEventCategory(eventcategory);
        handleOpenSnackbar(true, 'success', 'Cập nhật thành công!');
      } else {
        await createEventCategory(eventcategory);
        handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'eventcategory' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedDocument) return;
    setCategory({...selectedDocument})
  }, [selectedDocument]);

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
                        Nội dung
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={tabIndex} index={0}>
                  <Grid container spacing={1}>
                    <Grid item lg={12} md={12} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <LibraryMusicOutlinedIcon />
                            <span>Thông tin</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                       
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên danh mục:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="category_name"
                                value={eventcategory.category_name}
                                className={classes.inputField}
                                onChange={handleChanges}
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
                {buttoncreateEvent && selectedDocument?.id && (
                  <Button variant="contained" style={{ background: 'rgb(97, 42, 255)' }} onClick={handleSubmitForm}>
                    {buttoncreateEvent.text}
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

export default EventCategoryModal;
