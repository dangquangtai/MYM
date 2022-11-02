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
  collaborationActions,
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
  const avaiableCollaboratorEndpoint = Object.values(collaborationActions);
  if (!selectedApp?.id) {
    return <Redirect to="/dashboard/app" />;
  }

  return (
    <Grid container spacing={gridSpacing}>
      {!getUrlByAction(selectedFolder) && <Summnary />}
      {selectedFolder?.action === counsellingActions.calendar && <Calendar />}
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
          {avaiableCollaboratorEndpoint.includes(selectedFolder?.action) && <CollaborationWrapper />}
        </Grid>
      )}
    </Grid>
  );
};

export default Default;
