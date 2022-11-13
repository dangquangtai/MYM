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
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import { format as formatDate } from 'date-fns';
import Avatar from '../../../component/Avatar/index';
import CheckIcon from '@material-ui/icons/Check';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Alert from '../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { gridSpacing,view } from '../../../store/constant.js';
import useView from '../../../hooks/useView';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions.js';
import useOrder from '../../../hooks/useOrder.js';
import Modal from './../../Table/Modal/index';
import CardOrderModal from '../AssignModal/index.js';
import { initOrder, initAccount } from '../../../store/constants/initial.js';
import useAccount from '../../../hooks/useAccount.js';
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

const OrderModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons, name, tabs, disabled_fields } = useView();
  const buttonprocess = formButtons.find((button) => button.name === view.order.detail.process);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const { processPaymentOrder, getPrepaidCardByOrder } = useOrder();
  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const [order, setOrder] = useState(initOrder);
  const [account, setAccount] = useState(initAccount);
  const { getAccount } = useAccount();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCard,setOpenModalCard] = useState(false);
  const [products, setProducts] =useState([]);
  useEffect(() => {
    if (!selectedDocument) return;
    setOrder(selectedDocument);
    const fetchAccount = async()=>{
      let data= await getAccount(selectedDocument.account_id);
      setAccount(data);
    }
    fetchAccount();
  }, [selectedDocument]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
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

  const handleUpdate = async () => {
    try {
        let check =await processPaymentOrder(order.id);
        if (check === true) {
          handleOpenSnackbar(true, 'success', 'Xử lý thanh toán thành công!');
          dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'order' });
          handleCloseDialog();
        } else {
          handleOpenSnackbar(true, 'error', 'Hết thời gian xử lý!');
        }
        setIsOpenModal(false);
      }
     catch (error) {
    } finally {
    }
  };
  
  const handleOpenModal = async () =>{
    if(selectedDocument.ref_object_type === 'SHOPPING_CART'){
      let data= await getPrepaidCardByOrder(selectedDocument.id);
      setProducts(data);
      setOpenModalCard(true)
    }
    else{
      setIsOpenModal(true)
    }
  }
  const setDocumentToDefault = async () => {
    setTabIndex(0);
  };
  const processPaymentOrderFunction = async () =>{
    await processPaymentOrder(order.id);
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'order' });
    handleCloseDialog();

  }
 
  return (
    <React.Fragment>
      <CardOrderModal
       openDialog = {isOpenModalCard}
       accountID = {selectedDocument?.account_id}
       email_address= {account?.email_address}
       products = {products}
       setOpenModalCard = {setOpenModalCard}
       processPaymentOrderFunction={processPaymentOrderFunction}
      />
       <Modal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        type={'order'}
        handleProcessOrder={handleUpdate}
        selectedOrder={selectedDocument}
      />
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
              Thông tin chi tiết
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
                        <AccountCircleOutlinedIcon className={`${tabIndex === 0 ? classes.tabActiveIcon : ''}`} />
                        Lịch sử
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
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <span>Mã đơn hàng: {order.order_code}</span>
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>
                        <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Tiêu đề:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                            <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="major"
                                value={order.order_title}
                                className={classes.inputField}
                       
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Ngày đăng ký:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="dob"
                                value={order.order_date}
                                className={classes.inputField}
                            
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mã voucher: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="email_address"
                                type='email'
                                value={order.voucher_code || ''}
                                className={classes.inputField}
                           
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Prepaid_Card_Serial: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="password"
                                type='password'
                                value={account.prepaid_card_serial|| ''}
                                className={classes.inputField}
                              />
                            </Grid>
                          </Grid>

                         
                         


                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Mô tả:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                            <TextField
                                fullWidth
                                rows={2}
                                rowsMax={2}
                                variant="outlined"
                                name="major"
                                value={order.order_description}
                                className={classes.inputField}
                       
                              />
                            </Grid>
                          </Grid>

                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Giá:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                            <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="major"
                                value={order.total.toLocaleString()}
                                className={classes.inputField}
                       
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Giảm giá:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                            <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="major"
                                value={order.discount_amount.toLocaleString()}
                                className={classes.inputField}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Tổng giá:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="current_school"
                                value={order.final_total.toLocaleString()}
                                className={classes.inputField}
                          
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Hình thức thanh toán:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="current_school"
                                value={order.payment_type}
                                className={classes.inputField}
                          
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Trạng thái xử lý:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="current_school"
                                value={order.status_display}
                                className={classes.inputField}
                          
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
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={account.image_url} alt="" />
                        </div>
                        <div className={classes.tabItemBody}>
                          
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                  
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Email đăng ký: </span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="full_name"
                                value={account.email_address || ''}
                                className={classes.inputField}
                            
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>Họ và tên:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="phone_number"
                                value={account?.full_name}
                                className={classes.inputField}
                           
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItem} alignItems="center">
                            <Grid item lg={4} md={4} xs={12}>
                              <span className={classes.tabItemLabelField}>SĐT:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="phone_number"
                                value={account?.phone_number}
                                className={classes.inputField}
                         
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
                    <Grid item lg={6} md={6} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <DescriptionTwoToneIcon />
                            <span>Chi tiết thay đổi</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid
                            container
                            spacing={gridSpacing}
                            alignItems="center"
                            className={classes.projecttablemain}
                          >
                            {order.transaction_log_list.length > 0 &&  order.transaction_log_list
                              .slice(0)
                              .reverse()
                              .map((item, i, arr) => (
                                <Grid item xs={12} key={i}>
                                  <Grid container spacing={2}>
                                    <Grid item>
                                      <Avatar color="primary" size="small" className={classes.avatarIcon}>
                                        <CheckIcon className={i === 0 ? classes.avatarIcon : classes.dnone} />
                                      </Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                      <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                          <Typography align="left" variant="subtitle2">
                                            {formatDate(new Date(item.time), 'dd/MM/yyyy h:mm aa')}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography align="left" variant="body1">
                                            {item.action_name}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              ))}
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
          
              {buttonprocess  && (
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: 'rgb(97, 42, 255)' }}
                    onClick={() => handleOpenModal()}
                  >
                    {buttonprocess.text}
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

export default OrderModal;
