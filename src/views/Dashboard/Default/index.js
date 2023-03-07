import React from 'react';
import { useSelector } from 'react-redux';
import { getUrlByAction } from './../../../utils/utils';
import AccountWrapper from '../../Account';
import DepartmentWrapper from '../../Department';
import RoleWrapper from '../../Role';
import { Grid } from '@material-ui/core';
import {
  gridSpacing,
  accountActions,
  departmentActions,
  roleActions,
  podcastActions,
  episodeActions,
  playlistActions,
  mentorActions,
  counsellingActions,
  batchActions,
  voucherActions,
  eventActions,
  eventcategoryActions,
  prepaidcardBatchActions,
  prepaidcardActions,
  listMentorActions,
  partnerActions,
  partnerCategoryActions,
  processroleActions,
  fileActions,
  fileCategoryActions,
  fileTypeActions,
  collaborationActions,
  notificationActions,
  notificationMessageActions,
  orderActions,
  counsellingPriceActions,
  departmentDeactiveActions,
  broadcastActions,
  newsActions,
  landingPageActions,
  newsCategoryActions,
  bannerActions,
  bannerListActions,
  newsListActions,
} from './../../../store/constant';
import Summnary from './../Summary/index';
import { Redirect } from 'react-router-dom';
import PodcastWrapper from './../../Podcast/Podcast';
import EpisodeWrapper from './../../Podcast/Episode/index';
import PlaylistWrapper from './../../Podcast/Playlist/index';
import MentorWrapper from './../../Mentor/index';
import BookingWrapper from './../../Booking/index';
import BatchWrapper from './../../Marketing/Batch/index';
import VoucherWrapper from './../../Marketing/Voucher/index';
import EventWrapper from '../../Marketing/Event';
import EventCategoryWrapper from '../../Marketing/EventCategory';
import CardBatchWrapper from './../../Payment/Batch/index';
import PrepaidCardWrapper from './../../Payment/PrepaidCard/index';
import ListMentorWrapper from './../../Partner/ListMentor/index';
import PartnerWrapper from '../../Partner/Partner';
import PartnerCategoryWrapper from '../../Partner/Partner/Partner Category';
import CollaborationWrapper from '../../Collobaration/index';
import ProcessRoleWrapper from '../../ProcessRole';
import FileWrapper from './../../Document/File/index';
import FileCategoryWrapper from './../../Document/FileCategory/index';
import Calendar from './../../Booking/FullCalendar/index';
import BookingDashboard from './../../Booking/Dashboard/index';
import NotificationWrapper from './../../Notification/Category/index';
import NotificationMessageWrapper from './../../Notification/Message/index';
import OrderWrapper from './../../Order/index';
import CounsellingPriceWrapper from '../../Sale/Price';
import FileTypeWrapper from './../../Document/FileType/index';
import DepartmentListWrapper from './../../DepartmentList/index';
import BroadcastWrapper from './../../Broadcast/Broadcast/index';
import NewsWrapper from '../../Site/News/index.js';
import LandingPageWrapper from './../../Site/LandingPage/index';
import NewsCategoryWrapper from '../../Site/NewCategory/index.js';
import BannerWrapper from '../../Website/Banner';
import BannerListWrapper from './../../Website/BannerList/index';
import NewsListWrapper from './../../Site/NewsList/index';

