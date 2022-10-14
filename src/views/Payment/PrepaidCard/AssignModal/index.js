import React, { useEffect, useState } from 'react';
import { Button, Box, Modal, FormControl, MenuItem, TextField, Snackbar, Grid } from '@material-ui/core';
import Alert from '../../../../component/Alert/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../../store/actions.js';
import useMarketing from './../../../../hooks/useMarketing';
import useAccount from './../../../../hooks/useAccount';
import { Autocomplete } from '@material-ui/lab';
import usePayment from './../../../../hooks/usePayment';

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
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

const CardModal = () => {
  const dispatch = useDispatch();
  const { assignCard, getCardBatchList } = usePayment();
  const { getAllUser } = useAccount();
  const { cardDocument: openDialog } = useSelector((state) => state.floatingMenu);
  const [accounts, setAccounts] = useState([]);
  const [batch, setBatch] = useState([]);
  const [card, setCard] = React.useState({
    account_id: '',
    batch_id: '',
    amount: 5,
  });

  useEffect(() => {
    const fetch = async () => {
      const accounts = await getAllUser();
      setAccounts(accounts);
      const batch = await getCardBatchList();
      setBatch(batch);
    };
    fetch();
  }, []);

  const handleCloseDialog = () => {
    setDocumentToDefault();
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: null, documentType: 'prepaidcard' });
    dispatch({ type: FLOATING_MENU_CHANGE, cardDocument: false });
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

  const handleAssignCard = async () => {
    try {
      const res = await assignCard(card);
      if (res) handleOpenSnackbar(true, 'success', 'Card assigned successfully');
      else handleOpenSnackbar(true, 'error', 'Card assigned failed');
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(true, 'error', 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCard({
      ...card,
      [e.target.name]: value,
    });
  };

  const setDocumentToDefault = async () => {};

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
              <Autocomplete
                size="small"
                fullWidth
                options={accounts}
                onChange={(e, acc) => setCard({ ...card, account_id: acc?.account_id })}
                getOptionLabel={(option) => option.email_address}
                renderInput={(params) => <TextField label="Tài khoản" {...params} variant="outlined" />}
              />
              <TextField
                select
                label="Mã lô"
                variant="outlined"
                onChange={handleChange}
                size="small"
                name="batch_id"
                style={style.marginTop}
              >
                {/* <MenuItem value="">Không chọn</MenuItem> */}
                {batch?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Số lượng"
                variant="outlined"
                onChange={handleChange}
                value={card.amount}
                type="number"
                size="small"
                name="amount"
                style={style.marginTop}
              />
            </FormControl>

            <div style={style.buttonWrap}>
              <Button type="button" variant="contained" style={style.closeButton} onClick={handleCloseDialog}>
                Đóng
              </Button>
              <Button type="submit" variant="contained" style={style.submitButton} onClick={handleAssignCard}>
                Lưu
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CardModal;
