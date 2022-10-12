export const gridSpacing = 3;
export const drawerWidth = 320;
export const drawerWidthIcon = 120;
export const comanyCode = 'MYM';
export const apiEndpoints = {
  upload: '/upload',
  authenticate: '/Primary/?FlowAlias=bs_api_user_authenticate&action=api',
  login: '/Primary/?FlowAlias=portal_api_sgin_sign_in&action=api',
  home: '/Primary/?FlowAlias=portal_api_home_get_home_page&outputtype=RawJson&action=api',
  menu: '/Primary/?FlowAlias=portal_api_home_get_menu&outputtype=RawJson&action=api',
  get_project_list: '/Primary/?FlowAlias=bs_menu_api_get_project_list&action=api',
  get_app_list: '/Primary/?FlowAlias=bs_menu_api_get_list_app&action=api',
  get_folders: '/Primary/?FlowAlias=bs_menu_api_get_menu_tree&action=api',
  get_metadata: '/Primary/?FlowAlias=bs_api_mym_get_meta_data&action=api',
  // account
  get_all_account: '/Primary/?FlowAlias=hnn_acco_api_get_all_account_by_page&action=api',
  get_all_inaccount: '/Primary/?FlowAlias=hnn_acco_api_get_all_inaccount_by_page&action=api',
  get_all_account_by_department: '/Primary/?FlowAlias=hnn_api_get_all_acount_by_department&action=api',
  get_account_detail: '/Primary/?FlowAlias=hnn_api_booking_get_account_by_id&action=api',
  create_account: '/Primary/?FlowAlias=hnn_api_booking_user_create_account&action=api',
  update_account: '/Primary/?FlowAlias=hnn_api_booking_user_update_account&action=api',
  active_account: '/Primary/?FlowAlias=hnn_api_user_active_account&action=api',
  get_all_task: '/Primary/?FlowAlias=hnn_api_booking_get_all_task&action=api',
  get_all_account_list: '/Primary/?FlowAlias=hnn_api_booking_user_get_all_account&action=api',

  //role template
  get_all_active_role_template: '/Primary/?FlowAlias=hnn_api_role_get_all_active_role_template_by_page&action=api',
  active_role_template: '/Primary/?FlowAlias=hnn_api_role_active_role&action=api',
  get_detail_role_template: '/Primary/?FlowAlias=hnn_api_role_get_detail_role_template&action=api',
  get_all_inactive_role_template: '/Primary/?FlowAlias=hnn_api_role_get_all_inactive_role_template_by_page&action=api',
  create_role_template: '/Primary/?FlowAlias=hnn_api_role_create_role&action=api',
  get_all_group: '/Primary/?FlowAlias=hnn_api_role_get_all_group&action=api',

  add_account_to_group: '/Primary/?FlowAlias=bs_api_user_add_acount_to_group&action=api',
  remove_account_to_group: '/Primary/?FlowAlias=bs_api_user_remove_account_from_group&action=api',
  //department

  sync_group_for_department: '/Primary/?FlowAlias=hnn_api_role_sync_group_for_department&action=api',
  get_tree_view_data: '/Primary/?FlowAlias=bs_api_dept_get_tree_view_data&action=api',
  get_all_active_department: '/Primary/?FlowAlias=hnn_api_dept_get_all_active_department_by_page&action=api',
  get_all_inactive_department: '/Primary/?FlowAlias=hnn_api_dept_get_all_inactive_department_by_page&action=api',
  deactive_department: '/Primary/?FlowAlias=hnn_api_booking_user_deactive_department&action=api',
  create_department: '/Primary/?FlowAlias=hnn_api_booking_user_create_department&action=api',
  update_department: '/Primary/?FlowAlias=hnn_api_booking_user_update_department&action=api',
  get_department_list: '/Primary/?FlowAlias=hnn_api_booking_user_get_department_list&action=api',
  get_department_type_list: '/Primary/?FlowAlias=hnn_api_booking_user_get_department_type_list&action=api',
  get_department_detail: '/Primary/?FlowAlias=hnn_api_booking_department_get_detail_department_by_name&action=api',

  // Meida
  // // Playlist
  get_all_active_playlist: '/Primary/?FlowAlias=bs_media_api_get_list_playlist_active&action=api',
  get_all_inactive_playlist: '/Primary/?FlowAlias=bs_media_api_get_list_playlist_inactive&action=api',
  get_playlist_detail: '/Primary/?FlowAlias=bs_media_api_get_playlist_detail_by_id&action=api',
  create_playlist: '/Primary/?FlowAlias=bs_media_api_create_new_playlist&action=api',
  update_playlist: '/Primary/?FlowAlias=bs_media_api_update_playlist&action=api',
  set_active_playlist: '/Primary/?FlowAlias=bs_media_api_set_active_playlist&action=api',
  // // Podcast
  get_all_active_podcast: '/Primary/?FlowAlias=bs_media_api_get_list_podcast_active&action=api',
  get_all_inactive_podcast: '/Primary/?FlowAlias=bs_media_api_get_list_podcast_inactive&action=api',
  get_podcast_detail: '/Primary/?FlowAlias=bs_media_api_get_podcast_detail_by_id&action=api',
  create_podcast: '/Primary/?FlowAlias=bs_media_api_create_podcast&action=api',
  update_podcast: '/Primary/?FlowAlias=bs_media_api_update_podcast&action=api',
  set_featured_podcast: '/Primary/?FlowAlias=bs_media_api_set_featured_podcast&action=api',
  set_active_podcast: '/Primary/?FlowAlias=bs_media_api_set_active_podcast&action=api',

  get_counseling_categoies: '/Primary/?FlowAlias=bs_partner_api_get_counseling_categoies&action=api',
  // // Episode
  get_all_active_episode: '/Primary/?FlowAlias=bs_media_api_get_list_episode_active&action=api',
  get_all_inactive_episode: '/Primary/?FlowAlias=bs_media_api_get_list_episode_inactive&action=api',
  get_episode_detail: '/Primary/?FlowAlias=bs_media_api_get_episode_detail_by_id&action=api',
  create_episode: '/Primary/?FlowAlias=bs_media_api_create_episode&action=api',
  update_episode: '/Primary/?FlowAlias=bs_media_api_update_episode&action=api',
  set_active_episode: '/Primary/?FlowAlias=bs_media_api_set_active_episode&action=api',

  // Partner
  // // Mentor
  get_mentor_list_by_category_id: '/Primary/?FlowAlias=bs_api_partner_get_all_mentor&action=api',
  get_all_active_mentor: '/Primary/?FlowAlias=bs_api_partner_get_all_active_mentor&action=api',
  get_all_inactive_mentor: '/Primary/?FlowAlias=bs_api_partner_get_all_inactive_mentor&action=api',
  get_mentor_detail: '/Primary/?FlowAlias=bs_api_private_partner_get_mentor_detail_by_id&action=api',
  create_mentor: '/Primary/?FlowAlias=bs_api_partner_create_mentor&action=api',
  update_mentor: '/Primary/?FlowAlias=bs_api_partner_update_mentor&action=api',
  set_active_mentor: '/Primary/?FlowAlias=bs_api_partner_set_active_mentor&action=api',
  generate_timeslot: '/Primary/?FlowAlias=bs_api_partner_generate_timeslot&action=api',
  set_featured_mentor: '/Primary/?FlowAlias=bs_api_partner_set_featured_mentor&action=api',
  get_timeslot_by_mentor_id: '/Primary/?FlowAlias=bs_api_inventory_get_timeslot_by_mentor_id&action=api',
  get_mentor_list: '/Primary/?FlowAlias=bs_api_partner_get_mentor_list&action=api',
  // // Partner
  get_all_active_partner: '/Primary/?FlowAlias=bs_api_partner_get_all_active_partner&action=api',

  // // Counseling Category
  get_all_active_counseling_category:
    '/Primary/?FlowAlias=bs_api_partner_get_all_active_counseling_category&action=api',
  get_all_inactive_counseling_category:
    '/Primary/?FlowAlias=bs_api_partner_get_all_inactive_counseling_category&action=api',
  get_counseling_category_detail: '/Primary/?FlowAlias=bs_api_partner_get_counseling_category_detail&action=api',
  create_counseling_category: '/Primary/?FlowAlias=bs_api_partner_create_counseling_category&action=api',
  update_counseling_category: '/Primary/?FlowAlias=bs_api_partner_update_counseling_category&action=api',

  get_career_and_topic: '/Primary/?FlowAlias=bs_api_partner_get_career_and_topic&action=api',

  // // List Mentor
  get_all_list_mentor: '/Primary/?FlowAlias=bs_api_partner_get_all_list_mentor&action=api',
  get_list_mentor_detail: '/Primary/?FlowAlias=bs_api_partner_get_list_mentor_detail&action=api',
  create_list_mentor: '/Primary/?FlowAlias=bs_api_partner_create_list_mentor&action=api',
  update_list_mentor: '/Primary/?FlowAlias=bs_api_partner_update_list_mentor&action=api',
  set_active_list_mentor: '/Primary/?FlowAlias=bs_api_partner_set_active_list_mentor&action=api',
  set_featured_list_mentor: '/Primary/?FlowAlias=bs_api_partner_set_featured_list_mentor&action=api',

  // // Booking
  get_log_data: '/Primary/?FlowAlias=bs_api_counselling_get_log_activity_list_by_counselling_id&action=api',
  get_counselted_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_counselling_get_completed_counselling_list&action=api',
  get_uncompleted_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_counselling_get_uncompleted_counselling_list&action=api',
  get_cancel_counselling_list_by_page: '/Primary/?FlowAlias=bs_api_counselling_get_cancel_counselling_list&action=api',
  get_handle_counselling_list_by_page: '/Primary/?FlowAlias=bs_api_counselling_get_handle_counselling_list&action=api',
  get_booking_detail: '/Primary/?FlowAlias=bs_api_counselling_get_counselling_detail&action=api',
  get_counselling_by_evnet_id: '/Primary/?FlowAlias=bs_api_booking_get_counselling_list_by_event_id&action=api',

  get_mentors_list_by_career_category_id:
    '/Primary/?FlowAlias=bs_api_partner_get_list_mentor_by_counseling_category_id&action=api',
  update_booking: '/Primary/?FlowAlias=bs_api_counselling_update_infor_counselling&action=api',
  get_list_counselling: '/Primary/?FlowAlias=bs_api_counselling_get_list_by_page&action=api',
  update_booking_mentor: '/Primary/?FlowAlias=bs_api_counselling_update_mentor_and_timeslot&action=api',
  set_note_booking: '/Primary/?FlowAlias=bs_api_counselling_update_note&action=api',
  get_list_note: '/Primary/?FlowAlias=bs_api_counselling_get_note_list&action=api',
  review_booking: '/Primary/?FlowAlias=bs_api_counselling_review_booking&action=api',
  cancel_counselling: '/Primary/?FlowAlias=bs_api_counselling_cancel_counselling_by_id&action=api',
  get_mentor_detail_by_id: '/Primary/?FlowAlias=bs_api_private_partner_get_mentor_detail_by_id&action=api',

  // Marketing
  // // Batch
  get_all_active_batch: '/Primary/?FlowAlias=bs_api_marketing_get_all_active_batch&action=api',
  get_all_inactive_batch: '/Primary/?FlowAlias=bs_api_marketing_get_all_inactive_batch&action=api',
  get_batch_detail: '/Primary/?FlowAlias=bs_api_marketing_get_batch_detail_by_id&action=api',
  create_batch: '/Primary/?FlowAlias=bs_api_marketing_create_batch&action=api',
  set_active_batch: '/Primary/?FlowAlias=bs_api_marketing_set_active_batch&action=api',
  update_batch: '/Primary/?FlowAlias=bs_api_marketing_update_batch&action=api',
  generate_voucher: '/Primary/?FlowAlias=bs_api_marketing_generate_voucher&action=api',
  send_email_voucher: '/Primary/?FlowAlias=bs_api_marketing_send_email_voucher&action=api',

  // // Voucher
  get_all_active_voucher: '/Primary/?FlowAlias=bs_api_marketing_get_all_active_voucher&action=api',
  get_all_inactive_voucher: '/Primary/?FlowAlias=bs_api_marketing_get_all_inactive_voucher&action=api',
  set_active_voucher: '/Primary/?FlowAlias=bs_api_marketing_set_active_voucher&action=api',
  assign_voucher: '/Primary/?FlowAlias=bs_api_marketing_assign_voucher&action=api',

  // // Event
  get_online_event: '/Primary/?FlowAlias=bs_api_marketing_private_get_online_event_list_by_page&action=api',
  get_offline_event: '/Primary/?FlowAlias=bs_api_marketing_private_get_offline_event_list_by_page&action=api',
  create_event: '/Primary/?FlowAlias=bs_api_marketing_create_event&action=api',
  get_detail_event: '/Primary/?FlowAlias=bs_api_marketing_private_get_event_detail&action=api',
  update_event: '/Primary/?FlowAlias=bs_api_marketing_update_event&action=api',
  set_active_event: '/Primary/?FlowAlias=bs_api_marketing_active_event&action=api',
  // // Event Category
  get_event_category: '/Primary/?FlowAlias=bs_api_marketing_get_event_category_list_by_page&action=api',
  create_event_category: '/Primary/?FlowAlias=bs_api_marketing_create_new_event_category&action=api',
  get_detail_event_category: '/Primary/?FlowAlias=bs_api_marketing_get_event_category_detail&action=api',
  update_event_category: '/Primary/?FlowAlias=bs_api_marketing_update_event_category&action=api',
  get_event_category_list: '/Primary/?FlowAlias=bs_api_marketing_get_event_category_list&action=api',

  // Payment
  // // Prepaid Card Batch
  get_all_prepaid_card_batch: '/Primary/?FlowAlias=bs_api_payment_get_all_prepaid_card_batch&action=api',
  get_prepaid_card_batch_detail: '/Primary/?FlowAlias=bs_api_payment_get_prepaid_card_batch_detail_by_id&action=api',
  create_prepaid_card_batch: '/Primary/?FlowAlias=bs_api_payment_create_prepaid_card_batch&action=api',
  set_active_prepaid_card_batch: '/Primary/?FlowAlias=bs_api_payment_set_active_prepaid_card_batch&action=api',
  generate_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_generate_prepaid_card&action=api',
  send_email_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_send_email_prepaid_card&action=api',

  // // Prepaid Card
  get_all_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_get_all_prepaid_card&action=api',
  set_active_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_set_active_prepaid_card&action=api',
  assign_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_assign_prepaid_card&action=api',
};
export const apiDomain = 'https://upload.truebpm.vn';
// export const apiDomain = 'http://localhost:4000'

