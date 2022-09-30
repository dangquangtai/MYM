import {
  apiEndpoints,
  accountActions,
  departmentActions,
  roleActions,
  podcastActions,
  episodeActions,
  playlistActions,
  mentorActions,
} from '../store/constant.js';

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
    case playlistActions.active_list: {
      return apiEndpoints.get_all_active_playlist;
    }
    case playlistActions.inactive_list: {
      return apiEndpoints.get_all_inactive_playlist;
    }
    case podcastActions.active_list: {
      return apiEndpoints.get_all_active_podcast;
    }
    case podcastActions.inactive_list: {
      return apiEndpoints.get_all_inactive_podcast;
    }
    case episodeActions.active_list: {
      return apiEndpoints.get_all_active_episode;
    }
    case episodeActions.inactive_list: {
      return apiEndpoints.get_all_inactive_episode;
    }
    case mentorActions.active_list: {
      return apiEndpoints.get_all_active_mentor;
    }
    case mentorActions.inactive_list: {
      return apiEndpoints.get_all_inactive_mentor;
    }

    default: {
      return '';
    }
  }
}
