import {
  apiEndpoints,
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
    case counsellingActions.completed_list: {
      return apiEndpoints.get_counselted_counselling_list_by_page;
    }
    case counsellingActions.cancel_list: {
      return apiEndpoints.get_cancel_counselling_list_by_page;
    }
    case counsellingActions.handle_list: {
      return apiEndpoints.get_handle_counselling_list_by_page;
    }
    case counsellingActions.all_list: {
      return apiEndpoints.get_list_counselling;
    }
    case counsellingActions.uncompleted_list: {
      return apiEndpoints.get_uncompleted_counselling_list_by_page;
    }
    case batchActions.active_list: {
      return apiEndpoints.get_all_active_batch;
    }
    case batchActions.inactive_list: {
      return apiEndpoints.get_all_inactive_batch;
    }
    case voucherActions.active_list: {
      return apiEndpoints.get_all_active_voucher;
    }
    case eventActions.online_list: {
      return apiEndpoints.get_online_event;
    }
    case eventActions.offline_list: {
      return apiEndpoints.get_offline_event;
    }
    case eventcategoryActions.list: {
      return apiEndpoints.get_event_category;
    }
    default: {
      return '';
    }
  }
}
