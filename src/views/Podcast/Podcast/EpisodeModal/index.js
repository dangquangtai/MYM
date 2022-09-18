import React, { useState, useEffect } from 'react';
import { dateOfWeek, timeWorking, workingType } from '../../../../store/constants/time';
import { initEpisodeData } from '../../../../store/constants/initial';
import { Switch, Modal, Box, Button, Grid, TextField, MenuItem, Select } from '@material-ui/core';
import { style } from './style';
import { convertArrayToObject } from '../../../../utils/convertArrayToObject';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import useStyles from './../../../../utils/classes';

export default function EpisodeModal({ isOpen, handleClose, submit, list_episode }) {
  const classes = useStyles();

  const [listEpisode, setListEpisode] = useState();

  const handleChangeEpisode = (event, id) => {
    const {
      target: { name, value, checked },
    } = event;
    const newEpisode = cloneDeep(listEpisode);
    newEpisode[id][name] = value || checked;
    setListEpisode(newEpisode);
  };

  const handelAddEpisode = () => {
    setListEpisode(listEpisode.concat(initEpisodeData));
    console.log(listEpisode);
  };

  const handleSubmitModal = () => {
    submit();
  };

  useEffect(() => {
    setListEpisode(list_episode);
  }, [list_episode]);

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
            Danh sách tập
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <Grid container spacing={1} className={classes.gridItemInfo} justify="space-between" alignItems="center">
                <div>
                  {/* <b>Lịch làm việc</b> */}
                </div>
                <Button className={classes.gridItemInfoButton} onClick={handelAddEpisode}>
                  Thêm
                </Button>
              </Grid>
              {listEpisode?.map((episode) => (
                <Grid key={episode} spacing={1} container className={classes.gridItemInfo} alignItems="center">
                  <Grid item lg={6} md={3} xs={12}>
                    <Select
                      name="day"
                      labelId="date-label"
                      className={classes.multpleSelectField}
                      value={episode.id}
                      onChange={(e) => handleChangeEpisode(e, episode)}
                    >
                      {dateOfWeek?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
          <div id="modal-modal-footer">
            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.buttonCancel} onClick={handleClose}>
                Huỷ bỏ
              </Button>
              <Button
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