export const roleActions = {
  list_active_role: 'HNN_ACTIONE_OPEN_ACTIVE_ROLE_TEMPLATE_LIST',
  list_inactive_role: 'HNN_ACTIONE_OPEN_INACTIVE_ROLE_TEMPLATE_LIST',
  list_role: 'HNN_ACTION_OPEN_ROLE_LIST',
};
export const accountActions = {
  list_active_user: 'HNN_ACTION_OPEN_ACTIVE_USER_LIST',
  list_inactive_user: 'HNN_ACTION_OPEN_INACTIVE_USER_LIST',
};
export const departmentActions = {
  list_active_department: 'HNN_ACTION_OPEN_ACTIVE_DEPT_LIST',
  list_inactive_department: 'HNN_ACTION_OPEN_INACTIVE_DEPT_LIST',
};

export const playlistActions = {
  active_list: 'MYM_MEDIA_PODCAST_OPEN_PLAYLIST_LIST',
  inactive_list: 'MYM_MEDIA_PODCAST_OPEN_INACTIVE_PLAYLIST_LIST',
};

export const podcastActions = {
  active_list: 'MYM_MEDIA_PODCAST_OPEN_PODCAST_LIST',
  inactive_list: 'MYM_MEDIA_PODCAST_OPEN_INACTIVE_PODCAST_LIST',
};
export const eventActions = {
  online_list: 'MYM_MARKETING_EVENT_OPEN_ONLINE_EVENT_LIST',
  offline_list: 'MYM_MARKETING_EVENT_OPEN_OFFLINE_EVENT_LIST',
};
export const eventcategoryActions = {
  list: 'MYM_MARKETING_EVENT_OPEN_EVENT_CATEGORY_LIST',
};
export const episodeActions = {
  active_list: 'MYM_MEDIA_PODCAST_OPEN_EPISODE_LIST',
  inactive_list: 'MYM_MEDIA_PODCAST_OPEN_INACTIVE_EPISODE_LIST',
};

