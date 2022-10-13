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
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE, CONFIRM_CHANGE } from '../../../../store/actions.js';
import { view } from '../../../../store/constant';
import useStyles from '../../../../utils/classes';
import { convertDate } from './../../../../utils/table';
import { initCardBatchData, userAvatar } from '../../../../store/constants/initial.js';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useMedia from './../../../../hooks/useMedia';
import usePayment from './../../../../hooks/usePayment';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
} from '@material-ui/icons';
import { NoPaddingAutocomplete } from '../../../../component/Autocomplete/index.js';
import useConfirmPopup from './../../../../hooks/useConfirmPopup';

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

const CardBatchModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { cardBatchDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const generateButton = formButtons.find((button) => button.name === view.prepaidcardbatch.detail.generate);
  const importButton = formButtons.find((button) => button.name === view.prepaidcardbatch.detail.import);

  const { createCardBatch, generateCard } = usePayment();
  const { getCounselingCategories } = useMedia();
  const { setConfirmPopup } = useConfirmPopup();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    type: '',
  });

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [cardBatchData, setCardBatchData] = useState(initCardBatchData);
  const [counsellings, setCounsellings] = useState([]);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, cardBatchDocument: false });
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

  const showConfirmPopup = ({ title = 'Thông báo', message = '', action = null, payload = null, onSuccess = null }) => {
    setConfirmPopup({ type: CONFIRM_CHANGE, open: true, title, message, action, payload, onSuccess });
  };

  const setDocumentToDefault = async () => {
    setCardBatchData(initCardBatchData);
    setTabIndex(0);
  };
  const setURL = (image) => {
    setCardBatchData({ ...cardBatchData, image_url: image });
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
    setCardBatchData({ ...cardBatchData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      await createCardBatch(cardBatchData);
      handleOpenSnackbar(true, 'success', 'Tạo mới Batch thành công!');
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'batch' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleClickGenerate = async () => {
    showConfirmPopup({
      title: 'Thông báo',
      message: 'Bạn có chắc chắn muốn tạo card cho batch này?',
      action: generateCard,
      payload: cardBatchData.id,
      onSuccess: () => {
        handleOpenSnackbar(true, 'success', 'Tạo voucher thành công!');
      },
    });
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setCardBatchData({
      ...initCardBatchData,
      ...selectedDocument,
      image_url: selectedDocument?.image_url || userAvatar,
    });
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
              Chi tiết Podcast
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
                        Điều khoản và điều kiện
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
                            <ImageIcon />
                            <span>Hình ảnh</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img src={cardBatchData.image_url} alt="" />
                          <div>
                            <div>Upload/Change Batch Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình đại diện</Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            {/* <LibraryMusicOutlinedIcon /> */}
                            <span>Thông tin Batch</span>
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
                                value={cardBatchData.title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
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
                                rows={4}
                                rowsMax={5}
                                variant="outlined"
                                name="description"
                                value={cardBatchData.description}
                                className={classes.inputField}
                                onChange={handleChanges}
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
                            {/* <LibraryMusicOutlinedIcon /> */}
                            <span>Thông tin thêm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng từ ngày:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                name="available_from_date"
                                value={convertDate(cardBatchData.available_from_date)}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng đến ngày:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                name="available_to_date"
                                value={convertDate(cardBatchData.available_to_date)}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Prefix:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="prefix"
                                value={cardBatchData.prefix}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Số lượng:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="amount"
                                value={cardBatchData.amount}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Giá trị:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="value"
                                value={cardBatchData.value}
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
                <TabPanel value={tabIndex} index={1}></TabPanel>
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
                {importButton && selectedDocument?.id && (
                  <Button variant="contained" className={classes.gridItemInfoButton} onClick={handleClickGenerate}>
                    {importButton.text}
                  </Button>
                )}
                {generateButton && selectedDocument?.id && (
                  <Button
                    disabled={cardBatchData.is_generated}
                    variant="contained"
                    className={classes.gridItemInfoButton}
                    onClick={handleClickGenerate}
                  >
                    {generateButton.text}
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

export default CardBatchModal;
