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
  InputLabel,
  Snackbar,
  Checkbox,
} from '@material-ui/core';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import style from '../Detail/style'
import { gridSpacing, view } from '../../../store/constant';
import useView from '../../../hooks/useView';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions';
import useDepartment from '../../../hooks/useDepartment';
import useRole from '../../../hooks/useRole';
import useAccount from '../../../hooks/useAccount';
import Alert from '../../../component/Alert'
import { CheckBox } from '@material-ui/icons';
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

const FormModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons, name, tabs, disabled_fields } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.department.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const {  getDepartmentList, getDepartmentTypeList,} = useDepartment();
  const { accountDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const { addAccountToGroup, getDepartmentListGroup } = useRole();
  const [role, setRole] = React.useState({account_id: [],
                                          group_id: '',
                                          email_address: [],
                                          company_code: 'HNN'});
  const { getAllUser } = useAccount();
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  })
  const [categories, setCategory] = React.useState();
  const [departmentTypes, setDepartmentType] = React.useState();
  const [departmentGroups, setDepartmentGroup] = React.useState();
  const addAccount = async () =>{
    try{
     let check= await addAccountToGroup(role.group_id, role.account_id);
     if (check) {
      handleOpenSnackbar(true,'success','Cập nhật thành công!');
     }else{
      handleOpenSnackbar(true,'success','Cập nhật thất bại!');
     }
     
    }
    catch{
      handleOpenSnackbar(true,'success','Cập nhật thất bại!');
    }
  }
  useEffect(() => {
    async function getUser(){
      let data= await getAllUser();
      let data2 =await getDepartmentListGroup();
      setDepartmentType(data);
      setDepartmentGroup(data2);
    }
    getUser();
    setRole({
      account_id: [],
      email_address: [],

    });
    if (!selectedDocument) return;
    setRole({
      account_id: [],
      email_address: [],
      group_id: selectedDocument.group_id,

    });
    
    
  }, []);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    setRole({
      group_id: '',
      account_id: [],
      email_address: [],
    });
    
    dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: false });
  };

 
  
  const handleChange = (e) => {
    const value = e.target.value;
    setRole({
      ...role,
      [e.target.name]: value
    });
  }


  const setDocumentToDefault = async () => {
    setTabIndex(0);

  };
  const handleOpenSnackbar = (isOpen, type, text) => {
    setSnackbarStatus({
      isOpen: isOpen,
      type: type,
      text: text
    })
  }
 
  return (

    <React.Fragment>
     
     {snackbarStatus.isOpen && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbarStatus.isOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarStatus({ ...snackbarStatus, isOpen: false })}>
          <Alert onClose={() => setSnackbarStatus({ ...snackbarStatus, isOpen: false })} severity={snackbarStatus.type} sx={{ width: '100%' }}>
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
              Thêm danh sách tài khoản
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
                      <Typography
                        className={classes.tabLabels}
                        component="span"
                        variant="subtitle1"
                      >
                        
                        Thông tin 
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
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin</span>
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>
                        

                          <Grid container className={classes.gridItemInfo} alignItems="center">
                              <Grid item lg={4} md={4} xs={4}>
                                <span className={classes.tabItemLabelField}>Danh sách tài khoản: </span>
                              </Grid>
                            <Grid item lg={8} md={8} xs={8} >
                              
                         
                              <Select
                                labelId="department_type"
                                id="department_type"
                                value={role.account_id}
                                className={classes.multpleSelectField}
                                onChange={event => setRole({ ...role, account_id: event.target.value})}
                                multiple={true}
                                >
                                <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {departmentTypes && departmentTypes.map(category => (
                                  <MenuItem value={category.account_id} key={category.email_address}>{category.email_address}</MenuItem>
                                ))}
                                </Select>
                            </Grid>
                            </Grid>
                            <Grid container className={classes.gridItemInfo} alignItems="center">
                             
                            <Grid item lg={4} md={4} xs={4}>
                                <span className={classes.tabItemLabelField}>Phòng ban: </span>
                              </Grid>
                            <Grid item lg={8} md={8} xs={8} >
                              
                         
                              <Select
                                labelId="department_type"
                                id="department_type"
                                value={role.group_id}
                                className={classes.multpleSelectField}
                                onChange={event => setRole({ ...role, group_id: event.target.value})}
                                
                                >
                                <MenuItem value="">
                                  <em>Không chọn</em>
                                </MenuItem>
                                {departmentGroups && departmentGroups.map(category => (
                                  <MenuItem value={category.Key} key={category.Key}>{category.Value}</MenuItem>
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
            <Grid container justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: 'rgb(70, 81, 105)', }}
                  onClick={() => handleCloseDialog()}
                >
                  Đóng
                </Button>
              </Grid>
             
          
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={addAccount}
                  >
                    Lưu
                  </Button>
                </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default FormModal;
