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
} from '@material-ui/core';
import React, { useEffect } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DuoIcon from '@material-ui/icons/Duo';
import NoteAddSharpIcon from '@material-ui/icons/NoteAddSharp';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import StarIcon from '@material-ui/icons/Star';
import GetAppIcon from '@material-ui/icons/GetApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
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
import { style, useStyles } from './style';
import { bookingStatusList } from './data';
import { getComparator, stableSort, getTodayAndTomorrow } from '../../utils/table';
import useRole from '../../hooks/useRole';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { format as formatDate } from 'date-fns';
import useMedia from './../../hooks/useMedia';
import axiosInstance from '../../services/axios';

async function setFeatured(setFeaturedUrl, documentId, isFeatured) {
  return await axiosInstance
    .post(setFeaturedUrl, { outputtype: 'RawJson', id: documentId, value: isFeatured })
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

  useEffect(() => {
    const initOptions = {
      id: tableColumns.includes('booking_id'),
      image_url: tableColumns.includes('image_url'),
      title: tableColumns.includes('title'),
      description: tableColumns.includes('description'),
      fullname: tableColumns.includes('fullname'),
      department_name: tableColumns.includes('department_name'),
      department_parent: tableColumns.includes('department_parent'),
      number_member: tableColumns.includes('number_member'),
      university_name: tableColumns.includes('university'),
      email_address: tableColumns.includes('email'),
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
      type: tableColumns.includes('type'),
      used_date: tableColumns.includes('used_date'),
      expiration_date: tableColumns.includes('expiration_date'),
      count: tableColumns.includes('count'),
      duration: tableColumns.includes('duration'),
      episodes: tableColumns.includes('episodes'),
      created_date: tableColumns.includes('created_date'),
      created_by: tableColumns.includes('created_by'),
      menuButtons: !!menuButtons.length || false,
      is_featured: tableColumns.includes('is_featured'),
    };
    setDisplayOptions(initOptions);
  }, [tableColumns, selectedFolder]);

  const buttonAccountCreate = menuButtons.find((button) => button.name === view.user.list.create);

  const buttonDeptCreate = menuButtons.find((button) => button.name === view.department.list.create);
  const buttonRemoveAccount = menuButtons.find((button) => button.name === view.role.list.remove);

  const buttonCreateRole = menuButtons.find((button) => button.name === view.role.list.create);
  const buttonShowTreeView = menuButtons.find((button) => button.name === view.department.list.show_tree);
  const buttonSelectDepartment = menuButtons.find((button) => button.name === view.role.list.select);
  const buttonSyncDepartment = menuButtons.find((button) => button.name === view.role.list.sync_department);
  const buttonAddAccount = menuButtons.find((button) => button.name === view.role.list.addnew);

  const buttonCreatePodcast = menuButtons.find((button) => button.name === view.podcast.list.create);
  const buttonCreateEpisode = menuButtons.find((button) => button.name === view.episode.list.create);
  const buttonCreatePlaylist = menuButtons.find((button) => button.name === view.playlist.list.create);

  const buttonCreateMentor = menuButtons.find((button) => button.name === view.mentor.list.create);

  const buttonBookingMeeting = menuButtons.find((button) => button.name === view.counselling.list.meeting);
  const buttonBookingReview = menuButtons.find((button) => button.name === view.counselling.list.review);
  const buttonBookingNote = menuButtons.find((button) => button.name === view.counselling.list.note);

  const [isOpenModalNote, setIsOpenModalNote] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState({});
  const { url, documentType, tableTitle, setFeaturedUrl } = props;
  const [pageCurrent, setPage] = React.useState(1);
  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);

  const reduxDocuments = useSelector((state) => state.task);
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
    group_id = '',
  } = reduxDocuments[documentType] || {};

  const defaultQueries = {
    page: 1,
    order_by,
    order_type,
    no_item_per_page,
    category_id,
    search_text,
    from_date: getTodayAndTomorrow(Date.now()).today,
    to_date: getTodayAndTomorrow(Date.now()).tomorrow,
    university_id: '',
    status: '',
    career: '',
    group_id: '',
  };

  const { getDocuments } = useTask();

  const { getBookingDetail, approveBooking, reviewBooking, setNoteBooking, setCompletedBooking, getListUniversity } =
    useBooking();

  const { activeDepartment, getDepartmentDetail } = useDepartment();

  const { activeRole, getRoleDetail, getDepartmentListGroup, addAccountToGroup, removeAccountToGroup, syncRole } =
    useRole();

  const { getAccountDetail, activeAccount } = useAccount();

  const { getMentorDetail, toggleActiveMentor } = usePartner();

  const { getPodcastDetail, getEpisodeDetail, getPlaylistDetail } = useMedia();

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
    reloadCurrentDocuments(page);
  }, [selectedDocument]);

  const fetchDocument = (additionalQuery) => {
    const queries = { ...defaultQueries, ...additionalQuery };
    getDocuments(url, documentType, selectedProject?.id, selectedFolder?.id, queries);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = order_by === property && order_type === 'asc';
    fetchDocument(url, documentType, project_id, folder_id, {
      page: 1,
      order_by: property,
      order_type: isAsc ? 'desc' : 'asc',
      no_item_per_page,
      category_id,
      search_text,
      group_id,
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
    fetchDocument({ page: newPage + 1 });
    let page = newPage + 1;
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchDocument({ page: 1, no_item_per_page: event.target.value });
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
      detailDocument = await getAccountDetail(selectedDocument.account_id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: true });
    } else if (documentType === 'mentor') {
      detailDocument = await getMentorDetail(selectedDocument.id);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, mentorDocument: true });
    } else if (documentType === 'department') {
      detailDocument = await getDepartmentDetail(selectedDocument.department_code);
      dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType });
      dispatch({ type: FLOATING_MENU_CHANGE, departmentDocument: true });
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
    }
  };
  const showTreeView = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
  };

  const showFormAddAccount = () => {
    dispatch({ type: DOCUMENT_CHANGE, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, accountDocument: true });
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

  const handleCancelBooking = async (data) => {
    try {
      await reviewBooking(selected[0], data.status);
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

  const handleAddAccountToGroup = async (email_address, company_code, group_name_list, account_id) => {
    try {
      await addAccountToGroup(email_address, company_code, group_name_list, account_id);
    } catch (e) {
    } finally {
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
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: {}, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, mentorDocument: true });
  };

  const handleClickCreatePodcast = () => {
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: {}, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, podcastDocument: true });
  };

  const handleClickCreateEpisode = () => {
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: {}, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, episodeDocument: true });
  };

  const handleClickCreatePlaylist = () => {
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: {}, documentType });
    dispatch({ type: FLOATING_MENU_CHANGE, playlistDocument: true });
  };

  const handleDownload = (url) => {
    var link = document.createElement('a');
    link.download = 'Code.xlsx';
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
      <Modal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        type={modalType}
        handleCancel={handleCancelBooking}
        handleReview={handleReviewBooking}
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
                btnCreateNewDept={buttonDeptCreate}
                createNewDept={openDialogCreate}
                buttonCreateRole={buttonCreateRole}
                createNewRole={openDialogCreate}
                buttonShowTreeView={buttonShowTreeView}
                showTreeView={showTreeView}
                buttonSelectDepartment={buttonSelectDepartment}
                getDepartmentList={getDepartmentListGroup}
                buttonSyncDepartment={buttonSyncDepartment}
                buttonAddAccount={buttonAddAccount}
                showFormAddAccount={showFormAddAccount}
                syncRole={syncRole}
                buttonCreatePodcast={buttonCreatePodcast}
                createPodcast={handleClickCreatePodcast}
                buttonCreateEpisode={buttonCreateEpisode}
                createEpisode={handleClickCreateEpisode}
                buttonCreatePlaylist={buttonCreatePlaylist}
                createPlaylist={handleClickCreatePlaylist}
                buttonCreateMentor={buttonCreateMentor}
                createMentor={handleClickCreateMentor}
              />
              <TableContainer>
                <Table
                  stickyHeader
                  className={classes.table}
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
                    rowCount={documents.length}
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => handleClick(event, row.id)}
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          {displayOptions.id && (
                            <TableCell align="left">
                              <div className={classes.tableItemID} onClick={(event) => openDetailDocument(event, row)}>
                                <div>{row.id}</div>
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
                                  <img alt="" src={row.image_url} style={style.tableUserAvatar} />
                                </span>
                                &nbsp;&nbsp;
                              </>
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
                                &nbsp;&nbsp;
                              </>
                            </TableCell>
                          )}
                          {displayOptions.title && (
                            <TableCell
                              style={{ maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis' }}
                              align="left"
                            >
                              <>
                                <span
                                  className={classes.tableItemName}
                                  onClick={(event) => openDetailDocument(event, row)}
                                >
                                  {row.title}
                                </span>
                                &nbsp;&nbsp;
                              </>
                            </TableCell>
                          )}
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
                                  {row.parent_department_code}
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
                              <div className={classes.tableItemID} onClick={(event) => openDetailDocument(event, row)}>
                                <div>{row.code}</div>
                                <div>{formatDateTime(row.created_date)}</div>
                              </div>
                            </TableCell>
                          )}
                          {displayOptions.description && <TableCell align="left">{row.description || ''} </TableCell>}
                          {displayOptions.batch_number && <TableCell align="left">{row.batch_number || ''}</TableCell>}
                          {displayOptions.university_name && (
                            <TableCell align="left">{row.university_name || row.current_school || ''}</TableCell>
                          )}
                          {displayOptions.email_address && (
                            <TableCell align="left">{row.email_address || ''}</TableCell>
                          )}
                          {displayOptions.number_phone && <TableCell align="left">{row.number_phone || ''}</TableCell>}
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

                          {displayOptions.mentor_name && (
                            <TableCell align="left">
                              <span>{row.mentor_name || ''}</span>
                            </TableCell>
                          )}
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
                                <FormControlLabel control={<Switch color="primary" checked={row.is_approval_role} />} />
                              </>
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
                          {displayOptions.type && <TableCell align="left">{row.type || ''}</TableCell>}
                          {displayOptions.count && <TableCell align="left">{row.count || ''}</TableCell>}
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
                                <span style={style.statusWrap} className={classes[getStatusType(row.status || 'none')]}>
                                  {row.status_display}
                                </span>
                              )}
                            </TableCell>
                          )}
                          {displayOptions.episodes && <TableCell align="left">{row.episodes || ''}</TableCell>}
                          {displayOptions.duration && <TableCell align="left">{row.duration || ''}</TableCell>}
                          {displayOptions.created_by && <TableCell align="left">{row.created_by || ''}</TableCell>}
                          {displayOptions.created_date && (
                            <TableCell align="left">
                              {row.created_date ? formatDate(new Date(row.created_date), 'dd/MM/yyyy') : ''}
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
                                                toggleSetActiveAccount(event, row.email_address, event.target.checked)
                                              }
                                            />
                                          }
                                        />
                                      );
                                    case 'department':
                                      return (
                                        <FormControlLabel
                                          control={
                                            <Switch
                                              color="primary"
                                              checked={row.is_active}
                                              onClick={(event) =>
                                                toggleSetDepartment(event, row.department_code, event.target.checked)
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
                                                toggleSetActiveRole(event, row.role_template_id, event.target.checked)
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
                                {buttonRemoveAccount && (
                                  <Tooltip title={buttonRemoveAccount.text}>
                                    <Button
                                      className={`${classes.handleButton} ${classes.handleButtonNote}`}
                                      onClick={() =>
                                        handleRemoveAccountToGroup(row.email_address, group_name, row.account_id)
                                      }
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
