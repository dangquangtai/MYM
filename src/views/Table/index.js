import {
  Button,
  Card,
  Checkbox,
  Grid,
  Tooltip,
  FormControlLabel,
  TablePagination,
  TableRow,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  Snackbar,
  Portal,
} from '@material-ui/core';
import Alert from '../../component/Alert/index';
import React, { useEffect } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DuoIcon from '@material-ui/icons/Duo';
import NoteAddSharpIcon from '@material-ui/icons/NoteAddSharp';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_CHANGE, DOCUMENT_CHANGE, FLOATING_MENU_CHANGE, TASK_CHANGE } from '../../store/actions';
import { gridSpacing, view } from '../../store/constant';
import Modal from '../Table/Modal';
import useAccount from '../../hooks/useAccount';
import useBooking from './../../hooks/useBooking';
import usePartner from '../../hooks/usePartner';
import useDepartment from '../../hooks/useDepartment';
import useConfirmPopup from './../../hooks/useConfirmPopup';
import useTask from './../../hooks/useTask';
import useView from './../../hooks/useView';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import NoteModal from './NoteModal';
import TreeViewModal from '../Department/Tree_View';
import { style, useStyles } from './style';
import { bookingStatusList } from './data';
import { getComparator, stableSort, getTodayAndTomorrow } from '../../utils/table';
import useRole from '../../hooks/useRole';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { format as formatDate } from 'date-fns';
import useMedia from './../../hooks/useMedia';
import axiosInstance from '../../services/axios';
import useMarketing from './../../hooks/useMarketing';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useEventCategory from '../../hooks/useEventCategory';
import useEvent from '../../hooks/useEvent';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import usePayment from './../../hooks/usePayment';
import ProcessRoleDeptModal from './../ProcessRole/DepartmentRole/index';
import useProcessRole from './../../hooks/useProcessRole';
import useDocument from './../../hooks/useDocument';
import useCollaborator from './../../hooks/useCollaborator';
import useNotification from './../../hooks/useNotification';
import useOrder from './../../hooks/useOrder';
import useSale from '../../hooks/useSale';
import useShare from './../../hooks/useShare';
import useSite from './../../hooks/useSite';
import FirebaseUpload from '../FloatingMenu/FirebaseUpload';
import useUniversity from './../../hooks/useUniversity';
import useCareer from '../../hooks/useCareer';
import useBanner from './../../hooks/useBanner';
import useCounsellingCategory from '../../hooks/useCounsellingCategory';

async function setFeatured(setFeaturedUrl, documentId, isFeatured) {
  return await axiosInstance
    .post(setFeaturedUrl, { outputtype: 'RawJson', id: documentId, value: isFeatured })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      else return false;
    });
}

async function setActive(setActiveUrl, documentId, isActive) {
  return await axiosInstance
    .post(setActiveUrl, { outputtype: 'RawJson', id: documentId, value: isActive })
    .then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      else return false;
    });
}

