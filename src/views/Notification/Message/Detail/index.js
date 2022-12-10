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
  Tooltip,
  IconButton,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Table,
  Paper,
  FormControl,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { view } from '../../../../store/constant';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions';
import Alert from '../../../../component/Alert';
import { userAvatar, initNotificationMessage } from '../../../../store/constants/initial';
import {
  QueueMusic,
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  RadioOutlined as RadioOutlinedIcon,
  ImageOutlined as ImageIcon,
  RemoveCircleOutlineOutlined as RemoveCircleOutlineOutlinedIcon,
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
} from '@material-ui/icons';
import useStyles from './../../../../utils/classes';
import { Autocomplete } from '@material-ui/lab';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useNotification from '../../../../hooks/useNotification';
import { withStyles } from '@material-ui/core/styles';
import useDepartment from '../../../../hooks/useDepartment';
import RoleModal from '../../../Department/RoleModal/index.js';
import useAccount from './../../../../hooks/useAccount';
import { initObjectType } from './../../../../store/constants/initial';

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    background: '#FFFFFF',
    borderRadius: '15px',
  },
  title: {
    padding: '16px 32px 20px',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  body: {
    padding: '0 32px',
  },
  form: {
    width: '100%',
    marginBottom: '20px',
  },
  marginTop: {
    marginTop: '20px',
  },
  buttonWrap: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 32px 16px',
  },
  button: {
    margin: '0 12px',
    background: '#FFC000',
  },
  closeButton: {
    margin: '0 12px',
    background: '#465169',
  },
  submitButton: {
    margin: '0 12px',
    background: '#612AFF',
  },
  error: {
    color: 'red',
  },
  formlabel: {
    fontWeight: 'bold',
  },
};
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

const StyledTableCell = withStyles((theme) => ({
  root: {
    '&:not(:first-child)': {
      padding: '16px 2px',
    },
    '&:first-child': {
      padding: '16px 2px 16px 20px',
    },
  },
}))(TableCell);

