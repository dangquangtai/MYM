import React, { useEffect, useState } from 'react';
import { Button, Box, Modal, FormControl, MenuItem, TextField, Snackbar, Grid } from '@material-ui/core';
import Alert from '../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../store/actions.js';
import useBooking from '../../../hooks/useBooking';
import { typeBatchList } from '../../../store/constants/initial.js';
import { getTodayAndTomorrow } from '../../../utils/table';
import { CONFIRM_CHANGE } from './../../../store/actions';
import useConfirmPopup from './../../../hooks/useConfirmPopup';
import useBatch from './../../../hooks/useBatch';

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 500,
    boxShadow: 24,
    background: '#FFFFFF',
    borderRadius: '15px',
  },
  title: {
    padding: '16px 32px 20px',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  body: {
    padding: '0 32px',
  },
  form: {
    width: '100%',
    marginBottom: '20px',
  },
  marginTop: {
    marginTop: '20px',
  },
  buttonWrap: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 32px 16px',
  },
  button: {
    margin: '0 12px',
    background: '#FFC000',
  },
  closeButton: {
    margin: '0 12px',
    background: '#465169',
  },
  submitButton: {
    margin: '0 12px',
    background: '#612AFF',
  },
  error: {
    color: 'red',
  },
  formlabel: {
    fontWeight: 'bold',
  },
};

const BatchModal = () => {
  const dispatch = useDispatch();
  const { createBatch } = useBatch();
  const { getListUniversity } = useBooking();
  const { setConfirmPopup } = useConfirmPopup();
  const { batchDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const [universityList, setUniversityList] = React.useState([]);
  const [batch, setBatch] = React.useState({
    university_id: '',
    count: 10,
  });

  useEffect(() => {
    async function initUniversityList() {
      const data = await getListUniversity();
      setUniversityList(data);
    }
    initUniversityList();
  }, []);

  const showConfirmPopup = ({ title = 'Tải xuống', message = '', action = null, payload = null, onSuccess = null }) => {
    setConfirmPopup({ type: CONFIRM_CHANGE, open: true, title, message, action, payload, onSuccess });
  };

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'batch' });
    dispatch({ type: FLOATING_MENU_CHANGE, batchDocument: false });
  };

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  const handleOpenSnackbar = (isOpen, type, text) => {
    setSnackbarStatus({
      isOpen: isOpen,
      type: type,
      text: text,
    });
  };

  const handleCreateBatch = async () => {
    try {
      let check = await createBatch({
        ...batch,
        outputtype: 'RawJson',
      });
      if (check === false) {
        handleOpenSnackbar(true, 'success', 'Tạo mới không thành công!');
      } else {
        showConfirmPopup({
          message: `Bạn có muốn tải xuống lô này không ?`,
          action: handleDownload,
          payload: check,
          onSuccess: handleCloseDialog,
        });
        handleOpenSnackbar(true, 'success', 'Tạo mới thành công!');
      }
      handleCloseDialog();
    } catch (error) {
      console.log('error Batch', error);
      handleOpenSnackbar(true, 'error', 'Vui lòng điền đầy đủ thông tin');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setBatch({
      ...batch,
      [e.target.name]: value,
    });
  };

  const setDocumentToDefault = async () => {};

  const handleDownload = (url) => {
    var link = document.createElement('a');
    link.download = 'Code.xlsx';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style.box}>
          <div id="modal-modal-title" style={style.title} variant="h6" component="h2">
            Tạo mới
          </div>
          <div id="modal-modal-description" style={style.body}>
            <FormControl style={style.form}>
              <TextField
                select
                id="demo-customized-select"
                label="Trường"
                variant="outlined"
                onChange={handleChange}
                size="small"
                name="university_id"
                style={style.marginTop}
              >
                <MenuItem value="">Không chọn</MenuItem>
                {universityList?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.code +' - '+ item.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Số lượng"
                variant="outlined"
                onChange={handleChange}
                value={batch.count}
                type="number"
                size="small"
                name="count"
                style={style.marginTop}
              />
              <TextField
                select
                id="demo-customized-select"
                label="Loại"
                variant="outlined"
                onChange={handleChange}
                size="small"
                name="type"
                style={style.marginTop}
              >
                {typeBatchList.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container style={style.marginTop}>
                <Grid item xs={6}>
                  <div>Thời hạn:</div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="datetime-local"
                    type="date"
                    name="expiration_date"
                    size="small"
                    defaultValue={batch.expiration_date}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Ghi chú"
                fullWidth
                multiline
                rows={3}
                rowsMax={5}
                variant="outlined"
                name="note"
                onChange={handleChange}
                style={style.marginTop}
              />
            </FormControl>

            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.closeButton} onClick={handleCloseDialog}>
                Đóng
              </Button>
              <Button type="submit" variant="contained" style={style.submitButton} onClick={handleCreateBatch}>
                Lưu
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default BatchModal;
