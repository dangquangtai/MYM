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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import Alert from '../../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions.js';
import { view } from '../../../../store/constant';
import useStyles from '../../../../utils/classes';
import { userAvatar } from '../../../../store/constants/initial.js';
import useDocument from './../../../../hooks/useDocument';
import useDepartment from './../../../../hooks/useDepartment';
import { withStyles } from '@material-ui/core/styles';
import {
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  RemoveCircleOutlineOutlined as RemoveCircleOutlineOutlinedIcon,
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
} from '@material-ui/icons';
import RoleModal from '../../../Department/RoleModal/index.js';

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

const FileCategoryModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form_buttons: formButtons } = useView();
  const { fileCategoryDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.fileCategory.detail.save);
  const { createFileCategory, updateFileCategory, removeGroup, addGroup } = useDocument();
  const { getDepartmentRoleList } = useDepartment();

  const [tabIndex, setTabIndex] = React.useState(0);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const [fileCategoryData, setFileCategoryData] = useState({
    title: '',
    group_id: '',
  });
  const [department, setDepartment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: FLOATING_MENU_CHANGE, fileCategoryDocument: false });
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
    setFileCategoryData({
      title: '',
      group_id: '',
    });
    setTabIndex(0);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFileCategoryData({ ...fileCategoryData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updateFileCategory(fileCategoryData);
        handleOpenSnackbar(true, 'success', 'Cập nhật FileCategory thành công!');
      } else {
        await createFileCategory(fileCategoryData);
        handleOpenSnackbar(true, 'success', 'Tạo mới FileCategory thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'fileCategory' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddDepartment = async (data) => {
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

  useEffect(() => {
    if (!selectedDocument) return;
    setFileCategoryData({
      ...fileCategoryData,
      ...selectedDocument,
    });
    getDepartment(selectedDocument?.group_id);
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
      <RoleModal open={isOpen} onClose={handleCloseModal} onSubmit={handleAddDepartment} />
      <Grid container>
        <Dialog
          open={openDialog || false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          className={classes.partnerdialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            <Grid item xs={12} style={{ textTransform: 'uppercase' }}>
              Chi tiết Danh mục tài liệu
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
                    <Grid item lg={12} md={12} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <InfoOutlinedIcon />
                            <span>Thông tin FileCategory</span>
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
                                value={fileCategoryData.title}
                                className={classes.inputField}
                                onChange={handleChanges}
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

export default FileCategoryModal;
