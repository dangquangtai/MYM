import React from 'react';

import {
  makeStyles,
  Button,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  Divider
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import { subHours } from 'date-fns';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import User1 from './../../../../assets/images/users/avatar-1.jpg';
import useAccount from './../../../../hooks/useAccount';
import useBooking from '../../../../hooks/useBooking';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE, SELECTED_APP_CHANGE } from '../../../../store/actions';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const useStyles = makeStyles((theme) => ({
  grow: {
    flex: 1,
  },
  root: {
    width: '100%',
    maxWidth: '500px',
    minWidth: '500px',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 0,
    borderRadius: '10px',
    [theme.breakpoints.down('lg')]: {
      minWidth: '500px',
      maxHeight: '500px',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '350px',
      minWidth: '300px',
      maxHeight: '700px',
    },
  },
  popper: {
    [theme.breakpoints.down('xs')]: {
      left: '0',
      right: '0',
      top: '55px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      transform: 'none !important',
    },
  },
  inline: {
    display: 'inline',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  subHeader: {
    backgroundColor: theme.palette.grey.A400,
    color: theme.palette.common.white,
    padding: '5px 15px',
  },
  subFooter: {
    backgroundColor: theme.palette.grey.A400,
    color: theme.palette.common.white,
    padding: 0,
  },
  iconButton: {
    padding: '5px',
  },
  showIcon: {
    transform: 'rotate(90deg)',
  },
  listSection: {
    backgroundColor: 'inherit',
    display: 'block',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listAction: {
    top: '22px',
  },
  actionIcon: {
    fontSize: '0.75rem',
    marginRight: '4px',
    color: theme.palette.grey[400],
  },
  actionColor: {
    color: theme.palette.grey[400],
  },
  ScrollHeight: {
    height: '500px',
    overflowX: 'hidden',
    [theme.breakpoints.down('lg')]: {
      // minWidth: '500px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '700px',
    },
  },
  p0: {
    padding: 0,
  },
  pT0: {
    paddingTop: 0,
  },
  menuIIcon: {
    fontSize: '1.5rem',
  },
  menuButton: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '50px',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '35px',
    },
  },
}));

const tasks = [
  {
    assigned_date: '7/21/2022 22:4:13',
    assigned_date_time: null,
    assignment_id: 'e9795bf1-b7b8-44e9-a24d-1ffa1237a494',
    case_object_id: '1599b5f9-9f73-4ec6-acff-ef4c7f39db48',
    customer_name: 'Lê văn hiểu 4',
    data_object_id: 'HNN_000153',
    due_date: null,
    task_url: null,
  },
];

const NotificationSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [taskList, setTask] = React.useState(tasks);

  const { getAllTask } = useAccount();
  const { getBookingDetail } = useBooking();
  const getTask = async () => {
    try {
      let task = await getAllTask();
      setTask(task);
    } catch {
      let task = await getAllTask();
      setTask(task);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    getTask();
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleOpenDetail = async (id) => {
    let detailDocument = await getBookingDetail(id);
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType: 'booking' });
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  React.useEffect(() => {
    getTask();
  }, []);
  return (
    <React.Fragment>
      <Button className={classes.menuButton} color="inherit">
      <AssignmentIndIcon></AssignmentIndIcon>
      </Button>
      <Button
        className={classes.menuButton}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
       
        <NotificationsNoneTwoToneIcon className={classes.menuIIcon} />
        <span>
          <sup
            style={{
              backgroundColor: 'red',
              padding: '3px',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
              borderStartStartRadius: '10px',
              borderEndEndRadius: '5px',
            }}
          >
            {taskList.length}
          </sup>
        </span>
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        className={classes.popper}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: {
            offset: {
              enable: true,
              offset: '0px, 10px',
            },
            preventOverflow: {
              padding: 0,
            },
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List className={classes.root}>
                  <PerfectScrollbar className={classes.ScrollHeight}>
                    {taskList.map(
                      (
                        task,
                        index,
                      ) => (
                        <>
                        <ListItem
                          button
                          alignItems="flex-start"
                          className={classes.pT0}
                          key={index}
                          onClick={() => handleOpenDetail(task.data_object_id)}
                        >
                          <ListItemAvatar>
                            {/* <AssignmentIndIcon
                              style={{
                                fontSize: '40px',
                              }}
                            /> */}
                             <Avatar alt="Cindy Baker" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="subtitle1">{task.task_title}</Typography>}
                            secondary={
                              <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {task.customer_name}
                              </Typography>
                              {task.action_title}
                            </React.Fragment>
                            }
                          />
                       
                        
                          <ListItemSecondaryAction className={classes.listAction}>
                            <Grid container justifyContent="flex-end">
                              <Grid item>
                                <QueryBuilderTwoToneIcon className={classes.actionIcon} />
                              </Grid>
                              <Grid item>
                              <Typography
                               variant="caption"
                               display="block"
                               gutterBottom
                               className={classes.actionColor}
                             >
                                {task.customer_name} Ngày {task.assigned_date}
                             </Typography>
                              </Grid>
                              
                            </Grid>
                          </ListItemSecondaryAction>
                        </ListItem>
                         <Divider variant="inset" component="li" />
                       
                         </>
                      )
                    )}
                  
                  
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default NotificationSection;
