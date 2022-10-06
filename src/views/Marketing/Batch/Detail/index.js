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
import useStyles from '../../../../utils/classes';
import { initBatchData, userAvatar } from '../../../../store/constants/initial.js';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import useMarketing from './../../../../hooks/useMarketing';
import useMedia from './../../../../hooks/useMedia';
import usePartner from './../../../../hooks/usePartner';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  ImageOutlined as ImageIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
  GraphicEq as GraphicEqIcon,
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

const BatchModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { batchDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.batch.detail.save);
  const generateButton = formButtons.find((button) => button.name === view.batch.detail.generate);

  const { createBatch, updateBatch } = useMarketing();
  const { getCounselingCategories } = useMedia();
  const { getPartnerList } = usePartner();

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

  const [batchData, setBatchData] = useState(initBatchData);
  const [counsellings, setCounsellings] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, podcastDocument: false });
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
    setBatchData(initBatchData);
    setTabIndex(0);
  };
  const setURL = (image) => {
    if (dialogUpload.type === 'image') {
      setBatchData({ ...batchData, image_url: image });
    } else {
      setBatchData({ ...batchData, soure_file_url: image });
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

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setBatchData({ ...batchData, [name]: value });
  };

  const handleSelectPartner = (e, partner) => {
    setSelectedPartner(partner);
    setBatchData({ ...batchData, partner_id: partner?.id });
  };

  const handleSelectEvent = (e, event) => {
    setSelectedEvent(event);
    setBatchData({ ...batchData, event_id: event?.id });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateBatch(batchData);
        handleOpenSnackbar(true, 'success', 'Cập nhật Batch thành công!');
      } else {
        await createBatch(batchData);
        handleOpenSnackbar(true, 'success', 'Tạo mới Batch thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'batch' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const counsellings = await getCounselingCategories();
      setCounsellings(counsellings);
      const partners = await getPartnerList();
      setPartners(partners);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedDocument) return;
    setBatchData({
      ...initBatchData,
      ...selectedDocument,
      image_url: selectedDocument?.image_url || userAvatar,
    });
    setSelectedPartner(partners.find((partner) => partner.id === selectedDocument?.partner_id));
    setSelectedEvent(counsellings.find((counselling) => counselling.id === selectedDocument?.event_id));
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
                          <img src={batchData.image_url} alt="" />
                          <div>
                            <div>Upload/Change Batch Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình đại diện</Button>
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
                                value={batchData.image_url}
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
                            <LibraryMusicOutlinedIcon />
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
                                value={batchData.title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng từ ngày:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                name="applicable_from_date"
                                value={batchData.applicable_from_date}
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
                                type="datetime-local"
                                variant="outlined"
                                name="applicable_to_date"
                                value={batchData.applicable_to_date}
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
                            <LibraryMusicOutlinedIcon />
                            <span>Thông tin thêm</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
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
                                value={batchData.prefix}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Nguồn:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="source"
                                value={batchData.source}
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
                                value={batchData.amount}
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
                                name="voucher_value"
                                value={batchData.voucher_value}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>QR Code:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={batchData.is_qrcode_generated}
                                onChange={() =>
                                  setBatchData({ ...batchData, is_qrcode_generated: !batchData.is_qrcode_generated })
                                }
                                name="is_qrcode_generated"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Dành cho sự kiện:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={batchData.is_for_event}
                                onChange={() => setBatchData({ ...batchData, is_for_event: !batchData.is_for_event })}
                                name="is_for_event"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng cho sự kiện:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                disabled={!batchData.is_for_event}
                                name="event_id"
                                labelId="career-label"
                                id="career-name"
                                className={classes.multpleSelectField}
                                value={batchData.event_id}
                                onChange={handleChanges}
                              >
                                <MenuItem value="">Không chọn</MenuItem>
                                {/* {events?.map((event) => (
                                    <MenuItem key={event.id} value={event.id}>
                                        {event.name}
                                    </MenuItem>
                                ))} */}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Dành cho dịch vụ:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={batchData.is_for_counselling_service}
                                onChange={() =>
                                  setBatchData({
                                    ...batchData,
                                    is_for_counselling_service: !batchData.is_for_counselling_service,
                                  })
                                }
                                name="is_for_counselling_service"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng cho dịch vụ:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                disabled={!batchData.is_for_counselling_service}
                                name="couselling_category_id"
                                value={batchData.couselling_category_id}
                                className={classes.multpleSelectField}
                                onChange={handleChanges}
                              >
                                <MenuItem value="">Không chọn</MenuItem>
                                {counsellings?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Dành cho đối tác:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={batchData.is_partner_limit}
                                onChange={() =>
                                  setBatchData({ ...batchData, is_partner_limit: !batchData.is_partner_limit })
                                }
                                name="is_partner_limit"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Áp dụng cho đối tác:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <NoPaddingAutocomplete
                                disabled={!batchData.is_partner_limit}
                                fullWidth
                                id="mentor"
                                value={selectedPartner}
                                options={partners}
                                onChange={handleSelectPartner}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                              />
                              {/* <Select
                                name="partner_id"
                                value={batchData.partner_id}
                                className={classes.multpleSelectField}
                                onChange={handleChanges}
                              >
                                <MenuItem value="">Không chọn</MenuItem>
                                {partners?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select> */}
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Của bên thứ 3:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={batchData.is_third_party_voucher}
                                onChange={() =>
                                  setBatchData({
                                    ...batchData,
                                    is_third_party_voucher: !batchData.is_third_party_voucher,
                                  })
                                }
                                name="is_third_party_voucher"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
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
                            <ImageIcon />
                            <span>Mô tả</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={5}
                                rowsMax={8}
                                variant="outlined"
                                name="benefit_description"
                                value={batchData.benefit_description}
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
                            <ImageIcon />
                            <span>Điều khoản</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={5}
                                rowsMax={8}
                                variant="outlined"
                                name="terms_condition"
                                value={batchData.terms_condition}
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

export default BatchModal;
