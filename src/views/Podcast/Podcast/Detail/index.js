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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  Tooltip,
} from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import Alert from '../../../../component/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions.js';
import { view } from '../../../../store/constant';
import useStyles from './../../../../utils/classes';
import { initPodcastData, userAvatar } from '../../../../store/constants/initial.js';
import useMedia from './../../../../hooks/useMedia';
import usePartner from './../../../../hooks/usePartner';
import { withStyles } from '@material-ui/core/styles';
import {
  Delete as DeleteIcon,
  History as HistoryIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  RadioOutlined as RadioIcon,
  ImageOutlined as ImageIcon,
  PanoramaOutlined as BannerIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
} from '@material-ui/icons';
import { NoPaddingAutocomplete } from '../../../../component/Autocomplete/index.js';
import FirebaseUpload from './../../../FloatingMenu/FirebaseUpload/index';
import { tinyMCESecretKey } from './../../../../store/constant';

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
      padding: '10px 2px',
    },
    '&:first-child': {
      padding: '16px 2px 16px 20px',
    },
  },
}))(TableCell);

const PodcastModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const editorRef = React.useRef(null);
  const { form_buttons: formButtons } = useView();
  const { podcastDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const { selectedDocument } = useSelector((state) => state.document);
  const saveButton = formButtons.find((button) => button.name === view.podcast.detail.save);
  const { createPodcast, updatePodcast, getCounselingCategories, getAllEpisode } = useMedia();
  const { getMentorbyCategory } = usePartner();
  const [categories, setCategories] = useState([]);
  const [mentorList, setMentorList] = useState([]);
  const [initEpisodes, setInitEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState('');
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);

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

  const [podcastData, setPodcastData] = useState(initPodcastData);
  const [selectedMentor, setSelectedMentor] = useState({});

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
    setPodcastData(initPodcastData);
    setSelectedEpisodes([]);
    setTabIndex(0);
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  };
  const setURL = (image) => {
    if (dialogUpload.type === 'image') {
      setPodcastData({ ...podcastData, image_url: image });
    }
    if (dialogUpload.type === 'banner') {
      setPodcastData({ ...podcastData, banner_url: image });
    }
  };

  const handleOpenDiaLog = (type) => {
    setDialogUpload({
      open: true,
      type: type,
    });
  };

  const handleCloseDiaLog = () => {
    setDialogUpload({
      open: false,
      type: '',
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setPodcastData({ ...podcastData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedDocument?.id) {
        await updatePodcast({
          ...podcastData,
          list_episode_id: selectedEpisodes,
          description:
            editorRef.current && editorRef.current.getContent()
              ? editorRef.current.getContent({ format: 'text' })
              : podcastData.description,
        });
        handleOpenSnackbar(true, 'success', 'Cập nhật Podcast thành công!');
      } else {
        await createPodcast({
          ...podcastData,
          list_episode_id: selectedEpisodes || [],
          description:
            editorRef.current && editorRef.current.getContent()
              ? editorRef.current.getContent({ format: 'text' })
              : podcastData.description,
        });
        handleOpenSnackbar(true, 'success', 'Tạo mới Podcast thành công!');
      }
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'podcast' });
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleChangeEpisode = (e) => {
    const { name, value } = e.target;
    setSelectedEpisodes([...new Set(selectedEpisodes), value]);
    const newSelectionList = episodes.filter((val) => val.id !== value);
    setEpisodes(newSelectionList);
    setSelectedEpisode('');
  };

  const filterObj = (value) => {
    return initEpisodes?.filter((item) => item.id === value);
  };

  const handleDeleteEpisode = (id) => {
    const newSelectionList = selectedEpisodes.filter((val) => val !== id);
    setSelectedEpisodes(newSelectionList);
    const selectedEpisode = filterObj(id);
    selectedEpisode[0].podcast_id = '';
    const newEpisodes = [...episodes, ...selectedEpisode];
    setEpisodes(newEpisodes);
  };

  const handleSelectMentor = (e, mentor) => {
    setSelectedMentor(mentor);
    setPodcastData({ ...podcastData, mentor_id: mentor.id });
  };

  useEffect(() => {
    if (!selectedDocument) return;
    setPodcastData({
      ...podcastData,
      ...selectedDocument,
      image_url: selectedDocument?.image_url || userAvatar,
      banner_url: selectedDocument?.banner_url || userAvatar,
    });
    setSelectedEpisodes(selectedDocument?.list_episode?.map((episode) => episode.id));
    setSelectedMentor(mentorList.find((mentor) => mentor.id === selectedDocument?.mentor_id));
  }, [selectedDocument]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCounselingCategories();
      setCategories(res);
    };
    const fetchEpisodes = async () => {
      const res = await getAllEpisode({
        page: 1,
        no_item_per_page: 1000,
        search_text: '',
      });
      setInitEpisodes(res);
      setEpisodes(res?.filter((item) => item.podcast_id === '' || item.podcast_id === null));
      console.log(res?.filter((item) => item.podcast_id === '' || item.podcast_id === null));
    };
    const fetchMentorList = async () => {
      const res = await getMentorbyCategory();
      setMentorList(res);
    };
    fetchMentorList();
    fetchCategories();
    fetchEpisodes();
  }, []);

  useEffect(() => {
    if (selectedDocument) {
      setEpisodes(
        Object.values(initEpisodes)?.filter(
          (item) => !selectedEpisodes?.includes(item.id) && (item.podcast_id === '' || item.podcast_id === null)
        )
      );
    } else {
      setEpisodes(Object.values(initEpisodes).filter((item) => item.podcast_id === '' || item.podcast_id === null));
    }
    const episodes = selectedEpisodes?.length || 0;
    const listEpisode = Object.values(initEpisodes)?.filter((item) => selectedEpisodes?.includes(item.id));
    const duration = listEpisode.reduce((acc, cur) => acc + cur.duration, 0);
    setPodcastData({ ...podcastData, duration: duration, episodes: episodes });
  }, [selectedEpisodes]);

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
        type="image"
        folder="Podcast"
      />
      {/* <PermissionModal open={dialogUpload.open || false} onSuccess={setURL} onClose={handleCloseDiaLog} /> */}
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
                        Mô tả
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
                          <img src={podcastData.image_url} alt="" />
                          <div>
                            <div>Upload/Change Podcast Image</div>
                            <Button onClick={() => handleOpenDiaLog('image')}>Chọn hình đại diện</Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <RadioIcon />
                            <span>Chi tiết Podcast</span>
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
                                value={podcastData.title}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Danh mục:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="category_id"
                                labelId="career-label"
                                id="career-name"
                                className={classes.multpleSelectField}
                                value={podcastData.category_id}
                                onChange={handleChanges}
                              >
                                {categories?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Mentor:</span>
                            </Grid>
                            {/* <Grid item lg={8} md={8} xs={8}>
                              <Select
                                name="mentor_id"
                                labelId="career-label"
                                id="career-name"
                                className={classes.multpleSelectField}
                                value={podcastData.mentor_id}
                                onChange={handleChanges}
                              >
                                {mentorList?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.fullname}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid> */}
                            <Grid item lg={8} md={8} xs={8}>
                              {/* <Select
                                name="mentor_id"
                                labelId="career-label"
                                id="career-name"
                                className={classes.multpleSelectField}
                                value={podcastData.mentor_id}
                                onChange={handleChanges}
                              >
                                {mentorList?.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.fullname}
                                  </MenuItem>
                                ))}
                              </Select> */}
                              <NoPaddingAutocomplete
                                fullWidth
                                id="mentor"
                                value={selectedMentor}
                                options={mentorList}
                                onChange={handleSelectMentor}
                                getOptionLabel={(option) => option.fullname}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Số tập:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                disabled
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="episodes"
                                number
                                value={podcastData.episodes}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Tổng thời lượng:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                disabled
                                fullWidth
                                rows={1}
                                rowsMax={1}
                                variant="outlined"
                                name="duration"
                                number
                                value={podcastData.duration}
                                className={classes.inputField}
                                onChange={handleChanges}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Dành cho member:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={podcastData.is_for_member}
                                onChange={() =>
                                  setPodcastData({ ...podcastData, is_for_member: !podcastData.is_for_member })
                                }
                                name="is_for_member"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.gridItemInfo} alignItems="center">
                            <Grid item lg={4} md={4} xs={4}>
                              <span className={classes.tabItemLabelField}>Hoạt động:</span>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                              <Switch
                                checked={podcastData.is_active}
                                onChange={() => setPodcastData({ ...podcastData, is_active: !podcastData.is_active })}
                                name="is_active"
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
                            <BannerIcon />
                            <span>Banner</span>
                          </div>
                        </div>
                        <div className={`${classes.tabItemBody} ${classes.tabItemMentorAvatarBody}`}>
                          <img className={classes.bannerImage} src={podcastData.banner_url} alt="" />
                          <div>
                            <div>Upload/Change Banner Image</div>
                            <Button onClick={() => handleOpenDiaLog('banner')}>Chọn hình đại diện</Button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <LibraryMusicOutlinedIcon />
                            <span>Episode</span>
                          </div>
                        </div>
                        <div className={classes.tabItemBody}>
                          <div className={classes.tabItemNoteSelection}>
                            <div className={classes.tabItemNoteSelectionLabel}>Episode: </div>
                            <FormControl fullWidth>
                              <Select
                                id="episode_id"
                                onChange={handleChangeEpisode}
                                displayEmpty
                                name="episode"
                                value={selectedEpisode}
                              >
                                {Object.values(episodes)?.map((item, index) => (
                                  <MenuItem key={index} value={item.id}>
                                    Tập {item.episode_number} - {item.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className={classes.selectedNoteListSection}>
                            <TableContainer component={Paper} className={classes.tableNote}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align="center">Ảnh</StyledTableCell>
                                    <StyledTableCell align="left">Tiêu đề</StyledTableCell>
                                    <StyledTableCell align="left">Xoá</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {selectedEpisodes?.map((id) => {
                                    const data = JSON.parse(JSON.stringify(filterObj(id)));
                                    return (
                                      <TableRow key={id}>
                                        <StyledTableCell align="left">{data[0]?.episode_number}</StyledTableCell>
                                        <StyledTableCell align="left">
                                          <img src={data[0]?.image_url} alt="" width="60" />
                                        </StyledTableCell>
                                        <StyledTableCell
                                          style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                          align="left"
                                          title={data[0]?.title}
                                        >
                                          {data[0]?.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            onClick={() => handleDeleteEpisode(id)}
                                          >
                                            <DeleteIcon fontSize="small" />
                                          </IconButton>
                                        </StyledTableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Editor
                        apiKey={tinyMCESecretKey}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={podcastData.description}
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

export default PodcastModal;
