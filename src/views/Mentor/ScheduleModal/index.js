import React, { useState, useEffect } from 'react';
import { dateOfWeek, timeWorking, workingType } from '../../../store/constants/time';
import { initMentorData, initVacationDay, initWorkingDay } from '../../../store/constants/initial';
import {
  Switch, Modal, Box, Button, Grid, TextField, MenuItem, Select
} from '@material-ui/core';
import { style } from './style';
import useStyles from '../Detail/classes';
import { convertArrayToObject } from '../../../utils/convertArrayToObject';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import { convertDate } from '../../../utils/table.js';

export default function ScheduleModal({ isOpen, handleClose, submit, type, mentor }) {
  const classes = useStyles();
  const [errorWorking, setErrorWorking] = useState({
    isError: false,
    text: ''
  });
  const [mentorData, setMentorData] = useState(initMentorData);

  const [workingDay, setWorkingDay] = useState(convertArrayToObject([
    { ...initWorkingDay, id: uuidv4() }
  ]))

  const [vacationDay, setVacationDay] = useState(convertArrayToObject([
    { ...initVacationDay, id: uuidv4() }
  ]))

  const isDisableSubmit = () => {
    if (type === 'working') {
      return false;
    } else {
      return !mentorData.vacation_start || !mentorData.vacation_end;
    }
  }

  const validateWorkingDay = (name, value, id) => {
    const newWorkingDay = cloneDeep(workingDay);
    newWorkingDay[id][name] = value;
    const arrayWorkingDay = Object.values(newWorkingDay).map(item => ({ ...item, time: item.hour + item.day }));
    if (uniqBy(arrayWorkingDay, 'time').length === arrayWorkingDay.length) {
      setErrorWorking({
        isError: false,
        text: ''
      });
    } else {
      setErrorWorking({
        isError: true,
        text: 'Các buổi làm việc không được trùng nhau'
      });
    }
  }

  const handleChangeMentor = (event) => {
    const { target: { name, value } } = event;
    setMentorData({ ...mentorData, [name]: value });
  }

  const handleChangeWorkingDay = (event, id) => {
    const { target: { name, value, checked } } = event;
    if (name === 'day' || name === 'hour') validateWorkingDay(name, value, id);
    const newWorkingDay = cloneDeep(workingDay);
    newWorkingDay[id][name] = value || checked;
    setWorkingDay(newWorkingDay)
  }

  const handleChangeVacationDay = (event, id) => {
    const { target: { name, value, checked } } = event;
    const newVacationDay = cloneDeep(vacationDay);
    newVacationDay[id][name] = value || checked;
    setVacationDay(newVacationDay)
  }

  const handleAddWorkingDay = () => {
    const newId = uuidv4();
    setWorkingDay({
      ...workingDay,
      [newId]: {
        ...initWorkingDay,
        id: newId,
      }
    })
  }

  const handleAdVacationDay = () => {
    const newId = uuidv4();
    setVacationDay({
      ...vacationDay,
      [newId]: {
        ...initVacationDay,
        id: newId,
      }
    })
  }

  const handleSubmitModal = () => {
    submit({ ...mentorData, workday: Object.values(workingDay), vacation: Object.values(vacationDay) });
  }

  useEffect(() => {
    setMentorData({ ...mentorData, ...mentor });
    setWorkingDay(convertArrayToObject(mentor?.workday))
    setVacationDay(convertArrayToObject(mentor?.vacation))
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
                <Grid container spacing={1} className={classes.gridItemInfo} justify="space-between" alignItems="center">
                  <div><b>Lịch làm việc</b></div>
                  <Button className={classes.gridItemInfoButton} onClick={handleAddWorkingDay}>Thêm</Button>
                </Grid>
                {Object.keys(workingDay).map(day => (
                  <Grid key={day} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                    <Grid item lg={3} md={3} xs={12}>
                      <Select
                        name="day"
                        labelId="date-label"
                        className={classes.multpleSelectField}
                        value={workingDay[day].day}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                      >
                        {dateOfWeek?.map((item) => (
                          <MenuItem
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item lg={3} md={3} xs={12}>
                      <Select
                        name="hour"
                        labelId="time1-label"
                        className={classes.multpleSelectField}
                        value={workingDay[day].hour}
                        onChange={(e) => handleChangeWorkingDay(e, day)}
                      >
                        {timeWorking?.map((item) => (
                          <MenuItem
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
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
                    </Grid>
                    <Grid item lg={2} md={2} xs={12}>
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
                <Grid container spacing={1} className={classes.gridItemInfo} justify="space-between" alignItems="center">
                  <div><b>Lịch nghỉ phép</b></div>
                  <Button className={classes.gridItemInfoButton} onClick={handleAdVacationDay}>Thêm</Button>
                </Grid>
                {Object.keys(vacationDay).map(day => (
                  <Grid key={day} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                    <Grid item lg={4} md={6} xs={6}>
                      <TextField
                        id="datetime-local"
                        type="date"
                        name="start"
                        value={convertDate(vacationDay[day].start)}
                        className={classes.inputField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                      />
                    </Grid>
                    <Grid item lg={2} md={6} xs={6} style={{ textAlign: 'center' }}>
                      <span className={classes.tabItemLabelField}>đến</span>
                    </Grid>
                    <Grid item lg={4} md={6} xs={6}>
                      <TextField
                        id="datetime-local"
                        type="date"
                        name="end"
                        value={convertDate(vacationDay[day].end)}
                        className={classes.inputField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChangeVacationDay(e, day)}
                      />
                    </Grid>
                    <Grid item lg={2} md={2} xs={12}>
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
              <Button
                type="button"
                variant="contained"
                style={style.buttonCancel}
                onClick={handleClose}
              >
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