import React from 'react';
import { useSelector } from 'react-redux';
import { getUrlByAction } from './../../../utils/utils';
import BookingWrapper from './../../Booking/index';
import AccountWrapper from '../../Account';
import DepartmentWrapper from '../../Department';
import RoleWrapper from '../../Role';
import { Grid } from '@material-ui/core';
import {
  bookingActions,
  gridSpacing,
  accountActions,
  departmentActions,
  mentorActions,
  roleActions,
  codeActions,
  batchActions,

} from './../../../store/constant';
import MentorWrapper from '../../Mentor';
import Summnary from './../Summary/index';
import FullCalendar from '../../Booking/FullCalendar/index';
import CodeWrapper from './../../Code/index';
import BatchWrapper from './../../Batch/index';

const Default = () => {
  const { selectedFolder } = useSelector((state) => state.folder);
  const { projects } = useSelector((state) => state.project);

  const availableBookingEndpoint = Object.values(bookingActions);
  const availableAccountEndpoint = Object.values(accountActions);
  const availableMentorEndpoint = Object.values(mentorActions);
  const availableDepartmentEndpoint = Object.values(departmentActions);

  const availableRoleEndpoint = Object.values(roleActions);

  const availableCodeEndpoint = Object.values(codeActions);
  const availableBatchEndpoint = Object.values(batchActions);

  return (
    <Grid container spacing={gridSpacing}>
      {!getUrlByAction(selectedFolder) && projects[0]?.selected && (
        <>
          <Summnary />

        </>
      )}
      {(selectedFolder?.action === bookingActions.full_calendar) && (
        <FullCalendar />
      )}
      {(getUrlByAction(selectedFolder) && (selectedFolder?.action !== bookingActions.full_calendar) )&& (
        <Grid item xs={12}>
          {availableBookingEndpoint.includes(selectedFolder?.action) && <BookingWrapper />}
          {availableAccountEndpoint.includes(selectedFolder?.action) && <AccountWrapper />}
          {availableDepartmentEndpoint.includes(selectedFolder?.action) && <DepartmentWrapper />}
          {availableMentorEndpoint.includes(selectedFolder?.action) && <MentorWrapper />}

          {availableRoleEndpoint.includes(selectedFolder?.action) && <RoleWrapper />}

          {availableCodeEndpoint.includes(selectedFolder?.action) && <CodeWrapper />}
          {availableBatchEndpoint.includes(selectedFolder?.action) && <BatchWrapper />}

        </Grid>
      )}
    </Grid>
  );
};

export default Default;