export const mentorActions = {
  active_list: 'MYM_PARTNER_MENTOR_OPEN_MENTOR_LIST',
  inactive_list: 'MYM_PARTNER_MENTOR_OPEN_INACTIVE_MENTOR_LIST',
};

export const counsellingActions = {
  completed_list: 'MYM_BOOKING_COUNSELING_OPEN_COMPLETED_COUNSELLING_LIST',
  all_list: 'MYM_BOOKING_COUNSELING_OPEN_COUNSELLING_LIST',
  cancel_list: 'MYM_BOOKING_COUNSELING_OPEN_CANCEL_COUNSELLING_LIST',
  handle_list: 'MYM_BOOKING_COUNSELING_OPEN_HANDLE_COUNSELLING_LIST',
  uncompleted_list: 'MYM_BOOKING_COUNSELING_OPEN_UNCOMPLETED_COUNSELING_LIST',
};

export const batchActions = {
  active_list: 'MYM_MARKETING_VOUCHER_OPEN_ACTIVE_BATCH_LIST',
  inactive_list: 'MYM_MARKETING_VOUCHER_OPEN_INACTIVE_BATCH_LIST',
};

export const voucherActions = {
  active_list: 'MYM_MARKETING_VOUCHER_OPEN_ACTIVE_VOUCHER_LIST',
  inactive_list: 'MYM_MARKETING_VOUCHER_OPEN_INACTIVE_VOUCHER_LIST',
};

