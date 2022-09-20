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

  //Podcast
  get_all_active_playlist: '/Primary/?FlowAlias=bs_media_api_get_list_playlist_active&action=api',
  get_all_inactive_playlist: '/Primary/?FlowAlias=&action=api',
  get_playlist_detail: '/Primary/?FlowAlias=bs_media_api_get_playlist_detail_by_id&action=api',
  create_playlist: '/Primary/?FlowAlias=bs_media_api_create_new_playlist&action=api',
  update_playlist: '/Primary/?FlowAlias=bs_media_api_update_playlist&action=api',

  get_all_active_podcast: '/Primary/?FlowAlias=bs_media_api_get_list_podcast_active&action=api',
  get_all_inactive_podcast: '/Primary/?FlowAlias=bs_media_api_get_list_podcast_inactive&action=api',
  get_podcast_detail: '/Primary/?FlowAlias=bs_media_api_get_podcast_detail_by_id&action=api',
  create_podcast: '/Primary/?FlowAlias=bs_media_api_create_podcast&action=api',
  update_podcast: '/Primary/?FlowAlias=bs_media_api_update_podcast&action=api',

  get_counseling_categoies: '/Primary/?FlowAlias=bs_partner_api_get_counseling_categoies&action=api',
  get_mentor_list_by_category_id: '/Primary/?FlowAlias=bs_api_partner_get_all_mentor&action=api',

  get_all_active_episode: '/Primary/?FlowAlias=bs_media_api_get_list_episode_active&action=api',
  get_all_inactive_episode: '/Primary/?FlowAlias=bs_media_api_get_list_episode_inactive&action=api',
  get_episode_detail: '/Primary/?FlowAlias=bs_media_api_get_episode_detail_by_id&action=api',
  create_episode: '/Primary/?FlowAlias=bs_media_api_create_episode&action=api',
  update_episode: '/Primary/?FlowAlias=bs_media_api_update_episode&action=api',
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

export const episodeActions = {
  active_list: 'MYM_MEDIA_PODCAST_OPEN_EPISODE_LIST',
  inactive_list: 'MYM_MEDIA_PODCAST_OPEN_INACTIVE_EPISODE_LIST',
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
  mentor: {
    list: {
      create: 'MENTOR_LIST_CREATE_MENU_BUTTON',
    },
    form: {
      working: 'MENTOR_DETAIL_WORKDAY_FORM_BUTTON',
      leave: 'MENTOR_DETAIL_LEAVE_FORM_BUTTON',
      save: 'MENTOR_DETAIL_SAVE_FORM_BUTTON',
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
};