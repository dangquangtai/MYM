



import { bookingActions, vibEndpoints, accountActions, mentorActions ,departmentActions, codeActions, batchActions, roleActions} from '../store/constant.js';



export function getUrlByAction(selectedFolder) {
  switch (selectedFolder ? selectedFolder.action : '') {
    case bookingActions.all_list: {
      return vibEndpoints.get_all_booking;
    }
    case bookingActions.handle_list: {
      return vibEndpoints.get_handle_booking;
    }
    case bookingActions.cancel_list: {
      return vibEndpoints.get_cancel_booking;
    }
    case bookingActions.completed_list: {
      return vibEndpoints.get_completed_booking;
    }
    case bookingActions.by_date_list: {
      return vibEndpoints.get_by_date_booking;
    }
    case bookingActions.by_mentor_list: {
      return vibEndpoints.get_by_mentor_booking;
    }
    case bookingActions.full_calendar: {
      return vibEndpoints.get_full_calendar;
    }
    case accountActions.list_active_user: {
      return vibEndpoints.get_all_active_account;
    }
    case accountActions.list_inactive_user: {
      return vibEndpoints.get_all_inactive_account;
    }
    case departmentActions.list_active_department: {
      return vibEndpoints.get_all_active_department;
    }
    case departmentActions.list_inactive_department: {
      return vibEndpoints.get_all_inactive_department;
    }
    case mentorActions.list_active_mentors: {
      return vibEndpoints.get_all_mentors;
    }
    case mentorActions.list_inactive_mentors: {
      return vibEndpoints.get_inactive_mentors;
    }

    case roleActions.list_active_role: {
      return vibEndpoints.get_all_active_role_template;
    }
    case roleActions.list_inactive_role: {
      return vibEndpoints.get_all_inactive_role_template;
    }
    case roleActions.list_role: {
      return vibEndpoints.get_all_account_by_department;
    }

    case codeActions.list_codes: {
      return vibEndpoints.get_all_code;
    }
    case codeActions.list_unused_codes: {
      return vibEndpoints.get_unused_code;
    }
    case batchActions.list_batchs: {
      return vibEndpoints.get_all_batch;
    }


    default: {
      return '';
    }
  }
}

export function getUpdateUrlByAction(selectedFolder) {
  switch (selectedFolder ? selectedFolder.action : '') {
    default: {
      return '';
    }
  }
}
