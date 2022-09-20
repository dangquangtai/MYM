import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useMediaQuery,
  useTheme,
  AppBar,
  CssBaseline,
  Toolbar,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { drawerWidth } from './../../store/constant';
import Header from './Header';
import Sidebar from './Sidebar';
import FloatingMenu from '../../views/FloatingMenu';
import UploadFile from '../../views/FloatingMenu/UploadFile';
import Loading from './Loading';
import useLoading from './../../hooks/useLoading';
import ConfirmPopup from '../../views/ConfirmPopup';
import DetailDocumentDialog from '../../views/Detail/index.js';
import AccountModal from '../../views/FormAccount';
import MentorModal from '../../views/Mentor/Detail';
import DepartmentModal from '../../views/Department/Detail';
import RoleModal from '../../views/Role/Detail';
import TreeViewModal from '../../views/Department/Tree_View';
import FormModal from '../../views/Role/Form';
import BatchModal from './../../views/Batch/New/index';
import PodcastModal from '../../views/Podcast/Podcast/Detail/index.js';
import EpisodeModal from '../../views/Podcast/Episode/Detail';
import PlaylistModal from '../../views/Podcast/Playlist/Detail/index.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    /*padding: theme.spacing(3),*/
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: `calc(-${drawerWidth}px + 100px )`,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  main: {
    padding: '20px 40px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  header: {
    zIndex: 1201,
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { loading } = useLoading();

  const { documentType } = useSelector((state) => state.document);

  const renderDetailDialog = () => {
    // eslint-disable-next-line default-case
    switch (documentType) {
      case 'booking':
        return <DetailDocumentDialog />;
      case 'account':
        return <AccountModal />;
      case 'mentor':
        return <MentorModal />;
      case 'department':
        return <><TreeViewModal/><DepartmentModal /></>;
      case 'role':
        return <><RoleModal/><FormModal/></> ;
      case 'batch':
        return <BatchModal />;
      case 'podcast': 
        return <PodcastModal />;
      case 'episode':
        return <EpisodeModal />;
      case 'playlist':
        return <PlaylistModal />;

    }
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [matchUpMd]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.header}>
        <Toolbar>
          <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <div className={classes.toolbar} />
        <div className={classes.main}>{children}</div>
        <FloatingMenu />
        <UploadFile />
        {renderDetailDialog()}
      </main>
      {loading && <Loading />}
      <ConfirmPopup />
    </div>
  );
};

export default MainLayout;