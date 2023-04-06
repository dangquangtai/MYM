import {
  makeStyles,
  Grid,
  InputBase,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Fab,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Chip,
  Box,
  CircularProgress,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import MessageIcon from '@material-ui/icons/Message';
import useAuth from './../../hooks/useAuth';
import useShare from './../../hooks/useShare';
import moment from 'moment/moment.js';
import vi from 'moment/locale/vi';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './../../services/firebase';
import { Send } from '@material-ui/icons';

moment.updateLocale('vi', vi);

const useStyles = makeStyles((theme) => ({
  mailroot: {
    background: theme.palette.background.paper,
    padding: '0px',
    display: 'flex',
    margin: '-12px -24px -24px -24px',
  },
  mailinboxes: {
    background: theme.palette.background.paper,
    flex: '360px',
    boxShadow: '1px 0 1px 0 rgba(0, 0, 0, 0.12)',
    zIndex: '4',
    padding: '0px',
    // [theme.breakpoints.down('sm')]: {
    //     display:'none'
    // }
  },
  mailwrapper: {
    display: 'flex',
    flex: '100vw',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: '-260px',
  },
  mailcontent: {
    padding: '0',
    zIndex: '3',
    flex: 'calc(100vw - 620px)',
  },
  listitemchip: {
    float: 'right',
    '& svg': {
      width: '16px',
      height: '16px',
      marginRight: '2px',
      verticalAlign: 'text-bottom',
    },
  },
  listitemmsg: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    background: theme.palette.error.main,
  },
  mailinboxelist: {
    '& > div': {
      paddingTop: '12px',
      paddingBottom: '12px',
      alignItems: 'flex-start',
      '& > div': {
        marginTop: '0px',
        marginBottom: '0px',
        position: 'relative',
      },
    },
  },
  listitemtitle: {
    display: 'inline-block',
    '& svg': {
      width: '12px',
      height: '12px',
      marginLeft: '5px',
    },
  },
  search: {
    position: 'relative',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '200px',
  },
  replayInput: {
    padding: '20px 15px',
    background: theme.palette.background.default,
    borderRadius: '4px',
  },
  mailinboxesheader: {
    padding: '10px 10px',
    boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.12)',
  },
  mailinboxesfooter: {
    padding: '10px 10px',
    boxShadow: '0 -1px 0 0 rgba(0, 0, 0, 0.12)',
  },
  mailinboxread: {
    padding: '25px 25px',
  },
  ScrollHeightmessage: {
    height: 'calc(100vh - 130px)',
  },
  ScrollHeightinbox: {
    height: 'calc(100vh - 220px)',
  },
  recevemail: {
    background: theme.palette.primary.main,
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '20px 20px 20px 0px',
    width: 'fit-content',
  },
  sentemail: {
    background: theme.palette.background.default,
    padding: '10px 20px',
    borderRadius: '20px 20px 0px 20px',
    width: 'fit-content',
    float: 'right',
  },
}));

