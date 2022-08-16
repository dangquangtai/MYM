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
  FormControl,
  MenuItem,
  TextField,
  Snackbar,
  InputLabel,
} from '@material-ui/core';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Alert from '../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { gridSpacing, view } from '../../store/constant.js';
import useView from '../../hooks/useView';
import { style } from './style.js';
import useStyles from './classes.js';
import PermissionModal from '../FloatingMenu/UploadFile/index.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../store/actions.js';
import useAccount from '../../hooks/useAccount.js';

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

const AccountModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [openDialogUploadImage, setOpenDiaLogUploadImage] = React.useState(false);
  const { form_buttons: formButtons, name, tabs, disabled_fields } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.user.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { createAccount, updateAccount } = useAccount();
  const { accountDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);

  const [account, setAccount] = React.useState({
    company_code: 'HNN',
    job_title: '',
    password: '',
    first_name: '',
    last_name: '',
    job_title: '',
    image_url: 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png',
    email_address: '',
    is_active: true,
    employee_id: '',
    account_id: '',
    timezone:'Eastern Standard Time',
    culture: 'en-SG : English (Singapore)',
  });

  useEffect(() => {
    if (!selectedDocument) return;
    setAccount({
      ...selectedDocument,
    });
  }, [selectedDocument]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    setAccount({
      company_code: 'HNN',
      job_title: '',
      password: '',
      first_name: '',
      last_name: '',
      job_title: '',
      image_url: 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png',
      email_address: '',
      is_active: true,
      employee_id: '',
      account_id: '',
      culture: 'en-SG : English (Singapore)',
      timezone: 'Eastern Standard Time',
    });
    dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: false });
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
  const handleUpdateAccount = async () => {
    try {
      if (account.account_id === '') {
        let check = await createAccount({
          ...account,
          outputtype: 'RawJson',
          company_code: 'HNN',
        });
        if (check == true) {
          handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
        } else {
          handleOpenSnackbar(true, 'success', 'Tài khoản đã tồn tại!');
        }
      } else {
        let check = await updateAccount({
          ...account,
          outputtype: 'RawJson',
          company_code: 'HNN',
        });
        if (check==true){
          handleOpenSnackbar(true,'success','Cập nhập thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'account' });
          handleCloseDialog();
        }
        else {
          handleOpenSnackbar(true,'success','Tài khoản đã tồn tại!');
        }
      }
    } catch (error) {
      console.log('error update booking', error);
    } finally {
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAccount({
      ...account,
      [e.target.name]: value,
    });
  };

  const setDocumentToDefault = async () => {
    setTabIndex(0);
  };
  const setURL = (image) => {
    setAccount({
      ...account,
      image_url: image,
    });
  };

  const handleOpenDiaLog = () => {
    setOpenDiaLogUploadImage(true);
  };
  const handleCloseDiaLog = () => {
    setOpenDiaLogUploadImage(false);
  };
  return (
    <React.Fragment>
      <PermissionModal open={openDialogUploadImage || false} onSuccess={setURL} onClose={handleCloseDiaLog} />
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
              Tạo mới người dùng
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
                        <AccountCircleOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Chi tiết đăng ký
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
                    <Grid item lg={6} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Ảnh đại diện</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container spacing={3} className={classes.gridItemInfo} alignItems="center">
                            <Grid className={classes.gridItemCenter} item lg={12} md={12} xs={12}>
                              <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                              <img src={account.image_url} alt="image_url" />
                              <div>Upload/Change Your Profile Image</div>
                                <Button onClick={handleOpenDiaLog}>Chọn hình đại diện</Button>
                              </div>
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
                            <span>Thông tin cá nhân</span>
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>
                        <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Họ: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="first_name"
                                value={account.first_name || ''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tên</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="last_name"
                                value={account.last_name ||''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Email: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="email_address"
                                type='email'
                                value={account.email_address || ''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mật khẩu: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="password"
                                type='password'
                                value={account.password || ''}
                                className={classes.inputField}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                           <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Culture:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="cultute"
                                labelId="cultute"
                                id="cultute"
                                className={classes.multpleSelectField}
                                value={account.culture}
                                onChange={event => setAccount({...account, culture: event.target.value})}
                              >
                                  <MenuItem
                                    key={'en-SG : English (Singapore)'}
                                    value={'en-SG : English (Singapore)'}
                                    selected={account.culture==='en-SG : English (Singapore)'}
                                  >
                                    Singapore
                                  </MenuItem>
                             
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Timezone:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="timezone"
                                labelId="timezone"
                                id="timezone"
                          
                                className={classes.multpleSelectField}
                                value={account.timezone}
                                onChange={handleChange}
                              >
                           
                                  <MenuItem 

                                    key={'Eastern Standard Time'}
                                    value={'Eastern Standard Time'}
                                    selected={account.timezone==='Eastern Standard Time'}
                                  >
                                    GTM+7
                                  </MenuItem>
                             
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
              {buttonSave && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateAccount()}
                  >
                    {buttonSave.text}
                  </Button>
                </Grid>
              )}
              {!buttonSave && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleUpdateAccount()}
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

export default AccountModal;
