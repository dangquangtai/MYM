import React from 'react';
import { useSelector } from 'react-redux';
import { getUrlByAction } from './../../../utils/utils';
import BookingWrapper from './../../Booking/index';
import AccountWrapper from '../../Account';
import DepartmentWrapper from '../../Department';
import RoleWrapper from '../../Role';
import { Grid } from '@material-ui/core';
import { gridSpacing, accountActions, departmentActions, roleActions } from './../../../store/constant';
import MentorWrapper from '../../Mentor';
import Summnary from './../Summary/index';
import FullCalendar from '../../Booking/FullCalendar/index';
import CodeWrapper from './../../Code/index';
import BatchWrapper from './../../Batch/index';
import { Redirect } from 'react-router-dom';

const Default = () => {
  const { selectedFolder } = useSelector((state) => state.folder);
  const { projects } = useSelector((state) => state.project);
  const { selectedApp } = useSelector((state) => state.app);

  const availableAccountEndpoint = Object.values(accountActions);
  const availableDepartmentEndpoint = Object.values(departmentActions);

  const availableRoleEndpoint = Object.values(roleActions);

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
        </Grid>
      )}
    </Grid>
  );
};

export default Default;