export default function GeneralTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setConfirmPopup } = useConfirmPopup();
  const { menu_buttons: menuButtons, columns: tableColumns } = useView();
  const [displayOptions, setDisplayOptions] = React.useState({});
  const { selectedFolder } = useSelector((state) => state.folder);
  const { selectedDocument } = useSelector((state) => state.document);
  const { selectedApp } = useSelector((state) => state.app);
  useEffect(() => {
    const initOptions = {
      id: tableColumns.includes('id'),
      image_url: tableColumns.includes('image_url'),
      career_title: tableColumns.includes('career_title'),
      list_title: tableColumns.includes('list_title'),
      order_number: tableColumns.includes('order_number'),
      title: tableColumns.includes('title'),
      voucher_code: tableColumns.includes('voucher_code'),
      card_code: tableColumns.includes('card_code'),
      card_serial: tableColumns.includes('card_serial'),
      description: tableColumns.includes('description'),
      fullname: tableColumns.includes('fullname'),
      department_name: tableColumns.includes('department_name'),
      department_parent: tableColumns.includes('department_parent'),
      number_member: tableColumns.includes('number_member'),
      university_name: tableColumns.includes('university'),
      university: tableColumns.includes('university_name'),
      email_address: tableColumns.includes('email_address'),
      number_phone: tableColumns.includes('number_phone'),
      career: tableColumns.includes('career'),
      assess: tableColumns.includes('assess'),
      schedule: tableColumns.includes('consultation_day'),
      link: false,
      status: tableColumns.includes('status'),
      role_template_name: tableColumns.includes('role_template_name'),
      apply_to_department_type: tableColumns.includes('apply_to_department_type'),
      approval_role: tableColumns.includes('approval_role'),
      visible_for_selection: tableColumns.includes('visible_for_selection'),
      active: tableColumns.includes('active'),
      matching_code: tableColumns.includes('matching_code'),
      mentee_email: tableColumns.includes('mentee_email'),
      mentee_name: tableColumns.includes('mentee_name'),
      mentor_email: tableColumns.includes('mentor_email'),
      mentor_name: tableColumns.includes('mentor'),
      rating: tableColumns.includes('rating'),
      total: tableColumns.includes('total'),
      reject: tableColumns.includes('reject'),
      completed: tableColumns.includes('completed'),
      uncomplete: tableColumns.includes('uncomplete'),
      note: tableColumns.includes('note'),
      account_id: tableColumns.includes('account_id'),
      full_name: tableColumns.includes('full_name'),
      code_id: tableColumns.includes('code_id'),
      batch_number: tableColumns.includes('batch_number'),
      type_collaborator: tableColumns.includes('type_collaborator'),
      used_date: tableColumns.includes('used_date'),
      expiration_date: tableColumns.includes('expiration_date'),
      amount: tableColumns.includes('amount'),
      duration: tableColumns.includes('duration'),
      episodes: tableColumns.includes('episodes'),
      created_date: tableColumns.includes('created_date'),
      created_by: tableColumns.includes('created_by'),
      category_code: tableColumns.includes('category_code'),
      category_name: tableColumns.includes('category_name'),
      address: tableColumns.includes('address'),
      price: tableColumns.includes('price'),
      online: tableColumns.includes('online'),
      available: tableColumns.includes('available'),
      cancel_by: tableColumns.includes('cancel_by'),
      menuButtons: !!menuButtons.length || false,
      is_used: tableColumns.includes('is_used'),
      type: tableColumns.includes('type'),
      order_code: tableColumns.includes('order_code'),
      order_title: tableColumns.includes('order_title'),
      payment_type_display: tableColumns.includes('payment_type_display'),
      total_order: tableColumns.includes('total_order'),
      university_code: tableColumns.includes('university_code'),
      discount_amount: tableColumns.includes('discount_amount'),
      final_total: tableColumns.includes('final_total'),
      status_display: tableColumns.includes('status_display'),
      is_featured: tableColumns.includes('is_featured'),
      is_active: tableColumns.includes('is_active'),
      scheduled_datetime: tableColumns.includes('scheduled_datetime'),
      is_completed: tableColumns.includes('is_completed'),
      landing_page_name: tableColumns.includes('landing_page_name'),
    };
    setDisplayOptions(initOptions);
  }, [tableColumns, selectedFolder]);

  const buttonAccountCreate = menuButtons.find((button) => button.name === view.user.list.create);
  const buttonDeptCreate = menuButtons.find((button) => button.name === view.department.list.create);
  const buttonDeptUpdate = menuButtons.find((button) => button.name === view.department.list.update);
  const buttonDeptAddUser = menuButtons.find((button) => button.name === view.department.list.adduser);
  const buttonDeptRemoveUser = menuButtons.find((button) => button.name === view.department.list.removeaccount);
  const buttonSyncDepartment = menuButtons.find((button) => button.name === view.department.list.syncDept);
  const buttondeactiveDepartment = menuButtons.find((button) => button.name === view.department.list.deactive);
  const buttonCreateRole = menuButtons.find((button) => button.name === view.role.list.create);
  const buttonCreatePodcast = menuButtons.find((button) => button.name === view.podcast.list.create);
  const buttonCreateEpisode = menuButtons.find((button) => button.name === view.episode.list.create);
  const buttonCreatePlaylist = menuButtons.find((button) => button.name === view.playlist.list.create);
  const buttonCreatePartner = menuButtons.find((button) => button.name === view.partner.list.create);
  const buttonCreatePartnerCategory = menuButtons.find((button) => button.name === view.partner_category.list.create);
  const buttonCreateMentor = menuButtons.find((button) => button.name === view.mentor.list.create);
  const buttonImportMentor = menuButtons.find((button) => button.name === view.mentor.list.importData);
  const buttonCreateMentorList = menuButtons.find((button) => button.name === view.mentorlist.list.create);
  const buttonBookingMeeting = menuButtons.find((button) => button.name === view.counselling.list.meeting);
  const buttonBookingReview = menuButtons.find((button) => button.name === view.counselling.list.review);
  const buttonBookingNote = menuButtons.find((button) => button.name === view.counselling.list.note);
  const buttonBookingCancel = menuButtons.find((button) => button.name === view.counselling.list.cancel);
  const buttonDownloadData = menuButtons.find((button) => button.name === view.counselling.list.download);
  const buttonCreateEvent = menuButtons.find((button) => button.name === view.event.list.create);
  const buttonCreateEventCategory = menuButtons.find((button) => button.name === view.eventcategory.list.create);
  const buttonCreateBatch = menuButtons.find((button) => button.name === view.batch.list.create);
  const buttonSendEmail = menuButtons.find((button) => button.name === view.batch.list.send_email);
  const buttonAssignVoucher = menuButtons.find((button) => button.name === view.voucher.list.assign);
  const butttonCreateCardBatch = menuButtons.find((button) => button.name === view.prepaidcardbatch.list.create);
  const buttonSendEmailCard = menuButtons.find((button) => button.name === view.prepaidcardbatch.list.send_email);
  const buttonAssignCard = menuButtons.find((button) => button.name === view.prepaidcard.list.assign);
  const buttonCreateProcessRole = menuButtons.find((button) => button.name === view.processrole.list.create);
  const buttonUpdateProcessRole = menuButtons.find((button) => button.name === view.processrole.list.update);
  const buttonUpdateDeptRole = menuButtons.find((button) => button.name === view.processrole.list.update_dept_role);
  const buttonRemoveDeptRole = menuButtons.find((button) => button.name === view.processrole.list.removedept);
  const buttonRemoveAccountRole = menuButtons.find((button) => button.name === view.processrole.list.removeaccount);
  const buttonAddDeptRole = menuButtons.find((button) => button.name === view.processrole.list.adddept);
  const buttonAddAccountRole = menuButtons.find((button) => button.name === view.processrole.list.adduser);
  const buttonSyncRole = menuButtons.find((button) => button.name === view.processrole.list.syncRole);
  const buttonCreateFile = menuButtons.find((button) => button.name === view.file.list.create);
  const buttonCreateFileCategory = menuButtons.find((button) => button.name === view.fileCategory.list.create);
  const buttonCreateFileType = menuButtons.find((button) => button.name === view.fileType.list.create);
  const buttonCreateUniversity = menuButtons.find((button) => button.name === view.university.list.create);
  const buttonCreateNotificationCategory = menuButtons.find(
    (button) => button.name === view.notificationCategory.list.create
  );
  const buttonCreateNotificationMessage = menuButtons.find(
    (button) => button.name === view.notificationMessage.list.create
  );
  const buttonCreateCounsellingPrice = menuButtons.find((button) => button.name === view.counsellingPrice.list.create);
  const buttonCreateBroadcast = menuButtons.find((button) => button.name === view.broadcast.list.create);
  const buttonCreateNews = menuButtons.find((button) => button.name === view.news.list.create);
  const buttonCreateLandingPage = menuButtons.find((button) => button.name === view.landingPage.list.create);
  const buttonCreateNewsCategory = menuButtons.find((button) => button.name === view.newsCategory.list.create);
  const buttonCreateCareer = menuButtons.find((button) => button.name === view.career.list.create);
  const buttonCreateCareerList = menuButtons.find((button) => button.name === view.careerlist.list.create);
  const buttonCreateUniversityList = menuButtons.find((button) => button.name === view.university.list.create_list);
  const buttonCreateBanner = menuButtons.find((button) => button.name === view.banner.list.create);
  const buttonCreateBannerList = menuButtons.find((button) => button.name === view.bannerList.list.create);
  const buttonCreateNewsList = menuButtons.find((button) => button.name === view.newsList.list.create);
  const buttonCreateNewCareerCategory = menuButtons.find((button) => button.name === view.careerCategory.list.create);
  const buttonCreateNewQnA = menuButtons.find((button) => button.name === view.qna.list.create);
  // const buttonCreateNewCounsellingCategory = menuButtons.find((button) => button.name === view.counsellingCategory.list.create);
  const buttonExportUEBLIST = menuButtons.find((button) => button.name === view.contest.list.ueb);


  const [isOpenModalNote, setIsOpenModalNote] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState({});
  const { url, documentType, tableTitle, setFeaturedUrl, setActiveUrl } = props;
  const [pageCurrent, setPage] = React.useState(1);
  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const [roletemplateList, setRoleList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [deptList, setDeptList] = React.useState([]);
  const reduxDocuments = useSelector((state) => state.task);
  const [openFireBase, setOpenFireBase] = React.useState(false);
  const [changeDeptReload, ReloadDept] = React.useState(0);
  const { getProcessDetail, addDeptUser, removeUser, removeDept, syncProcessRole } = useProcessRole();
  const { getCareerDetail, getCareerDetailList, getCareerCategoryDetail } = useCareer();
  const [snackbarStatus, setSnackbarStatus] = React.useState({
    isOpen: false,
    type: '',
    text: '',
  });
  const {
    documents = [],
    total_item: count = 0,
    page = 1,
    order_by = '',
    order_type = 'desc',
    no_item_per_page = 10,
    category_id = '',
    search_text = '',
    folder_id,
    project_id,
    from_date = '',
    to_date = '',
    status = '',
    department_code = '',
    role_template_code = '',
    process_role_code = '',
  } = reduxDocuments[documentType] || {};
  const [department_code_selected, setSelectedDepartment] = React.useState('');
  const [role_template_selected, setSelectedRoleTemplate] = React.useState('Member');
  const [process_role_code_selected, setSelectedProcessRole] = React.useState('');
  const defaultQueries = {
    page: 1,
    order_by,
    order_type,
    no_item_per_page,
    category_id,
    search_text: '',
    from_date: getTodayAndTomorrow(Date.now()).today,
    to_date: getTodayAndTomorrow(Date.now()).tomorrow,
    university_id: '',
    status: '',
    career: '',
    department_code: department_code_selected,
    role_template_code: role_template_selected,
    process_role_code: process_role_code_selected,
  };

  const { getDocuments } = useTask();

  const {
    getBookingDetail,
    approveBooking,
    reviewBooking,
    setNoteBooking,
    setCompletedBooking,
    getListUniversity,
    cancelBooking,
    downloadData,
  } = useBooking();

  const { activeDepartment, getDepartmentDetail, getAllDepartment } = useDepartment();

  const {
    activeRole,
    getRoleDetail,
    getDepartmentListGroup,
    addAccountToGroup,
    removeAccountToGroup,
    syncRole,
    getRoletemplateByDept,
  } = useRole();

  const { getAccountDetail, activeAccount, getAllUserByDept, assignAccount, removeAccount, getAllUser } = useAccount();
  const {
    getMentorDetail,
    toggleActiveMentor,
    getMentorListDetail,
    getPartnerDetail,
    getPartnerCategoryDetail,
    importMentor,
  } = usePartner();
  const { getPodcastDetail, getEpisodeDetail, getPlaylistDetail } = useMedia();
  const { getBatchDetail, sendEmailVoucher, exportUEB } = useMarketing();
  const { getEventCategoryDetail } = useEventCategory();
  const { getEventDetail } = useEvent();
  const { getCardBatchDetail, sendEmailCard } = usePayment();
  const { getFileDetail, getFileCategoryDetail, getFileTypeDetail } = useDocument();
  const { getDetail } = useCollaborator();
  const { getDetailNotificatonCategory, getDetailNotificatonMessage } = useNotification();
  const { getUniversityDetail, getUniversityListDetail } = useUniversity();
  const { getOrderDetail } = useOrder();
  const { getDetailPrice } = useSale();
  const { getBroadcastDetail } = useShare();
  const [urlexcel, setURLLink] = React.useState('');

  const { getNewsDetail, getLandingPageDetail, getNewsCategoryDetail, getNewsListDetail, getQnADetail } = useSite();
  const { getBannerDetail, getBannerListDetail } = useBanner();
  const { getCounsellingCategoryDetail } = useCounsellingCategory();

  useEffect(() => {
    if (selectedProject && selectedFolder && url) {
      fetchDocument(url, documentType, selectedProject.id, selectedFolder.id);
    } else {
      dispatch({
        type: TASK_CHANGE,
        documentType,
        documents: [],
        total_item: count,
        page,
        order_by,
        order_type,
        no_item_per_page,
        search_text,
        category_id,
        folder_id,
        project_id,
        from_date,
        to_date,
      });
    }
  }, [selectedFolder]);
  useEffect(() => {
    if (documentType === 'department' && department_code_selected !== '') {
      const fetchRoleList = async () => {
        let data = await getRoletemplateByDept(department_code_selected);
        setRoleList(data);
      };

      fetchRoleList();
      reloadCurrentDocuments();
    }
  }, [department_code_selected]);

  useEffect(() => {
    const fetchUserList = async () => {
      let data = await getAllUser();
      setUserList(data);
      data = await getAllDepartment();
      setDeptList(data);
    };
    if (documentType === 'department') {
      fetchUserList();
    }
  }, []);

  useEffect(() => {
    if (selectedDocument === null && documents?.length > 0) {
      reloadCurrentDocuments(page);
    }
    if (changeDeptReload === 0) {
      ReloadDept(1);
    } else {
      ReloadDept(0);
    }
  }, [selectedDocument, process_role_code_selected]);

  const fetchDocument = (additionalQuery) => {
    const queries = { ...defaultQueries, ...additionalQuery };
    console.log(additionalQuery);
    getDocuments(url, documentType, selectedProject?.id, selectedFolder?.id, queries);
  };

  const handleAssignAccount = async (user) => {
    if (!!user && !!department_code_selected && role_template_selected) {
      let data = await assignAccount({
        email_address: user.email_address,
        department_code: department_code_selected,
        role_template_code: role_template_selected,
      });
      reloadCurrentDocuments();
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn phòng ban, chức vụ, tài khoản trước khi thao tác',
        action: null,
        payload: null,
        onSuccess: clickSuccess,
      });
    }
  };
  const handleAddDeptUser = async (email_address, department_code) => {
    await addDeptUser(process_role_code_selected, department_code, email_address);
    reloadCurrentDocuments();
  };
  const handleRemoveAccount = async (email) => {
    await removeAccount({
      email_address: email,
      department_code: department_code_selected,
      role_template_code: role_template_selected,
    });
    reloadCurrentDocuments();
  };

  const handleRequestSort = (property) => {
    const isAsc = order_by === property && order_type === 'asc';

    fetchDocument({
      url,
      documentType,
      project_id,
      folder_id,
      page: 1,
      order_by: property,
      order_type: isAsc ? 'desc' : 'asc',
      no_item_per_page,
      category_id,
      search_text,
      department_code: department_code_selected,
      role_template_code: role_template_selected,
      process_role_code: process_role_code_selected,
    });
    setPage(1);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = documents.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handlePressEnterToSearch = (text) => {
    fetchDocument({ search_text: text });
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    let page = newPage + 1;
    fetchDocument({ page: page, search_text });
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchDocument({ page: 1, no_item_per_page: event.target.value, search_text });
    setPage(1);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const openDetailDocument = async (event, selectedDocument) => {
    event.stopPropagation();
    let detailDocument = null;
    if (documentType === 'booking') {
      detailDocument = await getBookingDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'account') {
      detailDocument = await getAccountDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: true });
    } else if (documentType === 'mentor') {
      detailDocument = await getMentorDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, mentorDocument: true });
    } else if (documentType === 'role') {
      detailDocument = await getRoleDetail(selectedDocument.role_template_id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'podcast') {
      detailDocument = await getPodcastDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, podcastDocument: true });
    } else if (documentType === 'episode') {
      detailDocument = await getEpisodeDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, episodeDocument: true });
    } else if (documentType === 'playlist') {
      detailDocument = await getPlaylistDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, playlistDocument: true });
    } else if (documentType === 'batch') {
      detailDocument = await getBatchDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, batchDocument: true });
    } else if (documentType === 'eventcategory') {
      detailDocument = await getEventCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, eventcategoryDocument: true });
    } else if (documentType === 'event') {
      detailDocument = await getEventDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, eventDocument: true });
    } else if (documentType === 'mentorlist') {
      detailDocument = await getMentorListDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, mentorListDocument: true });
    } else if (documentType === 'cardbatch') {
      detailDocument = await getCardBatchDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, cardBatchDocument: true });
    } else if (documentType === 'partner') {
      detailDocument = await getPartnerDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, partnerDocument: true });
    } else if (documentType === 'partner_category') {
      detailDocument = await getPartnerCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, partnerCategoryDocument: true });
    } else if (documentType === 'file') {
      detailDocument = await getFileDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, fileDocument: true });
    } else if (documentType === 'fileCategory') {
      detailDocument = await getFileCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, fileCategoryDocument: true });
    } else if (documentType === 'fileType') {
      detailDocument = await getFileTypeDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, fileTypeDocument: true });
    } else if (documentType === 'collaborator') {
      detailDocument = await getDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'notificationCategory') {
      detailDocument = await getDetailNotificatonCategory(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, notificationCategoryDocument: true });
    } else if (documentType === 'notificationMessage') {
      detailDocument = await getDetailNotificatonMessage(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, notificationMessageDocument: true });
    } else if (documentType === 'order') {
      detailDocument = await getOrderDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'counsellingPrice') {
      detailDocument = await getDetailPrice(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, counsellingPriceDocument: true });
    } else if (documentType === 'departmentList') {
      detailDocument = await getDepartmentDetail(selectedDocument.department_code);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'broadcast') {
      detailDocument = await getBroadcastDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, broadcastDocument: true });
    } else if (documentType === 'news') {
      detailDocument = await getNewsDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, newsDocument: true });
    } else if (documentType === 'landingPage') {
      detailDocument = await getLandingPageDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, landingPageDocument: true });
    } else if (documentType === 'newsCategory') {
      detailDocument = await getNewsCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, newsCategoryDocument: true });
    } else if (documentType === 'university') {
      detailDocument = await getUniversityDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'universitylist') {
      detailDocument = await getUniversityListDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'career') {
      detailDocument = await getCareerDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'careerlist') {
      detailDocument = await getCareerDetailList(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'banner') {
      detailDocument = await getBannerDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, bannerDocument: true });
    } else if (documentType === 'bannerList') {
      detailDocument = await getBannerListDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, bannerListDocument: true });
    } else if (documentType === 'newsList') {
      detailDocument = await getNewsListDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, newsListDocument: true });
    } else if (documentType === 'careerCategory') {
      detailDocument = await getCareerCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'counsellingCategory') {
      detailDocument = await getCounsellingCategoryDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, counsellingCategoryDocument: true });
    } else if (documentType === 'qna') {
      detailDocument = await getQnADetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, qnaDocument: true });
    }
  };

  const openDialogCreate = () => {
    if (documentType === 'account') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: true });
    } else if (documentType === 'department') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, departmentDocument: true });
    } else if (documentType === 'role') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'university') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'career') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'careerlist') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'universitylist') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'careerCategory') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'counsellingCategory') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    } else if (documentType === 'qna') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
    }
  };

  const handleUpdateDepartment = async () => {
    if (department_code_selected !== '') {
      let detailDocument = await getDepartmentDetail(department_code_selected);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, departmentDocument: true });
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn phòng ban trước khi thao tác',
        action: null,
        payload: null,
        onSuccess: clickSuccess,
      });
    }
  };
  const handleDeactiveDepartment = async () => {
    if (department_code_selected !== '') {
      let detailDocument = await activeDepartment({ department_code: department_code_selected, is_active: false });
      setSelectedDepartment('');
      reloadCurrentDocuments();
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn phòng ban trước khi thao tác',
        action: null,
        payload: null,
        onSuccess: clickSuccess,
      });
    }
  };

  const reloadCurrentDocuments = (page = 1) => {
    setSelected([]);
    fetchDocument({ page: pageCurrent });
  };

  const showConfirmPopup = ({
    title = 'Thông báo',
    message = 'Yêu cầu lựa chọn ít nhất một bản ghi',
    action = null,
    payload = null,
    onSuccess = null,
  }) => {
    setConfirmPopup({ type: CONFIRM_CHANGE, open: true, title, message, action, payload, onSuccess });
  };

  const handleOpenModal = (type, booking) => {
    setSelected((pre) => [...new Set([booking.id, ...pre])]);
    setSelectedRecord(booking);
    if (type === 'note') {
      setIsOpenModalNote(true);
    } else {
      setIsOpenModal(true);
      setModalType(type);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(selected[0]);
    } catch (e) {
    } finally {
      setIsOpenModal(false);
      setModalType('');
      reloadCurrentDocuments();
    }
  };

  const handleReviewBooking = async (data) => {
    try {
      await reviewBooking(selected[0], data.status);
    } catch (e) {
    } finally {
      setIsOpenModal(false);
      setModalType('');
      reloadCurrentDocuments();
    }
  };

  const handleApproveBooking = async (id) => {
    showConfirmPopup({
      message: `Bạn chắc chắn muốn xác nhận đăng ký ${id} ?`,
      action: approveBooking,
      payload: id,
      onSuccess: reloadCurrentDocuments,
    });
  };

  const handleSetCompletedBooking = async (id) => {
    showConfirmPopup({
      message: `Bạn chắc chắn xử lý đăng ký ${id} ?`,
      action: setCompletedBooking,
      payload: id,
      onSuccess: reloadCurrentDocuments,
    });
  };

  const toggleSetActiveAccount = async (event, email_address, is_active) => {
    event.stopPropagation();
    await activeAccount({
      email_address: email_address,
      is_active: is_active,
    });
    reloadCurrentDocuments();
  };

  const toggleSetActiveRole = async (event, id, is_active) => {
    event.stopPropagation();
    await activeRole({
      id,
      is_active,
    });
    reloadCurrentDocuments();
  };

  const toggleSetDepartment = async (event, department_code, is_active) => {
    event.stopPropagation();
    await activeDepartment({
      department_code: department_code,
      is_active: is_active,
    });
    reloadCurrentDocuments();
  };

  const handleToggleActiveMentor = async (event, id) => {
    event.stopPropagation();
    await toggleActiveMentor({
      id,
      is_active: event.target.checked,
    });
    reloadCurrentDocuments();
  };

  const handleNoteBooking = async (note, isSend) => {
    try {
      await setNoteBooking(selected[0], note, isSend);
    } catch (e) {
    } finally {
      setIsOpenModalNote(false);
      reloadCurrentDocuments();
    }
  };

  const handleRemoveAccountToGroup = async (email_address, group_name_list, account_id) => {
    try {
      await removeAccountToGroup(group_name_list, account_id, email_address);
    } catch (e) {
    } finally {
      reloadCurrentDocuments();
    }
  };
  const handleRemoveAccountToRole = async (email_address) => {
    try {
      await removeUser(process_role_code_selected, email_address);
      reloadCurrentDocuments();
    } catch (e) {
    } finally {
    }
  };
  const handleRemoveDeptToRole = async (department_code) => {
    try {
      await removeDept(process_role_code_selected, department_code);
      if (changeDeptReload === 0) {
        ReloadDept(1);
      } else {
        ReloadDept(0);
      }
    } catch (e) {
    } finally {
    }
  };

  const handleShowColumn = (id, newState) => {
    setDisplayOptions((pre) => ({ ...pre, [id]: newState }));
  };

  const [group_name, setGroup] = React.useState();
  const handleFilterChange = (data) => {
    fetchDocument(data);
    setGroup(data.group_id);
  };

  const getStatusType = (type) => {
    const statusListLabel = [...bookingStatusList];
    const index = statusListLabel.findIndex((item) => item === type.trim());
    return `styleStatus${index + 1}`;
  };

  const formatDateTime = (datetime) => {
    if (datetime) {
      const date = new Date(datetime);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      );
    }
    return '';
  };

  const handleClickCreateMentor = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, mentorDocument: true });
  };

  const handleClickCreatePodcast = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, podcastDocument: true });
  };

  const handleClickCreateEpisode = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, episodeDocument: true });
  };

  const handleClickCreatePlaylist = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, playlistDocument: true });
  };
  const handleClickCreateEvent = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, eventDocument: true });
  };
  const handleClickCreateEventCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, eventcategoryDocument: true });
  };

  const handleClickAssignVoucher = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, voucherDocument: true });
  };

  const handleClickCreateBatch = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, batchDocument: true });
  };

  const handleClickMentorList = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, mentorListDocument: true });
  };

  const handleClickCreatePartner = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, partnerDocument: true });
  };

  const handleClickCreatePartnerCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, partnerCategoryDocument: true });
  };

  const handleClickAssignCard = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, cardDocument: true });
  };

  const handleClickCreateCardBatch = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, cardBatchDocument: true });
  };

  const handleClickCreateProcessRole = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
  };

  const handleClickCreateNotificationCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, notificationCategoryDocument: true });
  };

  const handleClickCreateNotificationMessage = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, notificationMessageDocument: true });
  };

  const handleClickCreateCounsellingPrice = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, counsellingPriceDocument: true });
  };
  const handleClickDownloadData = async () => {
    const url = await downloadData();
    if (url === '') return;
    downloadFile(url);
  };

  const handleClickProcessRoleDetail = async () => {
    if (process_role_code_selected !== '') {
      let detailDocument = await getProcessDetail(process_role_code_selected);
      if (!detailDocument) {
        showConfirmPopup({
          title: 'Thông báo',
          message: 'Yêu cầu lựa chọn process role trước khi thực hiện thao tác',
          action: null,
          payload: null,
          onSuccess: clickSuccess,
        });
      } else {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
      }
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn process role trước khi thực hiện thao tác',
        action: null,
        payload: null,
        onSuccess: clickSuccess,
      });
    }
  };

  const handleClickUpdateUserProcessRole = () => {
    if (process_role_code_selected != '') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, processUserDocument: true, processrolecode: process_role_code_selected });
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn process role',
        action: null,
        payload: null,
        onSuccess: null,
      });
    }
  };

  const handleClickUpdateDeptProcessRole = () => {
    if (process_role_code_selected != '') {
      dispatch({ type: DOCUMENT_CHANGE, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, processDeptDocument: true, processrolecode: process_role_code_selected });
    } else {
      showConfirmPopup({
        title: 'Thông báo',
        message: 'Yêu cầu lựa chọn process role',
        action: null,
        payload: null,
        onSuccess: null,
      });
    }
  };

  const handleClickCreateFile = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, fileDocument: true });
  };

  const handleClickCreateFileCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, fileCategoryDocument: true });
  };

  const handleClickCreateFileType = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, fileTypeDocument: true });
  };

  const handleClickCreateBroadcast = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, broadcastDocument: true });
  };

  const handleClickCreateNews = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, newsDocument: true });
  };

  const handleClickCreateLandingPage = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, landingPageDocument: true });
  };

  const handleClickCreateNewsCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, newsCategoryDocument: true });
  };
  const handleClickCreateBanner = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, bannerDocument: true });
  };

  const handleClickCreateBannerList = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, bannerListDocument: true });
  };

  const handleClickCreateNewsList = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, newsListDocument: true });
  };
  const exportUEBData = async () => {
    let data = await exportUEB(search_text);
    if (data != '') {
      window.open(data, '_blank', 'noreferrer');
    }
  };
  const handleClickCreateQnA = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, qnaDocument: true });
  };

  
  const handleClickCreateNewCounsellingCategory = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, counsellingCategoryDocument: true });
  };

  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSetFeatured = async (event, document, isFeatured) => {
    event.stopPropagation();
    await setFeatured(setFeaturedUrl, document.id, isFeatured);
    fetchDocument();
  };

  const toggleSetActive = async (event, document, isActive) => {
    event.stopPropagation();
    await setActive(setActiveUrl, document.id, isActive);
    fetchDocument();
  };

  const handleClickSendEmail = async (id) => {
    if (documentType === 'batch') {
      showConfirmPopup({
        message: `Bạn chắc chắn muốn gửi Voucher vào email ?`,
        action: sendEmailVoucher,
        payload: id,
        onSuccess: reloadCurrentDocuments,
      });
    }
    if (documentType === 'cardbatch') {
      showConfirmPopup({
        message: `Bạn chắc chắn muốn gửi Prepaid Card vào email ?`,
        action: sendEmailCard,
        payload: id,
        onSuccess: reloadCurrentDocuments,
      });
    }
  };

  const handleSyncRole = async () => {
    showConfirmPopup({
      message: `Xác nhận đồng bộ ?`,
      action: syncRole,
      payload: null,
      onSuccess: reloadCurrentDocuments,
    });
  };
  const setURL = (url) => {
    setOpenFireBase(false);
    setIsOpenModal(true);
    setURLLink(url);
    setModalType('importdata');
  };
  const handleCloseDiaLog = () => {
    setOpenFireBase(false);
  };

  const handleOpen = () => {
    setOpenFireBase(true);
  };
  const handleImportData = async () => {
    let check = await importMentor(urlexcel);

    setIsOpenModal(false);
    if (check) {
      setSnackbarStatus({ isOpen: true, type: 'success', text: 'Cập nhật dự liệu thành công' });
    } else {
      setSnackbarStatus({ isOpen: true, type: 'error', text: 'Cập nhật dự liệu lỗi' });
    }
  };
  const handleSyncProcessRole = async () => {
    showConfirmPopup({
      message: `Xác nhận đồng bộ ?`,
      action: syncProcessRole,
      payload: null,
      onSuccess: reloadCurrentDocuments,
    });
  };
  const handleSplitImage = (image_url) => {
    try {
      var index = image_url.indexOf('drive.google.com');
      if (index > -1) {
        index = image_url.indexOf('id=');
        if (index > -1) {
          return 'https://drive.google.com/uc?export=view&id=' + image_url.split('id=')[1];
        } else {
          return 'https://drive.google.com/uc?export=view&id=' + image_url.split('/d/')[1].split('/view')[0];
        }
      } else return image_url;
    } catch {
      return image_url;
    }
  };
  const clickSuccess = () => {};
  
  useEffect(() => {
    if (!selectedApp?.element_id) return;
    const fetch = async () => {
      if (documentType === 'careerlist') {
        var detailDocument = await getCareerDetailList(selectedApp?.element_id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
      } else if (documentType === 'newsList') {
        var detailDocument = await getNewsListDetail(selectedApp?.element_id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, newsListDocument: true });
      } else if (documentType === 'bannerList') {
        detailDocument = await getBannerListDetail(selectedDocument.id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, bannerListDocument: true });
      } else if (documentType === 'universitylist') {
        detailDocument = await getUniversityListDetail(selectedDocument.id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
      } else if (documentType === 'playlist') {
        detailDocument = await getPlaylistDetail(selectedDocument.id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, playlistDocument: true });
      } else if (documentType === 'mentorlist') {
        detailDocument = await getMentorListDetail(selectedDocument.id);
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, mentorListDocument: true });
      }
    };

    if (selectedApp.element_id === 'create') {
      if (documentType === 'careerlist') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
      } else if (documentType === 'newsList') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, newsListDocument: true });
      } else if (documentType === 'bannerList') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, bannerListDocument: true });
      } else if (documentType === 'universitylist') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
      } else if (documentType === 'playlist') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, playlistDocument: true });
      } else if (documentType === 'mentorlist') {
        dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType });
        dispatch({ type: FLOATING_MENU_CHANGE, mentorListDocument: true });
      }
    } else fetch();
  }, [selectedApp]);
  return (
    <React.Fragment>
      {isOpenModalNote && (
        <NoteModal
          isOpen={isOpenModalNote}
          isList={true}
          handleClose={() => setIsOpenModalNote(false)}
          handleSubmit={handleNoteBooking}
          selectedBooking={selectedRecord}
        />
      )}
      {snackbarStatus.isOpen && (
        <>
          <Portal>
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
          </Portal>
        </>
      )}
      <FirebaseUpload
        open={openFireBase || false}
        onSuccess={setURL}
        onClose={handleCloseDiaLog}
        folder="ExcelMentor"
        type="excel"
      />
      <Modal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        type={modalType}
        handleCancel={handleCancelBooking}
        handleReview={handleReviewBooking}
        handleImportData={handleImportData}
        selectedBooking={selected[0]}
      />

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} style={style.tableTitleWrap}>
          <Grid item xs={6}>
            <div style={style.tableTitle}>{tableTitle}</div>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                tableTitle={tableTitle}
                handlePressEnterToSearch={handlePressEnterToSearch}
                handleFilterChange={handleFilterChange}
                handleShowColumn={handleShowColumn}
                displayOptions={displayOptions}
                data={stableSort(documents || [], getComparator(order, orderBy))}
                getListUniversity={getListUniversity}
                btnCreateNewAccount={buttonAccountCreate}
                createNewAccount={openDialogCreate}
                handleSyncRole={handleSyncRole}
                handleAssignAccount={handleAssignAccount}
                btnCreateNewDept={buttonDeptCreate}
                buttonDeptUpdate={buttonDeptUpdate}
                buttondeactiveDepartment={buttondeactiveDepartment}
                buttonDeptAddUser={buttonDeptAddUser}
                roletemplateList={roletemplateList}
                userList={userList}
                deptList={deptList}
                createNewDept={openDialogCreate}
                buttonCreateRole={buttonCreateRole}
                createNewRole={openDialogCreate}
                getDepartmentList={getDepartmentListGroup}
                buttonSyncDepartment={buttonSyncDepartment}
                handleUpdateDepartment={handleUpdateDepartment}
                handleDeactiveDepartment={handleDeactiveDepartment}
                syncRole={syncRole}
                buttonCreatePodcast={buttonCreatePodcast}
                createPodcast={handleClickCreatePodcast}
                buttonCreateEpisode={buttonCreateEpisode}
                createEpisode={handleClickCreateEpisode}
                buttonCreatePlaylist={buttonCreatePlaylist}
                createPlaylist={handleClickCreatePlaylist}
                buttonCreateMentor={buttonCreateMentor}
                createMentor={handleClickCreateMentor}
                buttonCreateEvent={buttonCreateEvent}
                createEvent={handleClickCreateEvent}
                buttonCreateEventCategory={buttonCreateEventCategory}
                createEventCategory={handleClickCreateEventCategory}
                buttonCreateBatch={buttonCreateBatch}
                createBatch={handleClickCreateBatch}
                buttonAssignVoucher={buttonAssignVoucher}
                assignVoucher={handleClickAssignVoucher}
                buttonCreateMentorList={buttonCreateMentorList}
                createMentorList={handleClickMentorList}
                buttonCreatePartner={buttonCreatePartner}
                createPartner={handleClickCreatePartner}
                buttonCreatePartnerCategory={buttonCreatePartnerCategory}
                createPanertCategory={handleClickCreatePartnerCategory}
                buttonCreateCardBatch={butttonCreateCardBatch}
                createCardBatch={handleClickCreateCardBatch}
                buttonAssignCard={buttonAssignCard}
                assignCard={handleClickAssignCard}
                department_code_selected={department_code_selected}
                setSelectedRoleTemplate={setSelectedRoleTemplate}
                buttonCreateProcessRole={buttonCreateProcessRole}
                createNewProcessRole={handleClickCreateProcessRole}
                buttonUpdateProcessRole={buttonUpdateProcessRole}
                buttonUpdateDeptRole={buttonUpdateDeptRole}
                setSelectedDepartment={setSelectedDepartment}
                handleClickProcessRoleDetail={handleClickProcessRoleDetail}
                handleAddDeptUser={handleAddDeptUser}
                handleClickUpdateUserProcessRole={handleClickUpdateUserProcessRole}
                handleClickUpdateDeptProcessRole={handleClickUpdateDeptProcessRole}
                buttonAddDeptRole={buttonAddDeptRole}
                buttonAddAccountRole={buttonAddAccountRole}
                buttonSyncRole={buttonSyncRole}
                handleSyncProcessRole={handleSyncProcessRole}
                buttonCreateFile={buttonCreateFile}
                createFile={handleClickCreateFile}
                buttonCreateFileCategory={buttonCreateFileCategory}
                createFileCategory={handleClickCreateFileCategory}
                buttonCreateFileType={buttonCreateFileType}
                createFileType={handleClickCreateFileType}
                buttonCreateNotificationCategory={buttonCreateNotificationCategory}
                createNotificationCategory={handleClickCreateNotificationCategory}
                buttonCreateNotificationMessage={buttonCreateNotificationMessage}
                createNotificationMessage={handleClickCreateNotificationMessage}
                buttonCreateCounsellingPrice={buttonCreateCounsellingPrice}
                CreateCounsellingPrice={handleClickCreateCounsellingPrice}
                buttonCreateBroadcast={buttonCreateBroadcast}
                createBroadcast={handleClickCreateBroadcast}
                buttonDownloadData={buttonDownloadData}
                downloadData={handleClickDownloadData}
                buttonCreateNews={buttonCreateNews}
                createNews={handleClickCreateNews}
                buttonCreateLandingPage={buttonCreateLandingPage}
                createLandingPage={handleClickCreateLandingPage}
                buttonCreateNewsCategory={buttonCreateNewsCategory}
                createNewsCategory={handleClickCreateNewsCategory}
                buttonCreateUniversity={buttonCreateUniversity}
                createUniversity={openDialogCreate}
                buttonCreateCareer={buttonCreateCareer}
                buttonCreateCareerList={buttonCreateCareerList}
                buttonCreateUniversityList={buttonCreateUniversityList}
                buttonCreateBanner={buttonCreateBanner}
                createBanner={handleClickCreateBanner}
                buttonCreateBannerList={buttonCreateBannerList}
                createBannerList={handleClickCreateBannerList}
                buttonCreateNewsList={buttonCreateNewsList}
                createNewsList={handleClickCreateNewsList}
                buttonCreateNewCareerCategory={buttonCreateNewCareerCategory}
                buttonImportMentor={buttonImportMentor}
                buttonCreateNewQnA={buttonCreateNewQnA}
                createNewQnA={handleClickCreateQnA}
                // buttonCreateNewCounsellingCategory={buttonCreateNewCounsellingCategory}
                // createNewCounsellingCategory={handleClickCreateNewCounsellingCategory}
                openFireBase={handleOpen}
                buttonExportUEBLIST={buttonExportUEBLIST}
                exportUEBData={exportUEBData}
              />
              <Grid container spacing={gridSpacing}>
                {(documentType === 'department' || documentType === 'processrole') && (
                  <Grid item xs={4}>
                    <TreeViewModal
                      setSelectedDepartment={setSelectedDepartment}
                      setSelectedProcessRole={setSelectedProcessRole}
                      documents={documents}
                      documentType={documentType}
                    />
                  </Grid>
                )}
                {documentType === 'processrole' && (
                  <Grid item xs={4}>
                    <ProcessRoleDeptModal
                      process_role_code_selected={process_role_code_selected}
                      handleRemoveDept={handleRemoveDeptToRole}
                      buttonRemoveDeptRole={buttonRemoveDeptRole}
                      changeDeptReload={changeDeptReload}
                    />
                  </Grid>
                )}
                <Grid item xs={documentType === 'department' ? 8 : documentType === 'processrole' ? 4 : 12}>
                  <TableContainer>
                    <Table
                      stickyHeader
                      className={
                        documentType === 'department'
                          ? classes.table2
                          : documentType === 'processrole'
                          ? classes.table3
                          : classes.table
                      }
                      aria-labelledby="tableTitle"
                      size={'medium'}
                      // aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order_type}
                        orderBy={order_by}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={documents?.length}
                        displayOptions={displayOptions}
                        documentType={documentType}
                      />
                      <TableBody>
                        {stableSort(documents || [], getComparator(order, orderBy)).map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              className={classes.tableRow}
                              hover
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id || row.account_id || row.department_code || row.role_template_id}
                              selected={isItemSelected}
                            >
                              {documentType !== 'department' && documentType !== 'processrole' && (
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    onClick={(event) => handleClick(event, row.id)}
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </TableCell>
                              )}

                              {displayOptions.id && (
                                <TableCell align="left">
                                  <div
                                    className={classes.tableItemID}
                                    onClick={(event) => openDetailDocument(event, row)}
                                  >
                                    <div>{row.case_number}</div>
                                    <div>{formatDateTime(row.created_date)}</div>
                                  </div>
                                </TableCell>
                              )}
                              {displayOptions.image_url && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      <img alt="" src={handleSplitImage(row.image_url)} style={style.tableUserAvatar} />
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.career_title && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.career_title}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.list_title && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.list_title}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.order_number && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.order_number}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.order_code && (
                                <TableCell align="left">
                                  <div
                                    className={classes.tableItemID}
                                    onClick={(event) => openDetailDocument(event, row)}
                                  >
                                    <div>{row.order_code}</div>
                                    <div>{formatDateTime(row.order_date)}</div>
                                  </div>
                                </TableCell>
                              )}

                              {displayOptions.fullname && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.fullname}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.university_code && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.university_code}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.title && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                  onClick={(event) => openDetailDocument(event, row)}
                                >
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.title}
                                    </span>
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.address && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                >
                                  <>
                                    <span className={classes.tableItemName}>{row.address}</span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.price && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                >
                                  <>
                                    <span className={classes.tableItemName}>{row?.price?.toLocaleString()}</span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.online && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                >
                                  <>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          // color="primary"
                                          checked={row.is_online_event}
                                        />
                                      }
                                    />
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.available && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                >
                                  <>
                                    <FormControlLabel
                                      control={<Switch color="primary" checked={row.is_available_for_booking} />}
                                    />
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.university && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                  onClick={(event) => openDetailDocument(event, row)}
                                >
                                  {row.university_name}
                                </TableCell>
                              )}
                              {displayOptions.voucher_code && <TableCell align="left">{row.voucher_code}</TableCell>}
                              {displayOptions.card_code && <TableCell align="left">{row.card_code}</TableCell>}
                              {displayOptions.card_serial && <TableCell align="left">{row.card_serial}</TableCell>}
                              {displayOptions.account_id && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.account_id}
                                    </span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.department_name && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.department_name}
                                    </span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.department_parent && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.parent_department_name}
                                    </span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.number_member && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.number_member}
                                    </span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.full_name && (
                                <TableCell align="left">
                                  <>
                                    <span
                                      className={classes.tableItemName}
                                      onClick={(event) => openDetailDocument(event, row)}
                                    >
                                      {row.full_name}
                                    </span>
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.code_id && (
                                <TableCell align="left">
                                  <div
                                    className={classes.tableItemID}
                                    onClick={(event) => openDetailDocument(event, row)}
                                  >
                                    <div>{row.code}</div>
                                    <div>{formatDateTime(row.created_date)}</div>
                                  </div>
                                </TableCell>
                              )}
                              {displayOptions.description && (
                                <TableCell align="left">{row.description || ''} </TableCell>
                              )}
                              {displayOptions.batch_number && (
                                <TableCell align="left">{row.batch_number || ''}</TableCell>
                              )}
                              {displayOptions.university_name && (
                                <TableCell
                                  style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  align="left"
                                >
                                  {row.university_name || row.current_school || ''}
                                </TableCell>
                              )}

                              {displayOptions.email_address && (
                                <TableCell align="left">{row.email_address || ''}</TableCell>
                              )}
                              {displayOptions.number_phone && (
                                <TableCell align="left">{row.number_phone || ''}</TableCell>
                              )}
                              {displayOptions.schedule && <TableCell align="left">{row.time_slot || ''}</TableCell>}
                              {displayOptions.career && <TableCell align="left">{row.career || ''}</TableCell>}
                              {displayOptions.assess && (
                                <TableCell align="left">
                                  {(!isNaN(row.assess) && row.assess) > 0 && (
                                    <div style={style.assessWrap}>
                                      <span>{row.assess}</span>
                                      <StarIcon style={style.starIcon} />
                                    </div>
                                  )}
                                </TableCell>
                              )}
                              {displayOptions.matching_code && (
                                <TableCell align="left">
                                  <span>{row.matching_code || ''}</span>
                                </TableCell>
                              )}
                              {displayOptions.mentee_email && (
                                <TableCell align="left">
                                  <span>{row.mentee_email || ''}</span>
                                </TableCell>
                              )}
                              {displayOptions.mentee_name && (
                                <TableCell align="left">
                                  <span>{row.fullname || ''}</span>
                                </TableCell>
                              )}
                              {displayOptions.mentor_email && (
                                <TableCell align="left">
                                  <span>{row.mentor_email || ''}</span>
                                </TableCell>
                              )}
                              {displayOptions.mentor_name && (
                                <TableCell align="left">
                                  <span>{row.mentor_name || ''}</span>
                                </TableCell>
                              )}
                              {displayOptions.cancel_by && <TableCell align="left">{row.cancel_by || ''}</TableCell>}
                              {displayOptions.link && (
                                <TableCell align="left">
                                  <a style={style.meetingLink} href={row.link_meeting || '#'} target="_blank">
                                    {row.link_meeting || ''}
                                  </a>
                                </TableCell>
                              )}

                              {displayOptions.rating && (
                                <TableCell align="left">
                                  {(!isNaN(row.rating) && row.rating) > 0 && (
                                    <div style={style.ratingWrap}>
                                      <span>{row.rating}</span>
                                      <StarIcon style={style.starIcon} />
                                    </div>
                                  )}
                                </TableCell>
                              )}
                              {displayOptions.total && <TableCell align="left">{row.total}</TableCell>}
                              {displayOptions.uncomplete && <TableCell align="left">{row.uncomplete}</TableCell>}
                              {displayOptions.completed && <TableCell align="left">{row.completed}</TableCell>}
                              {displayOptions.reject && <TableCell align="left">{row.reject}</TableCell>}
                              {displayOptions.role_template_name && (
                                <TableCell align="left" onClick={(event) => openDetailDocument(event, row)}>
                                  {row.role_template_name}
                                </TableCell>
                              )}
                              {displayOptions.apply_to_department_type && row.apply_to_department_type && (
                                <TableCell align="left">{row.apply_to_department_type.join(', ')}</TableCell>
                              )}

                              {displayOptions.visible_for_selection && (
                                <TableCell align="left">
                                  <>
                                    <FormControlLabel
                                      control={<Switch color="primary" checked={row.is_approval_role} />}
                                    />
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.landing_page_name && (
                                <TableCell align="left" onClick={(event) => openDetailDocument(event, row)}>
                                  {row.landing_page_name || ''}
                                </TableCell>
                              )}
                              {displayOptions.category_code && (
                                <TableCell
                                  align="left"
                                  className={classes.tableItemName}
                                  onClick={(event) => openDetailDocument(event, row)}
                                >
                                  {row.category_code || ''}
                                </TableCell>
                              )}
                              {displayOptions.category_name && (
                                <TableCell align="left" onClick={(event) => openDetailDocument(event, row)}>
                                  {row.category_name || ''}
                                </TableCell>
                              )}
                              {displayOptions.approval_role && (
                                <TableCell align="left">
                                  <>
                                    <FormControlLabel
                                      control={<Switch color="primary" checked={row.is_visible_for_selection} />}
                                    />
                                  </>
                                </TableCell>
                              )}

                              {displayOptions.link && (
                                <TableCell align="left">
                                  <a style={style.meetingLink} href={row.link_meeting || '#'} target="_blank">
                                    {row.link_meeting || ''}
                                  </a>
                                </TableCell>
                              )}
                              {displayOptions.type_collaborator && (
                                <TableCell align="left">{row.collaboration_type_name || ''}</TableCell>
                              )}
                              {displayOptions.amount && <TableCell align="left">{row.amount || ''}</TableCell>}
                              {displayOptions.used_date && (
                                <TableCell align="left">{formatDateTime(row.used_date) || ''}</TableCell>
                              )}
                              {displayOptions.expiration_date && (
                                <TableCell align="left">
                                  {row.expiration_date ? formatDate(new Date(row.expiration_date), 'dd/MM/yyyy') : ''}
                                </TableCell>
                              )}
                              {displayOptions.status && (
                                <TableCell align="left">
                                  {row.status && (
                                    <span
                                      style={style.statusWrap}
                                      className={classes[getStatusType(row.status_display || 'none')]}
                                    >
                                      {row.status_display}
                                    </span>
                                  )}
                                </TableCell>
                              )}
                              {displayOptions.type && (
                                <TableCell align="left">{row.collaboration_type_name || ''}</TableCell>
                              )}
                              {displayOptions.episodes && <TableCell align="left">{row.episodes || ''}</TableCell>}
                              {displayOptions.duration && <TableCell align="left">{row.duration || ''}</TableCell>}
                              {displayOptions.scheduled_datetime && (
                                <TableCell align="left">
                                  {row.scheduled_datetime
                                    ? formatDate(new Date(row.scheduled_datetime), 'HH:mm dd/MM/yyyy')
                                    : ''}
                                </TableCell>
                              )}
                              {displayOptions.created_by && <TableCell align="left">{row.created_by || ''}</TableCell>}
                              {displayOptions.created_date && (
                                <TableCell align="left">
                                  {row.created_date ? formatDate(new Date(row.created_date), 'dd/MM/yyyy') : ''}
                                </TableCell>
                              )}
                              {displayOptions.is_completed && (
                                <TableCell align="left">
                                  {row.is_completed ? (
                                    <Chip label="Đã hoàn thành" />
                                  ) : (
                                    <Chip color="primary" label="Chưa hoành thành" />
                                  )}
                                </TableCell>
                              )}
                              {displayOptions.is_used && (
                                <TableCell align="left">
                                  {row.is_used ? (
                                    <Chip label="Đã sử dụng" />
                                  ) : (
                                    <Chip color="primary" label="Chưa sử dụng" />
                                  )}
                                </TableCell>
                              )}
                              {displayOptions.order_title && (
                                <TableCell align="left">{row.order_title || ''} </TableCell>
                              )}
                              {displayOptions.payment_type_display && (
                                <TableCell align="left">{row.payment_type || ''} </TableCell>
                              )}
                              {displayOptions.total_order && (
                                <TableCell align="left">{row.total?.toLocaleString()}</TableCell>
                              )}
                              {displayOptions.discount_amount && (
                                <TableCell align="left">{row.discount_amount?.toLocaleString()}</TableCell>
                              )}
                              {displayOptions.final_total && (
                                <TableCell align="left">{row.final_total?.toLocaleString()}</TableCell>
                              )}
                              {displayOptions.status_display && (
                                <TableCell align="left">{row.status_display || ''} </TableCell>
                              )}

                              {displayOptions.is_active && (
                                <TableCell align="left">
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        // color="primary"
                                        checked={row.is_active}
                                        onClick={(event) => toggleSetActive(event, row, event.target.checked)}
                                      />
                                    }
                                  />
                                </TableCell>
                              )}
                              {displayOptions.is_featured && (
                                <TableCell align="left">
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        // color="primary"
                                        checked={row.is_featured}
                                        onClick={(event) => toggleSetFeatured(event, row, event.target.checked)}
                                      />
                                    }
                                  />
                                </TableCell>
                              )}
                              {displayOptions.active && (
                                <TableCell align="left">
                                  <>
                                    {(() => {
                                      // eslint-disable-next-line default-case
                                      switch (documentType) {
                                        case 'account':
                                          return (
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  color="primary"
                                                  checked={row.is_active}
                                                  onClick={(event) =>
                                                    toggleSetActiveAccount(
                                                      event,
                                                      row.email_address,
                                                      event.target.checked
                                                    )
                                                  }
                                                />
                                              }
                                            />
                                          );
                                        case 'departmentList':
                                          return (
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  color="primary"
                                                  checked={row.is_active}
                                                  onClick={(event) =>
                                                    toggleSetDepartment(
                                                      event,
                                                      row.department_code,
                                                      event.target.checked
                                                    )
                                                  }
                                                />
                                              }
                                            />
                                          );
                                        case 'mentor':
                                          return (
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  color="primary"
                                                  checked={!!row.is_active}
                                                  onClick={(event) => handleToggleActiveMentor(event, row.id)}
                                                />
                                              }
                                            />
                                          );
                                        case 'role':
                                          return (
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  color="primary"
                                                  checked={row.is_active}
                                                  onClick={(event) =>
                                                    toggleSetActiveRole(
                                                      event,
                                                      row.role_template_id,
                                                      event.target.checked
                                                    )
                                                  }
                                                />
                                              }
                                            />
                                          );
                                      }
                                    })()}
                                    &nbsp;&nbsp;
                                  </>
                                </TableCell>
                              )}
                              {displayOptions.menuButtons && (
                                <TableCell align="left">
                                  <div className={classes.handleButtonWrap}>
                                    {buttonDeptRemoveUser && (
                                      <Tooltip title={buttonDeptRemoveUser.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonNote}`}
                                          onClick={() => handleRemoveAccount(row.email_address)}
                                        >
                                          <RemoveCircleOutlineIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                    {buttonRemoveAccountRole && (
                                      <Tooltip title={buttonRemoveAccountRole.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonNote}`}
                                          onClick={() => handleRemoveAccountToRole(row.email_address)}
                                        >
                                          <RemoveCircleOutlineIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}

                                    {buttonBookingReview && row.is_can_completed && (
                                      <Tooltip title={buttonBookingReview.text}>
                                        <Button
                                          className={classes.handleButton}
                                          onClick={() => handleOpenModal('review', row)}
                                        >
                                          <AssignmentTurnedInIcon className={classes.handleButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                    {buttonBookingNote && (
                                      <Tooltip title={buttonBookingNote.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonNote}`}
                                          onClick={() => handleOpenModal('note', row)}
                                        >
                                          <NoteAddSharpIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                    {buttonBookingCancel && row.time_slot && (
                                      <Tooltip title={buttonBookingCancel.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonCancel}`}
                                          onClick={() => handleOpenModal('cancel', row)}
                                        >
                                          <DeleteForeverIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}

                                    {buttonBookingMeeting && row.link_meeting !== null && (
                                      <Tooltip title={buttonBookingMeeting.text}>
                                        <Button className={`${classes.handleButton} ${classes.handleButtonMeeting}`}>
                                          <a
                                            href={row.link_meeting}
                                            className={`${classes.handleButton} ${classes.handleButtonMeeting}`}
                                            target="_blank"
                                          >
                                            <DuoIcon className={classes.handleButtonIconMeeting} />
                                          </a>
                                        </Button>
                                      </Tooltip>
                                    )}
                                    {buttonSendEmail && row.is_generated && (
                                      <Tooltip title={buttonSendEmail.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonCancel}`}
                                          onClick={() => handleClickSendEmail(row.id)}
                                        >
                                          <MailOutlineIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                    {buttonSendEmailCard && row.is_generated && (
                                      <Tooltip title={buttonSendEmailCard.text}>
                                        <Button
                                          className={`${classes.handleButton} ${classes.handleButtonCancel}`}
                                          onClick={() => handleClickSendEmail(row.id)}
                                        >
                                          <MailOutlineIcon className={classes.noteButtonIcon} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                  </div>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    rowsPerPage={no_item_per_page}
                    labelRowsPerPage="Số tài liệu mỗi trang"
                    count={count}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
