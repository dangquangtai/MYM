import React, { useState, useEffect } from 'react';
import { dateOfWeek, timeWorking } from '../../../store/constants/time';
import { initMentorData, initVacationDay, initWorkingDay } from '../../../store/constants/initial';
import { Switch, Modal, Box, Button, Grid, TextField, MenuItem, Select } from '@material-ui/core';
import { style } from './style';
import useStyles from '../Detail/classes';
import { convertArrayToObject } from '../../../utils/convertArrayToObject';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import { convertDate } from '../../../utils/table.js';
import { useSelector } from 'react-redux';

export default function ScheduleModal({ isOpen, handleClose, submit, type, mentor }) {
  const classes = useStyles();
  const [errorWorking, setErrorWorking] = useState({
    isError: false,
    text: '',
  });
  const { weekday } = useSelector((state) => state.metadata);
  const [mentorData, setMentorData] = useState(initMentorData);

  const [workingDay, setWorkingDay] = useState(convertArrayToObject([{ ...initWorkingDay, id: uuidv4() }]));

  const [vacationDay, setVacationDay] = useState(convertArrayToObject([{ ...initVacationDay, id: uuidv4() }]));

  const validateWorkingDay = (name, value, id) => {
    const newWorkingDay = cloneDeep(workingDay);
    newWorkingDay[id][name] = value;
    if (name === 'applicable_to_date') {
      if (newWorkingDay[id].applicable_to_date > newWorkingDay[id].applicable_from_date) {
        setErrorWorking({
          isError: false,
          text: '',
        });
      } else {
        setErrorWorking({
          isError: true,
          text: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
        });
      }
    } else {
      if (parseInt(newWorkingDay[id].to_hour) > parseInt(newWorkingDay[id].from_hour)) {
        setErrorWorking({
          isError: false,
          text: '',
        });
      } else {
        setErrorWorking({
          isError: true,
          text: 'Giờ kết thúc phải lớn hơn giờ bắt đầu',
        });
      }
    }
  };

  const validateVacationDay = (name, value, id) => {
    const newVacationDay = cloneDeep(vacationDay);
    newVacationDay[id][name] = value;
    if (name === 'applicable_to_date') {
      if (newVacationDay[id].applicable_to_date > newVacationDay[id].applicable_from_date) {
        setErrorWorking({
          isError: false,
          text: '',
        });
      } else {
        setErrorWorking({
          isError: true,
          text: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
        });
      }
    } else {
      if (parseInt(newVacationDay[id].to_hour) > parseInt(newVacationDay[id].from_hour)) {
        setErrorWorking({
          isError: false,
          text: '',
        });
      } else {
        setErrorWorking({
          isError: true,
          text: 'Giờ kết thúc phải lớn hơn giờ bắt đầu',
        });
      }
    }
  };

  const handleChangeMentor = (event) => {
    const {
      target: { name, value },
    } = event;
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleChangeWorkingDay = (event, id) => {
    const {
      target: { name, value, checked },
    } = event;
    if (name === 'applicable_to_date' || name === 'to_hour') validateWorkingDay(name, value, id);
    const newWorkingDay = cloneDeep(workingDay);
    newWorkingDay[id][name] = value || checked;
    setWorkingDay(newWorkingDay);
  };

  const handleChangeVacationDay = (event, id) => {
    const {
      target: { name, value, checked },
    } = event;
    if (name === 'applicable_to_date' || name === 'to_hour') validateVacationDay(name, value, id);
    const newVacationDay = cloneDeep(vacationDay);
    newVacationDay[id][name] = value || checked;
    setVacationDay(newVacationDay);
  };

  const handleAddWorkingDay = () => {
    const newId = uuidv4();
    setWorkingDay({
      ...workingDay,
      [newId]: {
        ...initWorkingDay,
        id: newId,
      },
    });
  };

  const handleAdVacationDay = () => {
    const newId = uuidv4();
    setVacationDay({
      ...vacationDay,
      [newId]: {
        ...initVacationDay,
        id: newId,
      },
    });
  };

  const handleSubmitModal = () => {
    submit({ ...mentorData, workday: Object.values(workingDay), vacation: Object.values(vacationDay) });
  };

  useEffect(() => {
    setMentorData({ ...mentorData, ...mentor });
    setWorkingDay(convertArrayToObject(mentor?.workday));
    setVacationDay(convertArrayToObject(mentor?.vacation));
  }, [mentor]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style.box}>
          <div id="modal-modal-title" style={style.title} variant="h6" component="h2">
            {type === 'working' ? 'Lịch làm việc' : 'Lịch nghỉ phép'}
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            {type === 'working' ? (
              <div>
                <Grid
                  container
                  spacing={1}
                  className={classes.gridItemInfo}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <b>Lịch làm việc</b>
                  </div>
                  <Button className={classes.gridItemInfoButton} onClick={handleAddWorkingDay}>
                    Thêm
                  </Button>
                </Grid>
                {Object.keys(workingDay).map((day) => (
                  <Grid key={day} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                    <Grid item lg={2} md={4} xs={12}>
                      <Select
                        multiple
                        fullWidth
                        name="weekday_list"
                        value={workingDay[day].weekday_list}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                        className={classes.multpleSelectField}
                      >
                        {weekday?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item lg={3} md={4} xs={12}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item lg={6} md={6} xs={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="from_hour"
                            label="Từ giờ"
                            select
                            size="small"
                            value={workingDay[day].from_hour}
                            onChange={(e) => handleChangeWorkingDay(e, day)}
                          >
                            {timeWorking?.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item lg={6} md={6} xs={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="to_hour"
                            label="Đến giờ"
                            select
                            size="small"
                            value={workingDay[day].to_hour}
                            onChange={(e) => handleChangeWorkingDay(e, day)}
                          >
                            {timeWorking?.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                      <TextField
                        id="datetime-local"
                        variant="outlined"
                        label="Thời gian bắt đầu"
                        type="date"
                        size="small"
                        name="applicable_from_date"
                        value={convertDate(workingDay[day].applicable_from_date)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                      />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                      <TextField
                        id="datetime-local"
                        variant="outlined"
                        label="Thời gian kết thúc"
                        type="date"
                        size="small"
                        name="applicable_to_date"
                        value={convertDate(workingDay[day].applicable_to_date)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                      />
                    </Grid>
                    {/* <Grid item lg={4} md={4} xs={12}>
                      <Select
                        name="type"
                        labelId="time1-label"
                        className={classes.multpleSelectField}
                        value={workingDay[day].type}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                      >
                        {workingType?.map((item) => (
                          <MenuItem
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid> */}
                    <Grid item lg={1} md={2} xs={12}>
                      <Switch
                        color="primary"
                        name="is_active"
                        checked={!!workingDay[day].is_active}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </div>
            ) : (
              <>
                <Grid
                  container
                  spacing={1}
                  className={classes.gridItemInfo}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <b>Lịch nghỉ phép</b>
                  </div>
                  <Button className={classes.gridItemInfoButton} onClick={handleAdVacationDay}>
                    Thêm
                  </Button>
                </Grid>
                {Object.keys(vacationDay).map((day) => (
                  <Grid key={day} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                    <Grid item lg={2} md={4} xs={12}>
                      <Select
                        multiple
                        fullWidth
                        name="weekday_list"
                        value={vacationDay[day].weekday_list}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                        className={classes.multpleSelectField}
                      >
                        {weekday?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item lg={3} md={4} xs={12}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item lg={6} md={6} xs={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="from_hour"
                            label="Từ giờ"
                            select
                            size="small"
                            value={vacationDay[day].from_hour}
                            onChange={(e) => handleChangeVacationDay(e, day)}
                          >
                            {timeWorking?.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item lg={6} md={6} xs={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="to_hour"
                            label="Đến giờ"
                            select
                            size="small"
                            value={vacationDay[day].to_hour}
                            onChange={(e) => handleChangeVacationDay(e, day)}
                          >
                            {timeWorking?.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                      <TextField
                        id="datetime-local"
                        variant="outlined"
                        label="Thời gian bắt đầu"
                        type="date"
                        size="small"
                        name="applicable_from_date"
                        value={convertDate(vacationDay[day].applicable_from_date)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                      />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                      <TextField
                        id="datetime-local"
                        variant="outlined"
                        label="Thời gian kết thúc"
                        type="date"
                        size="small"
                        name="applicable_to_date"
                        value={convertDate(vacationDay[day].applicable_to_date)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                      />
                    </Grid>
                    <Grid item lg={1} md={2} xs={12}>
                      <Switch
                        color="primary"
                        name="is_active"
                        checked={!!vacationDay[day].is_active}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
            {errorWorking.isError && (
              <Grid container className={classes.gridItemInfo} alignItems="center">
                <Grid item lg={12} md={12} xs={12} className={classes.errorLabel}>
                  {errorWorking.text}
                </Grid>
              </Grid>
            )}
          </div>
          <div id="modal-modal-footer">
            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.buttonCancel} onClick={handleClose}>
                Huỷ bỏ
              </Button>
              <Button
                disabled={errorWorking.isError}
                type="button"
                variant="contained"
                style={style.buttonSubmit}
                onClick={handleSubmitModal}
              >
                Lưu
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