const NotificationMessageModall = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { notificationMessageDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.notificationMessage.detail.save);
  const { createNotificationMessage, updateNotificationMessage, getAllCategory, getAllAccount, getListObject } =
    useNotification();
  const { removeGroup, addGroup } = useNotification();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { getAllUser } = useAccount();
  const { a } = useAccount();
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);
  const { getDepartmentRoleList } = useDepartment();

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [categories, setCategories] = useState([]);
  const [listAccount, setlistAccount] = useState([]);
  const [notificationMessage, setnotificationMessage] = useState(initNotificationMessage);
  const [selectedCategory, setselectedCategory] = useState('');
  const [selectedAccount, setselectedAccount] = useState('');
  const [selectednotificationMessage, setselectednotificationMessage] = useState([]);
  const [listObject, setlistObject] = useState([]);
  const [selectedObject, setselectedObject] = useState('');
  const [listObjectType, setlistObjectType] = useState(initObjectType);
  const [selectedObjectType, setselectedObjectType] = useState('');
  const [action, setAction] = useState(initNotificationMessage.action);
  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, notificationMessageDocument: false });
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
    setnotificationMessage({ ...notificationMessage, image_url: image });
  };

  const setDocumentToDefault = async () => {
    setselectedAccount();
    setselectedCategory();
    setselectedObjectType();
    setselectedObject();
    setnotificationMessage(initNotificationMessage);
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
    setnotificationMessage({ ...notificationMessage, [name]: value });
  };

  const handleChangeAction = (e) => {
    const { name, value } = e.target;
    const newAction = { ...action, [name]: value };
    setAction(newAction);
    setnotificationMessage({ ...notificationMessage, action: newAction });
  };

  const [department, setDepartment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeObjectType = async (e) => {
    const { name, value } = e.target;
    const newAction = { ...action, [name]: value };
    setAction(newAction);
    setnotificationMessage({ ...notificationMessage, action: newAction });
  };

  useEffect(() => {
    getListObjectByType(action.object_type);
  }, [action.object_type]);

  const getListObjectByType = async (type) => {
    const listObject = await getListObject(type);
    setlistObject(listObject);
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateNotificationMessage(notificationMessage);
        handleOpenSnackbar(true, 'success', 'Cập nhật tin nhắn thông báo thành công!');
      } else {
        await createNotificationMessage(notificationMessage);
        handleOpenSnackbar(true, 'success', 'Tạo mới tin nhắn thông báo thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'notificationMessage' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddDepartment = async (data) => {
    console.log(data);
    try {
      const res = await addGroup({ id: selectedDocument?.id, ...data });
      if (!res) {
        handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
        return;
      }
      getDepartment(res);
      setIsOpen(false);
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const getDepartment = async (group_id) => {
    const res = await getDepartmentRoleList(group_id);
    setDepartment(res);
  };

  const handleRemoveDepartment = async (id) => {
    try {
      const res = await removeGroup({ id: selectedDocument?.id, group_id: id });
      if (!res) {
        handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
        return;
      }
      getDepartment(res);
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const handleSelectCategory = (e, category) => {
    setselectedCategory(category);
    setnotificationMessage({ ...notificationMessage, category_id: category?.id });
  };

  const handleSelectAccount = (e, account) => {
    setselectedAccount(account);
    setnotificationMessage({ ...notificationMessage, account_id: account?.account_id });
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setnotificationMessage({
      ...notificationMessage,
      ...selectedDocument,
      image_url: selectedDocument.image_url || userAvatar,
    });
    setAction(selectedDocument?.action);
    getDepartment(selectedDocument.group_id);

    setselectedCategory(categories.find((category) => category.id === selectedDocument?.category_id));
    setselectedAccount(listAccount.find((account) => account.account_id === selectedDocument?.account_id));
    setselectedObject(listObject?.find((object) => object.Value === action?.object_id));
    setselectedObjectType(listObjectType.find((obtype) => obtype === action?.object_type));
  }, [selectedDocument]);

  useEffect(() => {
    const fetch = async () => {
      const accounts = await getAllUser();
      setlistAccount(accounts);
      const data = await getAllCategory();
      setCategories(data);
    };
    fetch();
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
      <RoleModal open={isOpen} onClose={handleCloseModal} onSubmit={handleAddDepartment} />
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
              Notification Message
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
                        <HistoryIcon className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
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
                      {selectedDocument?.id && (
                        <Grid container spacing={1} alignItems="center">
                          <Grid item lg={6} md={6} xs={6}>
                            <div className={classes.tabItem}>
                              <div className={classes.tabItemTitle}>
                                <div className={classes.tabItemLabel}>
                                  <ImageIcon />
                                  <span>Hình ảnh</span>
                                </div>
                              </div>
                              <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                                <img src={notificationMessage.image_url} alt="" />
                              </div>
                            </div>
                          </Grid>
                          <Grid item lg={6} md={6} xs={6}>
                            <div className={classes.tabItem}>
                              <div className={classes.tabItemTitle}>
                                <div className={classes.tabItemLabel}>
                                  <ImageIcon />
                                  <span>Banner</span>
                                </div>
                              </div>
                              <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                                <img src={notificationMessage.banner_url} alt="banner_url" />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      )}
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <QueueMusic />
                            <span>Chi tiết danh mục thông báo</span>
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
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="title"
                                value={notificationMessage.title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nội dung:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                variant="outlined"
                                name="body"
                                value={notificationMessage.body}
                                className={classes.multilineInputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          {selectedDocument?.id && (
                            <Grid container className={classes.gridItem} alignItems="center">
                              <Grid item lg={4} md={4} xs={4}>
                                <span className={classes.tabItemLabelField}>Ngày tạo:</span>
                              </Grid>
                              <Grid item lg={8} md={8} xs={8}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={1}
                                  rowsMax={1}
                                  readOnly={true}
                                  disabled
                                  variant="outlined"
                                  name="description"
                                  value={notificationMessage.created_date}
                                  className={classes.multilineInputField}
                                  onChange={handleChanges}
                                />
                              </Grid>
                            </Grid>
                          )}

                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={notificationMessage.is_active}
                                onChange={() =>
                                  setnotificationMessage({
                                    ...notificationMessage,
                                    is_active: !notificationMessage.is_active,
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
                    <Grid item lg={6} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <RadioOutlinedIcon />
                            <span>Danh mục và tài khoản</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <FormControl style={style.form}>
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Autocomplete
                                size="small"
                                fullWidth
                                options={categories}
                                value={selectedCategory}
                                onChange={handleSelectCategory}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => <TextField label="Danh mục" {...params} variant="outlined" />}
                              />
                            </Grid>
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Autocomplete
                                size="small"
                                fullWidth
                                options={listAccount}
                                value={selectedAccount}
                                onChange={handleSelectAccount}
                                getOptionLabel={(option) => option.email_address}
                                renderInput={(params) => <TextField label="Tài khoản" {...params} variant="outlined" />}
                              />
                            </Grid>
                          </FormControl>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <RadioOutlinedIcon />
                            <span>Action</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Action label:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="title"
                                value={action.title}
                                className={classes.inputField}
                                onChange={handleChangeAction}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Action Link:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="link"
                                value={action.link}
                                className={classes.inputField}
                                onChange={handleChangeAction}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Object Type:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="object_type"
                                labelId="career-label"
                                id="object_type"
                                className={classes.multpleSelectField}
                                value={action.object_type}
                                onChange={handleChangeObjectType}
                              >
                                {listObjectType?.map((item) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Object ID:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="object_id"
                                labelId="career-label"
                                id="object_id"
                                className={classes.multpleSelectField}
                                value={action.object_id}
                                onChange={handleChangeAction}
                              >
                                {listObject?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Is_Actionable:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={notificationMessage.is_actionable}
                                onChange={() =>
                                  setnotificationMessage({
                                    ...notificationMessage,
                                    is_actionable: !notificationMessage.is_actionable,
                                  })
                                }
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>

                          {selectedDocument?.id && (
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid container direction="row" alignItems="center" justify="space-between">
                                <span className={classes.tabItemLabelField}>Role:</span>
                                <Tooltip title="Thêm">
                                  <IconButton onClick={(e) => setIsOpen(true)}>
                                    <AddCircleOutlineOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <TableContainer component={Paper} className={classes.tableNote}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell align="left">Department Name</StyledTableCell>
                                      <StyledTableCell align="left">Role Template Name</StyledTableCell>
                                      <StyledTableCell align="center">Xoá</StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {department?.map((row) => (
                                      <TableRow key={row}>
                                        <StyledTableCell align="left">{row.Department_Name}</StyledTableCell>
                                        <StyledTableCell align="left">{row.Role_Template_Name}</StyledTableCell>
                                        <StyledTableCell align="center">
                                          <IconButton onClick={(e) => handleRemoveDepartment(row.Group_ID)}>
                                            <RemoveCircleOutlineOutlinedIcon />
                                          </IconButton>
                                        </StyledTableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          )}
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
            <Grid container justify="space-between">
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

export default NotificationMessageModall;
