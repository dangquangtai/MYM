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
  FormControl,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import Alert from '../../../../component/Alert';
import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { style } from './../../../Table/style';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions.js';
import { tinyMCESecretKey, view } from '../../../../store/constant';
import useStyles from '../../../../utils/classes';
import { initEvent, userAvatar } from '../../../../store/constants/initial.js';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useEvent from './../../../../hooks/useEvent';
import useBooking from './../../../../hooks/useBooking';
import usePartner from './../../../../hooks/usePartner';
import useEventCategory from './../../../../hooks/useEventCategory';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
  GraphicEq as GraphicEqIcon,
} from '@material-ui/icons';
import { Editor } from '@tinymce/tinymce-react';

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

const EventModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form_buttons: formButtons } = useView();
  const { eventDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const { getEventCategoryList } = useEventCategory();
  const { getMentorList } = usePartner();
  const [mentorList, setMentorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentorList, setSelectedMentorList] = useState([]);
  const [mentorListSelection, setMentorListSelection] = useState([]);
  const { createEvent, updateEvent } = useEvent();
  const { getCounsellingByEvent } = useBooking();
  const editorRef = React.useRef(null);

  const [eventData, setEvent] = useState(initEvent);

  const { provinces: provinceList } = useSelector((state) => state.metadata);

  const [bookingList, setBooking] = useState([]);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const buttoncreateEvent = formButtons.find((button) => button.name === view.event.detail.save);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: '',
  });
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleCloseDialog = () => {
    setEvent(initEvent);
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, eventDocument: false });
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
    setEvent(initEvent);
    setTabIndex(0);
    if (editorRef.current) editorRef.current.setContent('');
  };
  const setURL = (image) => {
    if (dialogUpload.type === 'image') {
      setEvent({ ...eventData, image_url: image });
    } else {
      setEvent({ ...eventData, map_url: image });
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
  const handleChangeMentorSelection = (e) => {
    if (!!selectedMentorList) {
      setSelectedMentorList([...selectedMentorList, e.target.value]);
    } else {
      setSelectedMentorList([e.target.value]);
    }

    let newSelectionList = JSON.parse(JSON.stringify(mentorListSelection));
    newSelectionList.map((mentor, index) => {
      if (!!mentor && mentor.id === e.target.value) {
        delete newSelectionList[index];
        setMentorListSelection(newSelectionList);
        setSelectedMentor('');
        return;
      }
    });
  };
  const handleChangeMentorSelectionDefault = (id) => {
    let newSelectionList = JSON.parse(JSON.stringify(mentorListSelection));
    newSelectionList.map((mentor, index) => {
      if (!!mentor && mentor.id === id) {
        delete newSelectionList[index];
        setMentorListSelection(newSelectionList);
        setSelectedMentor('');
        return;
      }
    });
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setEvent({ ...eventData, [name]: value });
  };
  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        let check = await updateEvent(
          {
            ...eventData,
            description:
              editorRef.current && editorRef.current.getContent()
                ? editorRef.current.getContent({ format: 'text' })
                : eventData.description,
          },
          selectedMentorList
        );
        if (check) {
          handleOpenSnackbar(true, 'success', 'Cập nhật thành công!');
        } else {
          handleOpenSnackbar(true, 'success', 'Cập nhật không thành công!');
        }
      } else {
       
        let check = await  createEvent(
          {
            ...eventData,
            description:
              editorRef.current && editorRef.current.getContent()
                ? editorRef.current.getContent({ format: 'text' })
                : eventData.description,
          },
          selectedMentorList
        );
        if (check) {
          handleOpenSnackbar(true, 'success', 'Cập nhật thành công!');
        } else {
          handleOpenSnackbar(true, 'success', 'Cập nhật không thành công!');
        }
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'event' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const handleRemoveSelected = (id) => {
    const newSelectedList = selectedMentorList.filter((item) => item !== id);
    setSelectedMentorList(newSelectedList);

    if (mentorList.length > 0) {
      mentorList.map((mentor) => mentor.id === id && setMentorListSelection([...mentorListSelection, mentor]));
    }
  };
  const fetchData = async () => {
    let data = await getMentorList();
    setMentorList(data);
    setMentorListSelection(data);
    data = await getEventCategoryList();
    setCategoryList(data);
  };

  useEffect(() => {
    setSelectedMentorList('');
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();

    if (!selectedDocument) return;
    setEvent({
      ...initEvent,
      ...selectedDocument,
    });
    const fetchBooking = async () => {
      let data = await getCounsellingByEvent(selectedDocument.id, 1, 10, '', '', 'desc');
      setBooking(data);
    };
    fetchBooking();
    setSelectedMentorList(selectedDocument.mentor_id_list);
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
      <FirebaseUpload
        open={dialogUpload.open || false}
        onSuccess={setURL}
        onClose={handleCloseUploadDiaLog}
        folder="Bacth"
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
                        <DescriptionOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Mô tả chi tiết
                      </Typography>
                    }
                    value={1}
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography className={classes.tabLabels} component="span" variant="subtitle1">
                        <DescriptionOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Danh sách booking
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
                    <Grid item lg={6} md={6} xs={6}>
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
                              <span className={classes.tabItemLabelField}>Tiêu đề:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                autoFocus
                                rows={1}
                                rowsMax={1}
                                margin="normal"
                                name="title"
                                size="medium"
                                type="text"
                                variant="outlined"
                                onChange={handleChanges}
                                className={classes.inputField}
                                value={eventData.title || ''}
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
                                type="text"
                                variant="outlined"
                                name="address"
                                value={eventData.address}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên địa điểm:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="address_title"
                                value={eventData.address_title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Price:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="price"
                                value={eventData.price || 0}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Link online:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="online_url"
                                value={eventData.online_url}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Tỉnh:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={eventData.province_id}
                                onChange={(e) => setEvent({ ...eventData, province_id: e.target.value })}
                              >
                                {provinceList &&
                                  provinceList.map((item) => (
                                    <MenuItem
                                      key={item.id}
                                      value={item.id}
                                      selected={eventData.province_id === item.id}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh mục 1:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={eventData.category_id_1}
                                onChange={(e) => setEvent({ ...eventData, category_id_1: e.target.value })}
                              >
                                <MenuItem value={' '} selected={eventData.category_id_1 === ' '}>
                                  <em>Không chọn</em>
                                </MenuItem>
                                {categoryList &&
                                  categoryList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.category_name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh mục 2:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={eventData.category_id_2}
                                onChange={(e) => setEvent({ ...eventData, category_id_2: e.target.value })}
                              >
                                <MenuItem value={' '} selected={eventData.category_id_2 === ' '}>
                                  <em>Không chọn</em>
                                </MenuItem>
                                {categoryList &&
                                  categoryList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.category_name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh mục 3:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={eventData.category_id_3}
                                onChange={(e) => setEvent({ ...eventData, category_id_3: e.target.value })}
                              >
                                <MenuItem value={' '} selected={eventData.category_id_3 === ' '}>
                                  <em>Không chọn</em>
                                </MenuItem>
                                {categoryList &&
                                  categoryList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.category_name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Danh mục 4:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <Select
                                className={classes.multpleSelectField}
                                value={eventData.category_id_4}
                                onChange={(e) => setEvent({ ...eventData, category_id_4: e.target.value })}
                              >
                                <MenuItem value={' '} selected={eventData.category_id_4 === ' '}>
                                  <em>Không chọn</em>
                                </MenuItem>
                                {categoryList &&
                                  categoryList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.category_name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Active:</span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                                onChange={() => setEvent({ ...eventData, is_active: !eventData.is_active })}
                                checked={eventData.is_active}
                                name="is_active"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Feature:</span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                                checked={eventData.is_featured}
                                onChange={(e) => setEvent({ ...eventData, is_featured: e.target.checked })}
                              />
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <span className={classes.tabItemLabelField}>Online Event:</span>
                            </Grid>
                            <Grid item lg={2} md={2} xs={2}>
                              <Switch
                                checked={eventData.is_online_event}
                                onChange={(e) => setEvent({ ...eventData, is_online_event: e.target.checked })}
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
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={eventData.image_url} alt="" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình </Button>
                          </div>
                        </div>

                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hình ảnh:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="image_url"
                                value={eventData.image_url}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Map</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={eventData.map_url} alt="" />
                          <div>
                            <div>Upload/Change Image</div>
                            <Button onClick={() => handleOpenDiaLog('map')}>Chọn hình </Button>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Map:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="map_url"
                                value={eventData.map_url}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Map long:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="map_long"
                                value={eventData.map_long}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Map lat:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                name="map_lat"
                                value={eventData.map_lat}
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
                <TabPanel value={tabIndex} index={1}>
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} xs={6}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <LibraryMusicOutlinedIcon />
                            <span>Thông tin thời gian</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Thời gian bắt đầu:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="from_date"
                                value={eventData.from_date}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Thời gian kết thúc:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="to_date"
                                value={eventData.to_date}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Thời gian bắt đầu đăng ký:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="open_registration_date"
                                value={eventData.open_registration_date}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Thời gian kết thúc đăng ký:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="close_registration_date"
                                value={eventData.close_registration_date}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <ImageIcon />
                            <span>Chọn mentor</span>
                          </div>
                        </div>
                        <div className={classes.tabItemNoteSelection}>
                          <div className={classes.tabItemNoteSelectionLabel}>Danh sách mentor: </div>
                          <FormControl fullWidth>
                            <Select id="note_id" onChange={handleChangeMentorSelection} displayEmpty>
                              {Object.values(mentorListSelection)?.map(
                                (mentor, index) =>
                                  !!mentor && (
                                    <MenuItem key={index} value={mentor.id}>
                                      {mentor.fullname}
                                    </MenuItem>
                                  )
                              )}
                            </Select>
                          </FormControl>
                        </div>
                        <div className={classes.selectedNoteListSection}>
                          {!!selectedMentorList &&
                            selectedMentorList.map(
                              (id) => (
                                handleChangeMentorSelectionDefault(id),
                                mentorList.map(
                                  (mentor) =>
                                    mentor.id === id && (
                                      <div key={id} className={classes.selectedNoteItem}>
                                        <div>{mentor.fullname}</div>
                                        <CloseOutlinedIcon
                                          onClick={() => handleRemoveSelected(id)}
                                          style={style.selectedItemCloseIcon}
                                        />
                                      </div>
                                    )
                                )
                              )
                            )}
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <LibraryMusicOutlinedIcon />
                            <span>Mô tả chi tiết</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Editor
                                apiKey={tinyMCESecretKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={eventData.description}
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
                            <LibraryMusicOutlinedIcon />
                            <span>Tổng số booking : {bookingList.length || 0}</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              className={classes.table}
                              aria-labelledby="tableTitle"
                              size={'medium'}
                              // aria-label="enhanced table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell padding="checkbox">Mã đăng ký</TableCell>
                                  <TableCell padding="checkbox">Ngày đăng ký</TableCell>
                                  <TableCell padding="checkbox">Khách hàng</TableCell>
                                  <TableCell padding="checkbox">Email</TableCell>
                                  <TableCell padding="checkbox">Trường</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {bookingList.map((row, index) => {
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  return (
                                    <TableRow className={classes.tableRow} hover tabIndex={-1} key={row.id}>
                                      <TableCell padding="checkbox">
                                        <>
                                          <span className={classes.tableItemName}>{row.case_number}</span>
                                        </>
                                      </TableCell>
                                      <TableCell padding="checkbox">
                                        <>
                                          <span className={classes.tableItemName}>{row.created_date}</span>
                                        </>
                                      </TableCell>
                                      <TableCell padding="checkbox">
                                        <>
                                          <span className={classes.tableItemName}>{row.fullname}</span>
                                        </>
                                      </TableCell>
                                      <TableCell padding="checkbox">
                                        <>
                                          <span className={classes.tableItemName}>{row.email_address}</span>
                                        </>
                                      </TableCell>
                                      <TableCell padding="checkbox">
                                        <>
                                          <span className={classes.tableItemName}>{row.current_school}</span>
                                        </>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
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
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleSubmitForm()}
                  >
                    {buttoncreateEvent.text}
                  </Button>
                )}
                {!selectedDocument?.id && (
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleSubmitForm()}
                  >
                    Tạo mới1
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

export default EventModal;
