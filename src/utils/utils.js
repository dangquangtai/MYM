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
  departmentDeactiveActions,
  broadcastActions,
  newsActions,
  landingPageActions,
  newsCategoryActions,
  universityActions,
  careerActions,
  bannerActions,
  bannerListActions,
  newsListActions,
  counsellingCategoryActions,
  qnaActions,
  contestActions,
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
    case orderActions.prepaid_list: {
      return apiEndpoints.get_prepaid_card_order_list;
    }
    case counsellingPriceActions.active_list: {
      return apiEndpoints.get_all_counselling_price;
    }
    case departmentDeactiveActions.list_inactive_department: {
      return apiEndpoints.get_department_deactive_list;
    }
    case counsellingActions.high_school_completed_list: {
      return apiEndpoints.get_completed_high_school_counselling_list_by_page;
    }
    case counsellingActions.high_school_cancel_list: {
      return apiEndpoints.get_cancel_high_school_counselling_list_by_page;
    }
    case counsellingActions.high_school_all_list: {
      return apiEndpoints.get_list_high_school_counselling;
    }
    case counsellingActions.high_school_uncompleted_list: {
      return apiEndpoints.get_uncompleted_high_school_counselling_list_by_page;
    }
    case counsellingActions.high_school_new_completed_list: {
      return apiEndpoints.get_completed_high_school_new_counselling_list_by_page;
    }
    case counsellingActions.high_school_new_cancel_list: {
      return apiEndpoints.get_cancel_high_school_new_counselling_list_by_page;
    }
    case counsellingActions.high_school_new_all_list: {
      return apiEndpoints.get_list_high_school_new_counselling;
    }
    case counsellingActions.high_school_new_uncompleted_list: {
      return apiEndpoints.get_uncompleted_high_school_new_counselling_list_by_page;
    }
    case orderActions.pending_booking_list: {
      return apiEndpoints.get_pending_booking_order_list;
    }
    case orderActions.pending_event_list: {
      return apiEndpoints.get_pending_event_order_list;
    }
    case orderActions.pending_prepaid_list: {
      return apiEndpoints.get_prepaid_card_order_pending_list;
    }
    case orderActions.draft_booking_list: {
      return apiEndpoints.get_draft_booking_order_list;
    }
    case orderActions.draft_event_list: {
      return apiEndpoints.get_draft_event_order_list;
    }
    case orderActions.draft_prepaid_list: {
      return apiEndpoints.get_prepaid_card_order_draft_list;
    }
    case broadcastActions.active_list: {
      return apiEndpoints.get_broadcast_list;
    }
    case newsActions.active_list: {
      return apiEndpoints.get_news_list;
    }
    case newsActions.inactive_list: {
      return apiEndpoints.get_inactive_news_list;
    }
    case landingPageActions.active_list: {
      return apiEndpoints.get_landing_page_list;
    }
    case landingPageActions.inactive_list: {
      return apiEndpoints.get_inactive_landing_page_list;
    }
    case newsCategoryActions.active_list: {
      return apiEndpoints.get_news_category_list;
    }

    case universityActions.active_list: {
      return apiEndpoints.get_active_university_list;
    }
    case universityActions.inactive_list: {
      return apiEndpoints.get_inactive_university_list;
    }
    case universityActions.activelist: {
      return apiEndpoints.get_active_universitylist;
    }
    case universityActions.inactivelist: {
      return apiEndpoints.get_inactive_universitylist;
    }
    case careerActions.inactive_list: {
      return apiEndpoints.get_career_inactive_list;
    }
    case careerActions.active_list: {
      return apiEndpoints.get_career_active_list;
    }
    case careerActions.inactivelist: {
      return apiEndpoints.get_careerlist_inactive_list;
    }
    case careerActions.activelist: {
      return apiEndpoints.get_careerlist_active_list;
    }
    case careerActions.categoryinactive: {
      return apiEndpoints.get_inactive_career_category_list;
    }
    case careerActions.categoryactive: {
      return apiEndpoints.get_active_career_category_list;
    }
    case bannerActions.active_list: {
      return apiEndpoints.get_banner_list;
    }
    case bannerActions.inactive_list: {
      return apiEndpoints.get_banner_list_inactive;
    }
    case bannerListActions.active_list: {
      return apiEndpoints.get_bannerlist_list;
    }
    case bannerListActions.inactive_list: {
      return apiEndpoints.get_bannelist_list_inactive;
    }
    case newsListActions.active_list: {
      return apiEndpoints.get_newslist_list;
    }
    case counsellingCategoryActions.active_list: {
      return apiEndpoints.get_counselling_category_list;
    }
    case qnaActions.active_list: {
      return apiEndpoints.get_qna_list;
    }
    case qnaActions.inactive_list: {
      return apiEndpoints.get_qna_list_inactive;
    }
    case contestActions.ueb_meet_mentor: {
      return apiEndpoints.get_meet_ueb_mentor;
    }
    default: {
      return '';
    }
  }
}