export const prepaidcardBatchActions = {
  active_list: 'MYM_PAYMENT_PREPAIDCARD_OPEN_BATCH_LIST',
};

export const prepaidcardActions = {
  active_list: 'MYM_PAYMENT_PREPAIDCARD_OPEN_PREPAIDCARD_LIST',
};

export const listMentorActions = {
  active_list: 'MYM_PARTNER_MENTOR_OPEN_LIST_MENTOR_LIST',
};

export const tinyMCESecretKey = '7kiqm5c7crs3mdgf1lgiq973xn7kdxtf6ohasxhmkb2mpc45';
export const pageUrls = {
  dashboard: '/dashboard/default',
};
export const showRootFolder = false;

export const view = {
  floating: {
    createAccount: 'USER_LIST_CREATE_FLOAT_BUTTON',
  },
  user: {
    list: {
      create: 'USER_LIST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'USER_DETAIL_SAVE_FORM_BUTTON',
    },
  },
  department: {
    list: {
      create: 'DEPARTMENT_LIST_CREATE_MENU_BUTTON',
      show_tree: 'DEPARTMENT_LIST_SHOW_TREE_VIEW_BUTTON',
    },
    detail: {
      save: 'DEPARTMENT_LIST_CREATE_FORM_BUTTON',
    },
  },
  role: {
    list: {
      create: 'ROLE_TEMPLATE_LIST_CREATE_MENU_BUTTON',
      select: 'ROLE_LIST_SELECT_DEPARTMENT_BUTTON',
      remove: 'ROLE_LIST_REMOVE_ACCOUNT_MENU_BUTTON',
      addnew: 'ROLE_LIST_ADD_ACCOUNT_MENU_BUTTON',
      sync_department: 'ROLE_TEMPLATE_LIST_SYNC_DEPARTMENT_MENU_BUTTON',
    },
    detail: {},
  },
  playlist: {
    list: {
      create: 'MYM_MEDIA_PODCAST_PLAYLIST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MEDIA_PODCAST_PLAYLIST_SAVE_FORM_BUTTON',
    },
  },
  podcast: {
    list: {
      create: 'MYM_MEDIA_PODCAST_PODCAST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MEDIA_PODCAST_PODCAST_SAVE_FORM_BUTTON',
    },
  },
  episode: {
    list: {
      create: 'MYM_MEDIA_PODCAST_EPISODE_CRETAE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MEDIA_PODCAST_EPISODE_SAVE_FORM_BUTTON',
    },
  },
  mentor: {
    list: {
      create: 'MYM_PARTNER_MENTOR_MENTOR_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_MENTOR_MENTOR_SAVE_FORM_BUTTON',
      workday: 'MYM_PARTNER_MENTOR_WORKDAY_FORM_BUTTON',
      vacation: 'MYM_PARTNER_MENTOR_VACATION_FORM_BUTTON',
      generate_timeslot: 'MYM_PARTNER_MENTOR_MENTOR_GENERATE_TIMESLOT_FORM_BUTTON',
    },
  },
  counselling: {
    list: {
      review: 'MYM_BOOKING_COUNSELING_REVIEW',
      note: 'MYM_BOOKING_COUNSELING_NOTE',
      meeting: 'MYM_BOOKING_COUNSELING_MEETING',
      cancel: 'MYM_BOOKING_COUNSELING_CANCEL_COUNSELLING',
    },
    detail: {
      save: 'MYM_BOOKING_COUNSELING_SAVE_FORM_BUTTON',
    },
  },
  batch: {
    list: {
      create: 'MYM_MARKETING_VOUCHER_BATCH_CREATE_MENU_BUTTON',
      send_email: 'MYM_MARKETING_VOUCHER_BATCH_SEND_EMAIL_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MARKETING_VOUCHER_BATCH_SAVE_FORM_BUTTON',
      generate: 'MYM_MARKETING_VOUCHER_BATCH_GENERATE_FORM_BUTTON',
      import: 'MYM_MARKETING_VOUCHER_BATCH_IMPORT_FORM_BUTTON',
    },
  },
  voucher: {
    list: {
      assign: 'MYM_MARKETING_VOUCHER_VOUCHER_ASSIGN_MENU_BUTTON',
    },
  },
  event: {
    list: {
      create: 'MYM_MARKETING_EVENT_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MARKETING_EVENT_SAVE',
    },
  },
  eventcategory: {
    list: {
      create: 'MYM_MARKETING_VOUCHER_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_MARKETING_VOUCHER_CATEGORY_CREATE_FORM_BUTTON',
    },
  },
  prepaidcard: {
    assign: 'MYM_PAYMENT_PREPAIDCARD_ASSIGN_MENU_BUTTON',
  },
  prepaidcardbatch: {
    list: {
      create: 'MYM_PAYMENT_PREPAIDCARD_BATCH_CREATE_MENU_BUTTON',
      send_email: 'MYM_PAYMENT_PREPAIDCARD_BATCH_SEND_EMAIL_MENU_BUTTON',
    },
    detail: {
      generate: 'MYM_PAYMENT_PREPAIDCARD_BATCH_GENERATE_FORM_BUTTON',
      import: 'MYM_PAYMENT_PREPAIDCARD_BATCH_IMPORT_FORM_BUTTON',
    },
  },
  mentorlist: {
    list: {
      create: 'MYM_PARTNER_MENTOR_MENTORLIST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_MENTOR_MENTORLIST_SAVE_FORM_BUTTON',
    },
  },
};
