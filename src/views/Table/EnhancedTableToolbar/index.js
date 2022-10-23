import { Button, Checkbox, Grid, Tooltip } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { gridSpacing } from '../../../store/constant';
import useToolbarStyles from './classes';
import { headCells, bookingStatusList } from '../data';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../store/actions.js';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    handleShowColumn,
    handleFilterChange,
    displayOptions,
    data,
    btnCreateNewAccount,
    createNewAccount,
    btnCreateNewDept,
    createNewDept,
    buttonDeptUpdate,
    buttonAddAccount,
    roletemplateList,
    buttonCreateRole,
    createNewRole,
    buttonSelectDepartment,
    buttonSyncDepartment,

    buttonCreatePodcast,
    createPodcast,
    buttonCreateEpisode,
    createEpisode,
    buttonCreatePlaylist,
    createPlaylist,
    buttonCreateMentor,
    createMentor,
    buttonCreateEvent,
    createEvent,
    buttonCreateEventCategory,
    createEventCategory,
    buttonCreateBatch,
    createBatch,
    buttonAssignVoucher,
    assignVoucher,
    buttonCreateMentorList,
    createMentorList,
    buttonCreatePartner,
    createPartner,
    buttonCreatePartnerCategory,
    createPanertCategory,
    buttonCreateCardBatch,
    createCardBatch,
    buttonAssignCard,
    assignCard,
    handleSyncRole,

    department_code_selected,

    handleAssignAccount,
    handleUpdateDepartment,
    setSelectedRoleTemplate,
    buttonCreateProcessRole,
    buttonUpdateProcessRole,

    createNewProcessRole,

    handleClickProcessRoleDetail,


    handleClickUpdateUserProcessRole,
    handleClickUpdateDeptProcessRole,
    userList,
    buttonCreateFile,
    createFile,
    buttonCreateFileCategory,
    createFileCategory,

  } = props;

  const filterRef = useRef(null);
  // useOnClickOutSide(filterRef, () => {
  //   setIsOpenFilter(false);
  // });

  const [columnNames, setColumnNames] = React.useState();
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);
  const [isOpenShowColumn, setIsOpenShowColumn] = React.useState(false);
  const [isOpenFilter, setIsOpenFilter] = React.useState(false);
  const [universityList, setUniversityList] = React.useState([]);
  const [statusList] = React.useState(bookingStatusList);
  const [filter, setFilter] = React.useState({
    university_id: '',
    status: '',
    search_text: '',
    department_code: '',
    role_template_code: 'Member',
  });
  const dispatch = useDispatch();
  const handleCloseInput = () => {
    setFilter({ ...filter, search_text: '' });
    handleFilterChange({ ...filter, search_text: '' });
  };

  const handleChangeSearch = (e) => {
    setFilter({ ...filter, search_text: e.target.value });
  };

  const handleEnterSearch = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleFilterChange(filter);
    }
  };
  const handleSelect = (group_id) => {
    setFilter({ ...filter, group_id: group_id });
    handleFilterChange(filter);
  };

  const handleSubmitAssign = () => {
    handleAssignAccount(user.email_address)
  }
  const [user, setUserSelected] = useState();
  const [dept, setDeptSelected] = useState();



  const handleResetFilter = () => {
    setFilter((pre) => ({
      ...pre,
      university_id: '',
      status: '',
    }));
    handleFilterChange({
      ...filter,
      university_id: '',
      status: '',
    });
  };

  const handleChangeColumnName = (index, id) => {
    const newColumnNames = JSON.parse(JSON.stringify(columnNames));
    const newState = !newColumnNames[index].isSelected;
    newColumnNames[index].isSelected = newState;
    handleShowColumn(id, newState);
    setColumnNames((pre) => newColumnNames);
  };

  const handleChangeFilter = (event) => {

    setSelectedRoleTemplate(event.target.value)

    const newFilter = {
      ...filter, [event.target.name]: event.target.value, department_code: department_code_selected,
    };
    setFilter(newFilter);
    handleFilterChange(newFilter);

  };

  const handleRefresh = () => {
    handleFilterChange({
      university_id: '',
      status: '',
      search_text: '',
    });
    setFilter({
      university_id: '',
      status: '',
      search_text: '',
    });
  };
  const { documentType } = useSelector((state) => state.document);
  const { selectedFolder } = useSelector((state) => state.folder);


  useEffect(() => {

  }, []);

  const [dataDepartmentList, setDepartment] = React.useState();
  useEffect(() => { }, []);


  useEffect(() => {
    setFilter({
      university_id: '',
      status: '',
      search_text: '',
      role_template_code: 'Member'
    });
  }, [selectedFolder]);
  useEffect(() => {
    if (data.length) {
      const keysData = Object.keys(data[0]);
      const newColumnNames = headCells.reduce((pre, { id, label }) => {
        if (keysData.includes(id)) {
          return [...pre, { id, label, isSelected: displayOptions[id] }];
        } else return pre;
      }, []);
      setColumnNames(newColumnNames);
      return;
    }
    setColumnNames(
      headCells.reduce((pre, { id, label }) => {
        return id !== 'menuButtons' && displayOptions[id]
          ? [...pre, { id, label, isSelected: displayOptions[id] }]
          : pre;
      }, [])
    );
  }, [displayOptions, data]);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container justifyContent="flex-end" spacing={gridSpacing}>
        {btnCreateNewAccount && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createNewAccount}>
              {btnCreateNewAccount.text}
            </Button>
          </Grid>
        )}
        {btnCreateNewDept && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createNewDept}>
              {btnCreateNewDept.text}
            </Button>
          </Grid>
        )}
        {buttonDeptUpdate && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={handleUpdateDepartment}>
              {buttonDeptUpdate.text}
            </Button>
          </Grid>
        )}


        {buttonCreateRole && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createNewRole}>
              {buttonCreateRole.text}
            </Button>
          </Grid>
        )}

        {buttonSyncDepartment && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={handleSyncRole}>
              {buttonSyncDepartment.text}
            </Button>
          </Grid>
        )}

        {buttonCreatePodcast && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createPodcast}>
              {buttonCreatePodcast.text}
            </Button>
          </Grid>
        )}

        {buttonCreateEpisode && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createEpisode}>
              {buttonCreateEpisode.text}
            </Button>
          </Grid>
        )}

        {buttonCreatePlaylist && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createPlaylist}>
              {buttonCreatePlaylist.text}
            </Button>
          </Grid>
        )}

        {buttonCreateMentor && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createMentor}>
              {buttonCreateMentor.text}
            </Button>
          </Grid>
        )}

        {buttonCreateEvent && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createEvent}>
              {buttonCreateEvent.text}
            </Button>
          </Grid>
        )}

        {buttonCreateEventCategory && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createEventCategory}>
              {buttonCreateEventCategory.text}
            </Button>
          </Grid>
        )}

        {buttonCreateBatch && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createBatch}>
              {buttonCreateBatch.text}
            </Button>
          </Grid>
        )}

        {buttonAssignVoucher && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={assignVoucher}>
              {buttonAssignVoucher.text}
            </Button>
          </Grid>
        )}

        {buttonCreateMentorList && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createMentorList}>
              {buttonCreateMentorList.text}
            </Button>
          </Grid>
        )}
        {buttonCreatePartner && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createPartner}>
              {buttonCreatePartner.text}
            </Button>
          </Grid>
        )}
        {buttonCreatePartnerCategory && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createPanertCategory}>
              {buttonCreatePartnerCategory.text}
            </Button>
          </Grid>
        )}

        {buttonCreateCardBatch && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createCardBatch}>
              {buttonCreateCardBatch.text}
            </Button>
          </Grid>
        )}

        {buttonAssignCard && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={assignCard}>
              {buttonAssignCard.text}
            </Button>
          </Grid>
        )}
        {buttonCreateProcessRole && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createNewProcessRole}>
              {buttonCreateProcessRole.text}
            </Button>
          </Grid>
        )}

        {buttonUpdateProcessRole && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={handleClickProcessRoleDetail} >
              {buttonUpdateProcessRole.text}
            </Button>
          </Grid>
        )}



        {buttonCreateFile && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createFile}>
              {buttonCreateFile.text}
            </Button>
          </Grid>
        )}

        {buttonCreateFileCategory && (
          <Grid item>
            <Button variant="contained" color={'primary'} onClick={createFileCategory}>
              {buttonCreateFileCategory.text}
            </Button>
          </Grid>
        )}

        <Grid item lg={6} md={6} xs={12} className={classes.toolSearchWrap}>
          {numSelected > 0 && (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
              {numSelected} bản ghi được chọn
            </Typography>
          )}
        </Grid>

        <Grid item lg={6} md={6} xs={12} className={classes.toolSearchWrap} style={{ minWidth: 1000, maxWidth: 1000 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            {documentType === 'processrole' && (

              <>
                <Grid container justifyContent="flex-start" alignItems="center">
                  <Button style={{ minWidth: 100, maxWidth: 100 }} variant="contained" color={'primary'} onClick={() => handleClickUpdateDeptProcessRole()}>
                    {'Thêm'}
                  </Button>
                  <span style={{ minWidth: 410, maxWidth: 410 }}>

                  </span>
                  <Button style={{ minWidth: 100, maxWidth: 100 }} variant="contained" color={'primary'} onClick={() => handleClickUpdateUserProcessRole()}>
                    {'Thêm'}
                  </Button>
                  <span style={{ minWidth: 500, maxWidth: 500 }}>

                  </span>
                </Grid>
              </>
            )}

            {(documentType === 'department') && (<>
              <span style={{ minWidth: 20, maxWidth: 20 }}> </span>
              <span style={{ minWidth: 80, maxWidth: 80 }}>Chức danh:  </span>
              <Select
                style={{ minWidth: 150, maxWidth: 150 }}
                className={classes.multpleSelectField}
                onChange={handleChangeFilter}
                defaultValue={'Member'}
                name='role_template_code'
                value={filter.role_template_code}
              >
                {roletemplateList &&
                  roletemplateList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.value}
                    </MenuItem>
                  ))}
              </Select>
              <div className={classes.toolSearchWrap}>
                <Autocomplete
                  style={{ minWidth: 300, maxWidth: 300 }}
                  size="small"
                  fullWidth
                  options={userList}
                  onChange={(e, u) => setUserSelected(u)}
                  getOptionLabel={(option) => option.email_address}
                  renderInput={(params) => <TextField label="Tài khoản" {...params} variant="outlined" />}
                />


              </div>
              {buttonAddAccount && (

                <Button variant="contained" color={'primary'} onClick={handleSubmitAssign}>
                  {buttonAddAccount.text}
                </Button>

              )}

              {/* {documentType === 'processrole' &&(
                    <Button style={{minWidth:100,maxWidth:100}} variant="contained" color={'primary'} onClick={()=>handleAddDeptUser(user,department_code_selected+'_'+filter.role_template_code)}>
                    {'Thêm'}
                  </Button>
                  )}  */}
            </>
            )}


            {(documentType != 'department' && documentType != 'processrole') && (
              <>

                <div className={classes.toolSearchWrap}>
                  <SearchIcon />
                  <input
                    className={classes.toolSearchInput}
                    value={filter.search_text}
                    onChange={handleChangeSearch}
                    onKeyUp={handleEnterSearch}
                  />
                  <Button className={classes.toolButtonSearch} onClick={handleCloseInput}>
                    <ClearIcon className={classes.toolButtonIcon} />
                  </Button>
                </div>


                <ClickAwayListener onClickAway={() => setIsOpenShowColumn(false)}>
                  <div className={classes.toolButtonWrap}>
                    <Tooltip title="View Columns">
                      <Button
                        className={`${classes.toolButton} ${isOpenShowColumn ? classes.toolButtonActive : ''}`}
                        onClick={() => setIsOpenShowColumn(!isOpenShowColumn)}
                      >
                        <ViewColumnIcon className={classes.toolButtonIcon} />
                      </Button>
                    </Tooltip>

                    {isOpenShowColumn && (
                      <div className={classes.toolColumn}>
                        <div className={classes.toolColumnTitle}>
                          <div>Show Columns</div>
                          <Button className={classes.toolButtonSearch} onClick={() => setIsOpenShowColumn(false)}>
                            <ClearIcon className={classes.toolButtonIcon} />
                          </Button>
                        </div>
                        <div className={classes.toolColumnBody}>
                          {columnNames.map((columnName, index) => (
                            <div key={columnName.id} className={classes.toolColumnNameWrap}>
                              <Checkbox
                                checked={columnName.isSelected}
                                onChange={() => handleChangeColumnName(index, columnName.id)}
                                style={{ position: 'relative !important' }}
                              />
                              <span>{columnName.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ClickAwayListener>
                <div ref={filterRef} className={classes.toolButtonWrap}>
                  <Tooltip title="Filter Table">
                    <Button className={classes.toolButton} onClick={() => setIsOpenFilter(!isOpenFilter)}>
                      <FilterListIcon className={classes.toolButtonIcon} />
                    </Button>
                  </Tooltip>
                  {/* {buttonShowTreeView && (
                 <Tooltip title="Tree View">
                   <Button
                     className={`${classes.toolButton} ${isOpenSearch ? classes.toolButtonActive : ''}`}
                     onClick={showTreeView}
                   >
                     <AccountTreeIcon className={classes.toolButtonIcon} />
                   </Button>
                 </Tooltip>
               )} */}
                  {isOpenFilter && (
                    <div className={`${classes.toolColumn} ${classes.toolFilter}`}>
                      <div className={`${classes.toolColumnTitle} ${classes.toolFilterTitle}`}>
                        <div className={classes.toolFilterTitleBlock}>
                          <div>Filters</div>
                          <Button
                            className={`${classes.toolButtonSearch} ${classes.toolResetButton}`}
                            onClick={handleResetFilter}
                          >
                            Reset
                          </Button>
                        </div>
                        <Button className={classes.toolButtonSearch} onClick={() => setIsOpenFilter(false)}>
                          <ClearIcon className={classes.toolButtonIcon} />
                        </Button>
                      </div>
                      <div className={`${classes.toolColumnBody} ${classes.toolFilterBody}`}>
                        <div className={classes.toolFilterItem}>
                          <FormControl fullWidth>
                            <InputLabel shrink id="university-label">
                              Trường
                            </InputLabel>
                            <Select
                              labelId="university-label"
                              id="univeristy_id"
                              onChange={handleChangeFilter}
                              displayEmpty
                              name="university_id"
                              value={filter.university_id}
                            >
                              <MenuItem value="">Tất cả</MenuItem>
                              {universityList?.map((university, index) => (
                                <MenuItem key={index} value={university.id}>
                                  {university.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className={classes.toolFilterItem}>
                          <FormControl fullWidth>
                            <InputLabel shrink id="status-label">
                              Trạng thái
                            </InputLabel>
                            <Select
                              labelId="status-label"
                              id="status_id"
                              onChange={handleChangeFilter}
                              displayEmpty
                              name="status"
                              value={filter.status}
                            >
                              <MenuItem value="">Tất cả</MenuItem>
                              {statusList?.map((status, index) => (
                                <MenuItem key={index} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Tooltip title="Refresh">
                  <Button
                    className={`${classes.toolButton} ${isOpenSearch ? classes.toolButtonActive : ''}`}
                    onClick={handleRefresh}
                  >
                    <CachedIcon className={classes.toolButtonIcon} />
                  </Button>
                </Tooltip>
              </>
            )}

          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
