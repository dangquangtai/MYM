import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useMediaQuery, useTheme, AppBar, CssBaseline, Toolbar } from '@material-ui/core';
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
import AccountModal from '../../views/Account/Detail';
import MentorModal from '../../views/Mentor/Detail';
import RoleModal from '../../views/Role/Detail';
import DepartmentModal from '../../views/Department/Detail';
import PodcastModal from '../../views/Podcast/Podcast/Detail/index.js';
import EpisodeModal from '../../views/Podcast/Episode/Detail';
import PlaylistModal from '../../views/Podcast/Playlist/Detail/index.js';
import BatchModal from '../../views/Marketing/Batch/Detail/index.js';
import EventCategoryModal from '../../views/Marketing/EventCategory/Detail/index.js';
import EventModal from '../../views/Marketing/Event/Detail';
import VoucherModal from './../../views/Marketing/Voucher/AssignModal/index';
import MentorListModal from './../../views/Partner/ListMentor/Detail/index';
import PartnerModal from '../../views/Partner/Partner/Detail';
import PartnerCategoryModal from '../../views/Partner/Partner/Partner Category/Detail';
import CardBatchModal from './../../views/Payment/Batch/Detail/index';
import CardModal from './../../views/Payment/PrepaidCard/AssignModal/index';
import CardOrderModal from './../../views/Order/AssignModal/index';
import ProcessRoleModal from '../../views/ProcessRole/Detail';
import ProcessRoleUserModal from '../../views/ProcessRole/User';
import ProcessRoleDeptModal from '../../views/ProcessRole/Department';
import FileModal from './../../views/Document/File/Detail/index';
import FileCategoryModal from './../../views/Document/FileCategory/Detail/index';
import CollaboratorModal from '../../views/Collobaration/Detail';
import NotificationCategoryModal from './../../views/Notification/Category/Detail/index';
import NotificationMessageModall from './../../views/Notification/Message/Detail/index';
import OrderModal from '../../views/Order/Detail';
import PriceModal from '../../views/Sale/Price/Detail';
import FileTypeModal from './../../views/Document/FileType/Detail/index';
import DepartmentListModal from '../../views/DepartmentList/Detail';
import BroadcastModal from './../../views/Broadcast/Broadcast/Detail/index';
import NewsModal from './../../views/Site/News/Detail/index';
import LandingPageModal from './../../views/Site/LandingPage/Detail/index';
import NewsCategoryModal from '../../views/Site/NewCategory/Detail/index.js';
import UniveristyModal from '../../views/University/Detail';
import CareerModal from '../../views/Career/Detail';
import CareerListModal from '../../views/Career/ListDetail';
import UniversityListModal from '../../views/University/ListDetail';
import BannerModal from '../../views/Website/Banner/Detail';
import BannerListModal from './../../views/Website/BannerList/Detail/index';
import NewsListModal from './../../views/Site/NewsList/Detail/index';
import CareerCategoryModal from '../../views/Career/Category';
import CounsellingCategoryModal from '../../views/Partner/Counselling Category/Detail';

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
  const {selectedApp} = useSelector((state)=>state.app);
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
        return <DepartmentModal />;
      case 'role':
        return  <RoleModal />;
      case 'batch':
        return <BatchModal />;
      case 'podcast':
        return <PodcastModal />;
      case 'episode':
        return <EpisodeModal />;
      case 'playlist':
        return <PlaylistModal />;
      case 'eventcategory':
        return <EventCategoryModal />;
      case 'event':
        return <EventModal />;
      case 'voucher':
        return <VoucherModal />;
      case 'mentorlist':
        return <MentorListModal />;
      case 'partner':
        return <PartnerModal />;
      case 'partner_category':
        return <PartnerCategoryModal />;
      case 'cardbatch':
        return <CardBatchModal />;
      case 'prepaidcard':
        return <CardModal />;
      case 'processrole':
        return (
          <>
            <ProcessRoleModal />
            <ProcessRoleUserModal />
            <ProcessRoleDeptModal />
          </>
        );
      case 'file':
        return <FileModal />;
      case 'fileCategory':
        return <FileCategoryModal />;
      case 'fileType':
        return <FileTypeModal />;
      case 'collaborator':
        return <CollaboratorModal />;
      case 'notificationCategory':
        return <NotificationCategoryModal />;
      case 'notificationMessage':
        return <NotificationMessageModall />;
      case 'order':
        return <OrderModal />;
      case 'counsellingPrice':
        return <PriceModal />;
      case 'departmentList':
        return <DepartmentListModal />;
      case 'broadcast':
        return <BroadcastModal />;
      case 'news':
        return <NewsModal />;
      case 'landingPage':
        return <LandingPageModal />;
      case 'newsCategory':
        return <NewsCategoryModal />;
      case 'university':
        return <UniveristyModal />;
      case 'career':
        return <CareerModal />;
      case 'careerlist':
        return <CareerListModal />;
      case 'universitylist':
        return <UniversityListModal />
      case 'banner':
        return <BannerModal />;
      case 'bannerList':
        return <BannerListModal />;
      case 'newsList':
        return <NewsListModal />;
      case 'careerCategory':
        return <CareerCategoryModal />
      case 'counsellingCategory':
        return <CounsellingCategoryModal />

    }
  };

  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
 
  React.useEffect(() => {
    setDrawerOpen(false);
  }, [matchUpMd]);

    
  
 
  return (<>
  
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
 
  </>
  );
};

export default MainLayout;