const Default = () => {
  const { selectedFolder } = useSelector((state) => state.folder);
  const { projects } = useSelector((state) => state.project);
  const { selectedApp } = useSelector((state) => state.app);

  const availableAccountEndpoint = Object.values(accountActions);
  const availableDepartmentEndpoint = Object.values(departmentActions);

  const availableRoleEndpoint = Object.values(roleActions);

  const avaiablePlaylistEndpoint = Object.values(playlistActions);
  const availablePodcastEndpoint = Object.values(podcastActions);
  const availableEpisodeEndpoint = Object.values(episodeActions);
  const availableMentorEndpoint = Object.values(mentorActions);
  const availableCounsellingEndpoint = Object.values(counsellingActions);
  const availableBatchEndpoint = Object.values(batchActions);
  const availableVoucherEndpoint = Object.values(voucherActions);
  const availableEventEndpoint = Object.values(eventActions);
  const availableEventCategoryEndpoint = Object.values(eventcategoryActions);
  const availablePrepaidcardBatchEndpoint = Object.values(prepaidcardBatchActions);
  const availablePrepaidcardEndpoint = Object.values(prepaidcardActions);
  const availableListMentorEndpoint = Object.values(listMentorActions);
  const avalablePartnerEndpoint = Object.values(partnerActions);
  const availablePartnerCategoryEndpoint = Object.values(partnerCategoryActions);
  const avaiableProcessRoleEndpoint = Object.values(processroleActions);
  const availableFileEndpoint = Object.values(fileActions);
  const availableFileCategoryEndpoint = Object.values(fileCategoryActions);
  const availableFileTypeEndpoint = Object.values(fileTypeActions);
  const avaiableCollaboratorEndpoint = Object.values(collaborationActions);
  const availableNotificationEndpoint = Object.values(notificationActions);
  const availableNotificationMessageEndpoint = Object.values(notificationMessageActions);
  const availableOrderEndpoint = Object.values(orderActions);
  const availableCounsellingPriceEndpoint = Object.values(counsellingPriceActions);
  const availableDepartmentDeactiveEndpoint = Object.values(departmentDeactiveActions);
  const availableBroadcastEndpoint = Object.values(broadcastActions);
  const availableNewsEndpoint = Object.values(newsActions);
  const availableLandingPageEndpoint = Object.values(landingPageActions);
  const availableNewsCategoryEndpoint = Object.values(newsCategoryActions);
  const availableBannerEndpoint = Object.values(bannerActions);
  const availableBannerListEndpoint = Object.values(bannerListActions);
  const availableNewsListEndpoint = Object.values(newsListActions);

  if (!selectedApp?.id) {
    return <Redirect to="/dashboard/app" />;
  }

  return (
    <Grid container spacing={gridSpacing}>
      {!getUrlByAction(selectedFolder) &&
        selectedFolder?.action !== counsellingActions.calendar &&
        selectedFolder?.action !== counsellingActions.dashboard && <Summnary />}
      {selectedFolder?.action === counsellingActions.calendar && <Calendar />}
      {selectedFolder?.action === counsellingActions.dashboard && <BookingDashboard />}
      {getUrlByAction(selectedFolder) && (
        <Grid item xs={12}>
          {availableAccountEndpoint.includes(selectedFolder?.action) && <AccountWrapper />}
          {availableDepartmentEndpoint.includes(selectedFolder?.action) && <DepartmentWrapper />}
          {availableRoleEndpoint.includes(selectedFolder?.action) && <RoleWrapper />}
          {availablePodcastEndpoint.includes(selectedFolder?.action) && <PodcastWrapper />}
          {availableEpisodeEndpoint.includes(selectedFolder?.action) && <EpisodeWrapper />}
          {avaiablePlaylistEndpoint.includes(selectedFolder?.action) && <PlaylistWrapper />}
          {availableMentorEndpoint.includes(selectedFolder?.action) && <MentorWrapper />}
          {availableCounsellingEndpoint.includes(selectedFolder?.action) && <BookingWrapper />}
          {availableBatchEndpoint.includes(selectedFolder?.action) && <BatchWrapper />}
          {availableVoucherEndpoint.includes(selectedFolder?.action) && <VoucherWrapper />}
          {availableEventEndpoint.includes(selectedFolder?.action) && <EventWrapper />}
          {availableEventCategoryEndpoint.includes(selectedFolder?.action) && <EventCategoryWrapper />}
          {availablePrepaidcardBatchEndpoint.includes(selectedFolder?.action) && <CardBatchWrapper />}
          {availablePrepaidcardEndpoint.includes(selectedFolder?.action) && <PrepaidCardWrapper />}
          {availableListMentorEndpoint.includes(selectedFolder?.action) && <ListMentorWrapper />}
          {avalablePartnerEndpoint.includes(selectedFolder?.action) && <PartnerWrapper />}
          {availablePartnerCategoryEndpoint.includes(selectedFolder?.action) && <PartnerCategoryWrapper />}
          {avaiableProcessRoleEndpoint.includes(selectedFolder?.action) && <ProcessRoleWrapper />}
          {availableFileEndpoint.includes(selectedFolder?.action) && <FileWrapper />}
          {availableFileCategoryEndpoint.includes(selectedFolder?.action) && <FileCategoryWrapper />}
          {availableFileTypeEndpoint.includes(selectedFolder?.action) && <FileTypeWrapper />}
          {avaiableCollaboratorEndpoint.includes(selectedFolder?.action) && <CollaborationWrapper />}
          {availableNotificationEndpoint.includes(selectedFolder?.action) && <NotificationWrapper />}
          {availableNotificationMessageEndpoint.includes(selectedFolder?.action) && <NotificationMessageWrapper />}
          {availableOrderEndpoint.includes(selectedFolder?.action) && <OrderWrapper />}
          {availableCounsellingPriceEndpoint.includes(selectedFolder?.action) && <CounsellingPriceWrapper />}
          {availableDepartmentDeactiveEndpoint.includes(selectedFolder?.action) && <DepartmentListWrapper />}
          {availableBroadcastEndpoint.includes(selectedFolder?.action) && <BroadcastWrapper />}
          {availableNewsEndpoint.includes(selectedFolder?.action) && <NewsWrapper />}
          {availableLandingPageEndpoint.includes(selectedFolder?.action) && <LandingPageWrapper />}
          {availableNewsCategoryEndpoint.includes(selectedFolder?.action) && <NewsCategoryWrapper />}
          {availableBannerEndpoint.includes(selectedFolder?.action) && <BannerWrapper />}
          {availableBannerListEndpoint.includes(selectedFolder?.action) && <BannerListWrapper />}
          {availableNewsListEndpoint.includes(selectedFolder?.action) && <NewsListWrapper />}
        </Grid>
      )}
    </Grid>
  );
};

export default Default;
