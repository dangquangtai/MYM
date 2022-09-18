import React from 'react';
import { useSelector } from 'react-redux';
import { getUrlByAction } from './../../../utils/utils';
import AccountWrapper from '../../Account';
import DepartmentWrapper from '../../Department';
import RoleWrapper from '../../Role';
import { Grid } from '@material-ui/core';
import { gridSpacing, accountActions, departmentActions, roleActions, podcastActions, episodeActions } from './../../../store/constant';
import Summnary from './../Summary/index';
import { Redirect } from 'react-router-dom';
import PodcastWrapper from './../../Podcast/Podcast';
import EpisodeWrapper from './../../Podcast/Episode/index';

const Default = () => {
  const { selectedFolder } = useSelector((state) => state.folder);
  const { projects } = useSelector((state) => state.project);
  const { selectedApp } = useSelector((state) => state.app);

  const availableAccountEndpoint = Object.values(accountActions);
  const availableDepartmentEndpoint = Object.values(departmentActions);

  const availableRoleEndpoint = Object.values(roleActions);

  const availablePodcastEndpoint = Object.values(podcastActions);
  const availableEpisodeEndpoint = Object.values(episodeActions);

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
        </Grid>
      )}
    </Grid>
  );
};

export default Default;
