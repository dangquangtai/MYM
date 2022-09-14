import { apiEndpoints, accountActions, departmentActions, roleActions } from '../store/constant.js';

export function getUrlByAction(selectedFolder) {
  switch (selectedFolder ? selectedFolder.action : '') {
    case accountActions.list_active_user: {
      return apiEndpoints.get_all_active_account;
    }
    case accountActions.list_inactive_user: {
      return apiEndpoints.get_all_inactive_account;
    }
    case departmentActions.list_active_department: {
      return apiEndpoints.get_all_active_department;
    }
    case departmentActions.list_inactive_department: {
      return apiEndpoints.get_all_inactive_department;
    }

    case roleActions.list_active_role: {
      return apiEndpoints.get_all_active_role_template;
    }
    case roleActions.list_inactive_role: {
      return apiEndpoints.get_all_inactive_role_template;
    }
    case roleActions.list_role: {
      return apiEndpoints.get_all_account_by_department;
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