const Chat = ({chatbox}) => {
  const classes = useStyles();
  const { getChatMessage, postChatMessage, fetchChatBox } = useShare();
  const [chatboxs, setChatboxs] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedChatbox, setSelectedChatbox] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrollEl, setScrollEl] = useState();
  const {
    user: { account },
  } = useAuth();

  const fetchChatBoxList1 = async (chatboxId) => {
    const data = await fetchChatBox();
    setChatboxs(data);
  };

  const fetchChatMessage = async (chatboxId) => {
    const data = await getChatMessage(chatboxId);
    setChatMessages(data);
  };

  useEffect(()=>{
    fetchChatMessage(chatbox.id);
    setSelectedChatbox(chatbox);
    fetchChatBoxList1();
  },[chatbox])

  const handleSendMessage = async (e) => {
    if (message === '') return;
    if (e.key === 'Enter') {
      setIsLoading(true);
      setMessage('');
      await postChatMessage(selectedChatbox.id, message);
      setIsLoading(false);
    }
  };

  const handleSendMessageClick = async () => {
    if (message === '') return;
    setIsLoading(true);
    setMessage('');
    await postChatMessage(selectedChatbox.id, message);
    setIsLoading(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return moment(d).fromNow();
    return moment(d).format('HH:mm - DD/MM');
  };

  function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
  }

  const scrollToBottom = () => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight + 100;
    }
  };



  useEffect(() => {
    scrollToBottom();
    const timestamp = Math.floor(Date.now() / 1000);
    const dbRef = collection(db, 'chatbox');
    const q = query(dbRef, where('datetime', '>', timestamp));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          console.log(data);
          if (data.roomId === selectedChatbox.id) {
            const newMessage = {
              id: data.latestMessageId,
              fullname: data.fullname,
              content: decodeEntities(data.message),
              avatar_url: data.avatarUrl,
              account_id: data.accountId || '',
              created_date: data.datetime * 1000,
            };
            setTimeout(() => {
              scrollToBottom();
            }, 100);
            setChatMessages((prev) => [newMessage, ...prev]);
          } else {
            fetchChatBoxList1();
          }
        }
      });
    });
    return unsubscribe;
  }, [selectedChatbox.id]);

  return (
    <div className={classes.mailroot} style={{maxHeight:250}}>
      <div className={classes.mailwrapper} style={{maxHeight:250}}>
        
        <div className={classes.mailcontent} style={{maxHeight:250}}>
          <div className={classes.mailinboxesheader} style={{maxHeight:250}}>
            <Grid container alignItems="center" spacing={0}>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  {/* <Grid item>
                    <Avatar color="primary">JD</Avatar>
                  </Grid> */}
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" component="div" variant="subtitle1">
                      {selectedChatbox.title}
                    </Typography>
                    <Typography align="left" component="div" variant="subtitle2">
                      {selectedChatbox?.description?.split('-')[1]}<br/>
                      {selectedChatbox?.description?.split('-')[2]}<br/>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
             
            </Grid>
          </div>
          <PerfectScrollbar className={classes.ScrollHeightinbox} containerRef={setScrollEl}  style={{maxHeight:420}}>
            <div className={classes.mailinboxread}>
              <Grid container spacing={3}>
                {chatMessages
                  ?.slice(0)
                  .reverse()
                  .map((chatMessage, index) => {
                    if (chatMessage?.account_id === account.id) {
                      return (
                        <Grid item xs={12} key={index}>
                          <Grid container spacing={0} justifyContent="flex-end">
                            <Grid item xs={12} sm={8}>
                              <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs zeroMinWidth>
                                  <Grid container justifyContent="flex-end">
                                    <Typography component="div" variant="subtitle2">
                                      {formatDate(chatMessage.created_date)}
                                    </Typography>
                                    <Box ml={2} />
                                    <Typography component="div" variant="subtitle2">
                                      {chatMessage.fullname}
                                    </Typography>
                                  </Grid>
                                  <div className={classes.sentemail}>
                                    <Typography align="left" component="div" variant="body2">
                                      {chatMessage.content}
                                    </Typography>
                                  </div>
                                </Grid>
                                <Grid item>
                                  <Avatar src={chatMessage.avatar_url}>AW</Avatar>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid item xs={12} key={index}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={8}>
                              <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                  <Avatar src={chatMessage.avatar_url} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                  <Grid container justifyContent="flex-start">
                                    <Typography component="div" variant="subtitle2">
                                      {chatMessage.fullname}
                                    </Typography>
                                    <Box ml={2} />
                                    <Typography component="div" variant="subtitle2">
                                      {formatDate(chatMessage.created_date)}
                                    </Typography>
                                  </Grid>
                                  <div className={classes.recevemail}>
                                    <Typography align="left" component="div" variant="body2">
                                      {chatMessage.content}
                                    </Typography>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </PerfectScrollbar>
          <div className={classes.mailinboxesfooter}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs zeroMinWidth>
                <InputBase
                  placeholder="Nhập nội dung..."
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  classes={{
                    input: classes.replayInput,
                  }}
                  onKeyPress={handleSendMessage}
                />
              </Grid>
              <Grid item>
                <Fab color="primary" size="medium" disabled={isLoading} onClick={handleSendMessageClick}>
                  {isLoading ? <CircularProgress size={24} /> : <Send />}
                </Fab>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
