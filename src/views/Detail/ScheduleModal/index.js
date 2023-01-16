import React, { useState, useEffect } from 'react';
import { Switch, Modal, Box, Button, Grid, TextField, } from '@material-ui/core';
import { style } from './style';
import useStyles from '../../../views/Mentor/Detail/classes';
import useBooking from '../../../hooks/useBooking';
import { useDispatch } from 'react-redux';
import {  DOCUMENT_CHANGE } from '../../../store/actions';

export default function ScheduleModal({ isOpen, handleClose,time_slot, case_number, setOpen, id }) {
  const classes = useStyles();
  const {UpdateTimeSlot, getBookingDetail} = useBooking();
  
  const [time_slot_date,setTimeSlot]= useState(time_slot);
  const dispatch = useDispatch()
  const handleSubmit =async()=>{
    
    await UpdateTimeSlot(case_number,time_slot_date)
    let detailDocument = await getBookingDetail(id);
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType:'booking' });
    setOpen(false)
  }
  useEffect(()=>{
    setTimeSlot(time_slot)
   
  },[isOpen])
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
     
      >
        <Box style={style.box} >
          <div id="modal-modal-title" style={style.title} variant="h6" component="h2">
         {'Thay đổi lịch tư vấn'}
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
         
              <div>
                <Grid
                  container
                  spacing={1}
                  className={classes.gridItemInfo}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    {/* <b>Thay đổi thời gian tư vấn</b> */}
                  </div>
                
                </Grid>
             
                  <Grid  spacing={1} container className={classes.gridItemInfo} alignItems="center">
                  <Grid item lg={12} md={12} xs={12}>
                    <TextField
                    type='datetime-local'
                    value={time_slot_date}
                    onChange={(e)=>setTimeSlot(e.target.value)}
                    />                   
                  </Grid>
                  </Grid>
            
              </div>
          
          </div>
          <div id="modal-modal-footer">
            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.buttonCancel} onClick={()=>setOpen(false)}>
                Huỷ bỏ
              </Button>
              <Button
             
                type="button"
                variant="contained"
                style={style.buttonSubmit}
                onClick = {handleSubmit}
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
