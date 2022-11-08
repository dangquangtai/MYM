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
  prepaidcardActions,
  prepaidcardBatchActions,
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
} from '../store/constant.js';

export function getUrlByAction(selectedFolder) {
  switch (selectedFolder ? selectedFolder.action : '') {
    case accountActions.list_active_user: {
      return apiEndpoints.get_all_active_account;
    }
    case accountActions.list_inactive_user: {
      return apiEndpoints.get_all_deactive_account;
    }
    case departmentActions.list_active_department: {
      return apiEndpoints.get_all_account_by_department_and_role_template;
    }
    case roleActions.list_active_role: {
      return apiEndpoints.get_all_active_role_template;
    }
    case roleActions.list_inactive_role: {
      return apiEndpoints.get_all_inactive_role_template;
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
    case prepaidcardActions.active_list: {
      return apiEndpoints.get_all_prepaid_card;
    }
    case prepaidcardBatchActions.active_list: {
      return apiEndpoints.get_all_prepaid_card_batch;
    }
    case listMentorActions.active_list: {
      return apiEndpoints.get_all_list_mentor;
    }
    case partnerActions.active_list: {
      return apiEndpoints.get_all_active_partner;
    }
    case partnerActions.inactive_list: {
      return apiEndpoints.get_all_inactive_partner;
    }
    case partnerCategoryActions.active_list: {
      return apiEndpoints.get_all_active_partner_category;
    }

    case processroleActions.list_tree: {
      return apiEndpoints.get_account_list_by_process_role;
    }
    case fileActions.active_list: {
      return apiEndpoints.get_all_active_file;
    }
    case fileActions.inactive_list: {
      return apiEndpoints.get_all_inactive_file;
    }
    case fileCategoryActions.active_list: {
      return apiEndpoints.get_file_category_list;
    }
    case fileTypeActions.active_list: {
      return apiEndpoints.get_file_type_list;
    }
    case collaborationActions.process_list: {
      return apiEndpoints.get_list_collaboration_process;
    }
    case collaborationActions.deprocess_list: {
      return apiEndpoints.get_list_collaboration_deprocess;
    }
    case notificationActions.active_list: {
      return apiEndpoints.get_all_notification_category;
    }
    case notificationMessageActions.active_list: {
      return apiEndpoints.get_all_notification_message;
    }

    case orderActions.booking_list: {
      return apiEndpoints.get_booking_order_list;
    }
    case orderActions.event_list: {
      return apiEndpoints.get_event_order_list;
    }
    case counsellingPriceActions.active_list: {
      return apiEndpoints.get_all_counselling_price;
    }
    default: {
      return '';
    }
  }
}
