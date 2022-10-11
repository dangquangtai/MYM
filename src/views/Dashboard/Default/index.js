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

  if (!selectedApp) {
    return <Redirect to="/dashboard/app" />;
  }

  return (
    <Grid container spacing={gridSpacing}>
      {!getUrlByAction(selectedFolder) && projects[0]?.selected && (
        <>
          <Summnary />
        </>
      )}
      {/* {(selectedFolder?.action === bookingActions.full_calendar) && (
        <FullCalendar />
      )} */}
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
        </Grid>
      )}
    </Grid>
  );
};

export default Default;
