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
    Chip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { view } from '../../../../store/constant';
import useView from '../../../../hooks/useView';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../../store/actions';
import Alert from '../../../../component/Alert';
import useSite from '../../../../hooks/useSite';
import { Autocomplete } from '@material-ui/lab';
import DatePicker from './../../../../component/DatePicker';
import {
    QueueMusic,
    History,
    DescriptionOutlined as DescriptionOutlinedIcon,
    RadioOutlined as RadioOutlinedIcon,
} from '@material-ui/icons';
import useStyles from './../../../../utils/classes';
import { async } from '@firebase/util';

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

const QnAModal = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { form_buttons: formButtons } = useView();
    const { qnaDocument: openDialog } = useSelector((state) => state.floatingMenu);
    const { selectedDocument } = useSelector((state) => state.document);
    const saveButton = formButtons.find((button) => button.name === view.qna.detail.save);
    const { createQnA, updateQnA, getAllLandingPage, getCategoryByLandingPage, getNewsByLandingPage, getSubCategory } = useSite();
    const [tabIndex, setTabIndex] = React.useState(0);

    const [snackbarStatus, setSnackbarStatus] = useState({
        isOpen: false,
        type: '',
        text: '',
    });


    const [QnA, setQnA] = useState({
        display_date: new Date(),
        is_active: true,
        is_answered: false,
        is_selected: false
    });
    const [news, setNews] = useState([]);
    const [landingPage, setLandingPage] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const handleCloseDialog = () => {
        setDocumentToDefault();
        dispatch({ type: FLOATING_MENU_CHANGE, qnaDocument: false });
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
        setQnA({
            is_active: true,
            is_answered: false,
            is_selected: false
        })
        setTabIndex(0);
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setQnA({ ...QnA, [name]: value });
    };
    const handleChangesLandingPage = async (e) => {
        const {
            target: { value },
        } = await e;
        setQnA({ ...QnA, landing_page_id: value, category_id: '', answer_news_id: '' });

    };
    const handleChangesCategory = async (e) => {
        const {
            target: { value },
        } = await e;
        setQnA({ ...QnA, category_id: value, sub_category_id: '' });
    };

    const handleSubmitForm = async () => {
        try {
            if (selectedDocument?.id) {
                await updateQnA(QnA);
                handleOpenSnackbar(true, 'success', 'Cập nhật Câu hỏi thành công!');
            } else {
                await createQnA(QnA);
                handleOpenSnackbar(true, 'success', 'Tạo mới Câu hỏi thành công!');
            }
            dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'qna' });
            handleCloseDialog();
        } catch (error) {
            handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    };


    const handleChangeSubcategory = (e) => {
        const {
            target: { value },
        } = e;
        setQnA({ ...QnA, sub_category_id: value });
    };
    useEffect(() => {
        if (!selectedDocument) return;
        setQnA({
            ...QnA,
            ...selectedDocument,
        });
    }, [selectedDocument]);

    useEffect(() => {
        const fetchData = async () => {
            const ldpage = await getAllLandingPage();
            setLandingPage(ldpage);

        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const category = await getCategoryByLandingPage(QnA?.landing_page_id);
            setCategory(category);
            const news = await getNewsByLandingPage(QnA?.landing_page_id);
            setNews(news);
        };
        const fetchSubCateData = async () => {
            const subCategory = await getSubCategory(QnA?.category_id);
            setSubCategory(subCategory);
        };
        if (QnA?.landing_page_id) {
            fetchData();
        }
        if (QnA.category_id) {
            fetchSubCateData();
        }

    }, [QnA.category_id, QnA.landing_page_id, getCategoryByLandingPage, getNewsByLandingPage, getSubCategory]);


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
                    className={selectedDocument?.id ? (classes.useradddialog) : (classes.partnerdialog)}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid item xs={12} style={{ textTransform: 'uppercase' }}>
                            Câu hỏi
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
                                                <History className={`${tabIndex === 1 ? classes.tabActiveIcon : ''}`} />
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
                                        <Grid item lg={selectedDocument?.id ? (6) : (12)} md={selectedDocument?.id ? (6) : (12)} xs={12}>
                                            <div className={classes.tabItem}>
                                                <div className={classes.tabItemTitle}>
                                                    <div className={classes.tabItemLabel}>
                                                        {/* <QueueMusic /> */}
                                                        <span>Chi tiết câu hỏi</span>
                                                    </div>
                                                </div>
                                                <div className={classes.tabItemBody}>
                                                    <Grid container className={classes.gridItemInfo} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Câu hỏi:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                multiline
                                                                variant="outlined"
                                                                rows={3}
                                                                rowsMax={3}
                                                                name="title"
                                                                value={QnA.title || ''}
                                                                size="small"
                                                                onChange={handleChanges}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItem} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Landing Page:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <Select

                                                                className={classes.multpleSelectField}
                                                                value={QnA?.landing_page_id || ''}
                                                                onChange={handleChangesLandingPage}
                                                            >
                                                                {landingPage?.map((item) => (
                                                                    <MenuItem key={item.ID} value={item.ID}>
                                                                        {item.Landing_Page_Name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItem} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Danh mục:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <Select

                                                                className={classes.multpleSelectField}
                                                                value={QnA?.category_id || ''}
                                                                onChange={handleChangesCategory}

                                                            >
                                                                {category?.map((item) => (
                                                                    <MenuItem key={item.ID} value={item.ID}>
                                                                        {item.Category_Name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItem} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Danh mục phụ:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <Select

                                                                className={classes.multpleSelectField}
                                                                value={QnA?.sub_category_id || ''}
                                                                onChange={handleChangeSubcategory}

                                                            >
                                                                {subCategory?.map((item) => (
                                                                    <MenuItem key={item.ID} value={item.ID}>
                                                                        {item.Sub_Category_Name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItem} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Tin tức:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <Autocomplete
                                                                size="small"
                                                                options={news}
                                                                getOptionLabel={(option) => option.Value}
                                                                value={news.find(item => item.Key === QnA.answer_news_id) || null}
                                                                onChange={(event, newValue) => {
                                                                    setQnA({ ...QnA, answer_news_id: newValue?.Key });
                                                                    // setSelectedObject(newValue);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} variant="outlined" className={classes.inputField} />
                                                                )}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container className={classes.gridItemInfo} alignItems="center">
                                                        <Grid item lg={2} md={2} xs={12}>
                                                            <span className={classes.tabItemLabelField}>Thứ tự:</span>
                                                        </Grid>
                                                        <Grid item lg={10} md={10} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                variant="outlined"
                                                                type='number'
                                                                name="order_number"
                                                                value={QnA.order_number || 0}
                                                                size="small"
                                                                onChange={handleChanges}
                                                            />
                                                        </Grid>
                                                    </Grid>


                                                    <Grid container className={classes.gridItemInfo} alignItems="center">
                                                        <Grid item lg={4} md={4} xs={4}>
                                                            <span className={classes.tabItemLabelField}>Hoạt động:</span>
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={8}>
                                                            <Switch
                                                                checked={QnA.is_active}
                                                                onChange={(e) => setQnA({ ...QnA, is_active: e.target.checked })}
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItemInfo} alignItems="center">
                                                        <Grid item lg={4} md={4} xs={4}>
                                                            <span className={classes.tabItemLabelField}>Trả lời:</span>
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={8}>
                                                            <Switch
                                                                checked={QnA.answer_news_id ? true : QnA.is_answered}
                                                                onChange={(e) => setQnA({ ...QnA, is_answered: e.target.checked })}
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.gridItemInfo} alignItems="center">
                                                        <Grid item lg={4} md={4} xs={4}>
                                                            <span className={classes.tabItemLabelField}>Chọn:</span>
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={8}>
                                                            <Switch
                                                                checked={QnA.is_selected}
                                                                onChange={(e) => setQnA({ ...QnA, is_selected: e.target.checked })}
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                </div>
                                            </div>
                                        </Grid>

                                        {selectedDocument?.id && (
                                            <Grid item lg={6} md={6} xs={12}>
                                                <div className={classes.tabItem}>
                                                    <div className={classes.tabItemTitle}>
                                                        <div className={classes.tabItemLabel}>
                                                            {/* <RadioOutlinedIcon /> */}
                                                            <span>Thông tin thêm</span>
                                                        </div>
                                                    </div>
                                                    <div className={classes.tabItemBody}>
                                                        <Grid container className={classes.gridItemInfo} alignItems="center">
                                                            <Grid item lg={4} md={4} xs={4}>
                                                                <span className={classes.tabItemLabelField}>Người gửi:</span>
                                                            </Grid>
                                                            <Grid item lg={8} md={8} xs={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    disabled
                                                                    variant="outlined"
                                                                    name="display_name"
                                                                    value={QnA.display_name || ''}
                                                                    size="small"
                                                                    onChange={handleChanges}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container className={classes.gridItemInfo} alignItems="center">
                                                            <Grid item lg={4} md={4} xs={4}>
                                                                <span className={classes.tabItemLabelField}>Email:</span>
                                                            </Grid>
                                                            <Grid item lg={8} md={8} xs={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    disabled
                                                                    variant="outlined"
                                                                    name="email_address"
                                                                    value={QnA.email_address || ''}
                                                                    size="small"
                                                                    onChange={handleChanges}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container className={classes.gridItemInfo} alignItems="center">
                                                            <Grid item lg={4} md={4} xs={4}>
                                                                <span className={classes.tabItemLabelField}>SĐT:</span>
                                                            </Grid>
                                                            <Grid item lg={8} md={8} xs={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    disabled
                                                                    variant="outlined"
                                                                    name="mobile"
                                                                    type='number'
                                                                    value={QnA.mobile || ''}
                                                                    size="small"
                                                                    onChange={handleChanges}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container className={classes.gridItemInfo} alignItems="center">
                                                            <Grid item lg={4} md={4} xs={4}>
                                                                <span className={classes.tabItemLabelField}>Ngày gửi:</span>

                                                            </Grid>

                                                            <Grid item lg={8} md={8} xs={8}>
                                                                <DatePicker
                                                                    disabled
                                                                    date={QnA?.display_date}
                                                                    onChange={(date) => setQnA({ ...QnA, display_date: date })}
                                                                />

                                                            </Grid>
                                                        </Grid>

                                                    </div>
                                                </div>
                                            </Grid>
                                        )}
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

export default QnAModal;
