export const gridSpacing = 3;
export const drawerWidth = 320;
export const drawerWidthIcon = 120;
export const comanyCode = 'MYM';
export const image_default =
  'https://firebasestorage.googleapis.com/v0/b/meetyourmentor-8ad17.appspot.com/o/Icon%2Ficon_dashbaord.png?alt=media&token=c9ea28a4-3e9e-46ee-8741-425117d9e91e';
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
  get_all_active_account: '/Primary/?FlowAlias=bs_user_api_get_all_active_account_by_page&action=api',
  get_all_deactive_account: '/Primary/?FlowAlias=bs_user_api_get_all_deactive_account_by_page&action=api',
  get_account_detail: '/Primary/?FlowAlias=bs_api_user_get_account_by_id&action=api',
  create_account: '/Primary/?FlowAlias=bs_api_user_create_account_by_host&action=api',
  update_account: '/Primary/?FlowAlias=bs_api_user_update_account_by_id&action=api',
  get_all_account_by_department_and_role_template:
    '/Primary/?FlowAlias=bs_api_user_get_all_acount_by_departmentand_role_template&action=api',
  assign_account_to_dept: '/Primary/?FlowAlias=bs_api_user_api_assign_account_to_department&action=api',
  remove_account_from_dept: '/Primary/?FlowAlias=bs_api_user_api_remove_account_from_department&action=api',
  active_account: '/Primary/?FlowAlias=bs_api_user_active_account&action=api',
  get_account_list_by_process_role: '/Primary/?FlowAlias=bs_api_user_get_list_by_process_role&action=api',
  get_all_task: '/Primary/?FlowAlias=bs_api_process_get_all_task_by_current_user&action=api',
  get_all_department_by_page: '/Primary/?FlowAlias=bs_api_dept_get_all_active_department_by_page&action=api',
  get_department_role_by_group: '/Primary/?FlowAlias=bs_api_dept_get_department_role_by_group_id&action=api',
  get_all_account_list: '/Primary/?FlowAlias=bs_api_booking_user_get_all_account&action=api',
  get_user_profile_by_order_id: '/Primary/?FlowAlias=bs_api_user_get_user_profile_by_order_id&action=api',
  //role template
  get_all_active_role_template:
    '/Primary/?FlowAlias=bs_api_role_template_get_all_active_role_template_by_page&action=api',
  active_role_template: '/Primary/?FlowAlias=bs_api_role_template_active_role_template&action=api',
  get_detail_role_template: '/Primary/?FlowAlias=bs_api_role_template_get_detail_role_template&action=api',
  get_all_inactive_role_template:
    '/Primary/?FlowAlias=bs_api_role_template_get_all_inactive_role_template_by_page&action=api',
  create_role_template: '/Primary/?FlowAlias=bs_api_role_template_create_role_template&action=api',
  update_role_template: '/Primary/?FlowAlias=bs_api_role_template_create_role_template&action=api',

  get_role_tree_data: '/Primary/?FlowAlias=bs_api_process_role_get_tree_data_role&action=api',
  get_all_role_template_by_department_code:
    '/Primary/?FlowAlias=bs_api_dept_get_role_template_by_department_code&action=api',

  get_option_role_template: '/Primary/?FlowAlias=bs_api_role_template_get_optinal_role&action=api',
  add_account_to_group: '/Primary/?FlowAlias=bs_api_user_add_acount_to_group&action=api',
  remove_account_to_group: '/Primary/?FlowAlias=bs_api_user_remove_account_from_group&action=api',

  create_process_role: '/Primary/?FlowAlias=bs_api_process_create_role&action=api',
  update_process_role: '/Primary/?FlowAlias=bs_api_process_update_role&action=api',
  add_user_depart_to_process_role: '/Primary/?FlowAlias=bs_api_process_add_dept_user&action=api',
  remove_user_from_process_role: '/Primary/?FlowAlias=bs_api_process_remove_user&action=api',
  sync_process_role: '/Primary/?FlowAlias=bs_api_process_sync_role_department&action=api',
  remove_dept_from_process_role: '/Primary/?FlowAlias=bs_api_process_remove_dept&action=api',
  get_role_detail: '/Primary/?FlowAlias=bs_api_process_role_get_role_detail_by_role_code&action=api',
  get_process_list: '/Primary/?FlowAlias=bs_get_process_by_app_code&action=api',

  //department

  sync_group_for_department: '/Primary/?FlowAlias=bs_api_role_template_sync_group_for_department&action=api',
  get_tree_view_data: '/Primary/?FlowAlias=bs_api_dept_get_tree_view_data&action=api',

  deactive_department: '/Primary/?FlowAlias=bs_api_dept_deactive_department&action=api',
  create_department: '/Primary/?FlowAlias=bs_api_dept_create_department&action=api',
  update_department: '/Primary/?FlowAlias=bs_api_dept_update_department&action=api',
  get_department_list: '/Primary/?FlowAlias=bs_api_dept_get_department_list&action=api',
  get_department_type_list: '/Primary/?FlowAlias=bs_api_dept_get_department_type_list&action=api',
  get_department_detail: '/Primary/?FlowAlias=bs_api_dept_get_detail_department_by_name&action=api',

  get_dept_list_by_process_role: '/Primary/?FlowAlias=bs_api_dept_get_list_by_process_code&action=api',

  get_all_department_by_page: '/Primary/?FlowAlias=bs_api_dept_get_all_active_department_by_page&action=api',
  get_department_role_by_group: '/Primary/?FlowAlias=bs_api_dept_get_department_role_by_group_id&action=api',
  get_department_deactive_list: '/Primary/?FlowAlias=bs_api_dept_get_all_inactive_department_by_page&action=api',

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
  get_all_active_partner: '/Primary/?FlowAlias=bs_api_partner_get_partner_list_active_by_page&action=api',
  get_all_inactive_partner: '/Primary/?FlowAlias=bs_api_partner_get_partner_list_inactive_by_page&action=api',
  get_partner_detail: '/Primary/?FlowAlias=bs_api_partner_get_partner_detail_by_partner_id&action=api',
  create_partner: '/Primary/?FlowAlias=bs_api_partner_get_new_partner&action=api',
  update_partner: '/Primary/?FlowAlias=bs_api_partner_update_partner&action=api',
  set_active_partner: '/Primary/?FlowAlias=bs_api_partner_set_active_partner&action=api',
  set_featured_partner: '/Primary/?FlowAlias=bs_api_partner_set_featured_partner&action=api',

  // partner category
  get_all_active_partner_category: '/Primary/?FlowAlias=bs_api_partner_get_all_partner_category&action=api',
  create_partner_category: '/Primary/?FlowAlias=bs_api_partner_create_new_partner_category&action=api',
  get_partner_category_detail: '/Primary/?FlowAlias=bs_api_partner_get_partner_category_detail&action=api',
  update_partner_category: '/Primary/?FlowAlias=bs_api_partner_update_partner_category&action=api',

  // // Counseling Category
  get_all_active_counseling_category:
    '/Primary/?FlowAlias=bs_api_partner_get_all_active_counseling_category&action=api',
  get_all_inactive_counseling_category:
    '/Primary/?FlowAlias=bs_api_partner_get_all_inactive_counseling_category&action=api',
  get_counseling_category_detail: '/Primary/?FlowAlias=bs_api_partner_get_counseling_category_detail&action=api',
  create_counseling_category: '/Primary/?FlowAlias=bs_api_partner_create_counseling_category&action=api',
  update_counseling_category: '/Primary/?FlowAlias=bs_api_partner_update_counseling_category&action=api',
  download_data: '/Primary/?FlowAlias=bs_api_booking_export_all_data&action=api',
  get_career_and_topic: '/Primary/?FlowAlias=bs_api_partner_get_career_and_topic&action=api',

  // // List Mentor
  get_all_list_mentor: '/Primary/?FlowAlias=bs_api_partner_get_all_list_mentor&action=api',
  get_list_mentor_detail: '/Primary/?FlowAlias=bs_api_partner_get_list_mentor_detail&action=api',
  create_list_mentor: '/Primary/?FlowAlias=bs_api_partner_create_list_mentor&action=api',
  update_list_mentor: '/Primary/?FlowAlias=bs_api_partner_update_list_mentor&action=api',
  set_active_list_mentor: '/Primary/?FlowAlias=bs_api_partner_set_active_list_mentor&action=api',
  set_featured_list_mentor: '/Primary/?FlowAlias=bs_api_partner_set_featured_list_mentor&action=api',
  get_mentor_by_email: '/Primary/?FlowAlias=bs_api_private_partner_get_mentor_by_email&action=api',
  // // Booking
  get_log_data: '/Primary/?FlowAlias=bs_api_counselling_get_log_activity_list_by_counselling_id&action=api',
  get_counselted_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_counselling_get_completed_counselling_list&action=api',
  get_uncompleted_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_counselling_get_uncompleted_counselling_list&action=api',
  get_cancel_counselling_list_by_page: '/Primary/?FlowAlias=bs_api_counselling_get_cancel_counselling_list&action=api',
  get_handle_counselling_list_by_page: '/Primary/?FlowAlias=bs_api_counselling_get_handle_counselling_list&action=api',

  //Booking_DashBoard
  get_statistic_data: '/Primary/?FlowAlias=bs_api_get_booking_branches_dasboard_data&action=api',

  //High School
  get_completed_high_school_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_high_school_counselling_get_completed_counselling_list&action=api',
  get_uncompleted_high_school_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_high_school_counselling_get_uncompleted_counselling_list&action=api',
  get_cancel_high_school_counselling_list_by_page:
    '/Primary/?FlowAlias=bs_api_high_school_counselling_get_cancel_counselling_list&action=api',
  get_list_high_school_counselling: '/Primary/?FlowAlias=bs_api_high_school_counselling_get_list_by_page&action=api',

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
  get_full_calendar: '/Primary/?FlowAlias=bs_api_counselling_get_full_calendar&action=api',
  get_feedback_detail: '/Primary/?FlowAlias=bs_api_counselling_get_feedback_detail&action=api',

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
  get_all_event: '/Primary/?FlowAlias=bs_api_marketing_get_all_event_list_by_page&action=api',
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
  update_prepaid_card_batch: '/Primary/?FlowAlias=bs_api_payment_update_prepaid_card_batch&action=api',

  // // Prepaid Card
  get_all_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_get_all_prepaid_card&action=api',
  set_active_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_set_active_prepaid_card&action=api',
  assign_prepaid_card: '/Primary/?FlowAlias=bs_api_payment_assign_prepaid_card&action=api',

  // Document
  // // File Category
  get_file_category_list: '/Primary/?FlowAlias=bs_api_document_get_file_category_list_by_page&action=api',
  create_file_category: '/Primary/?FlowAlias=bs_api_document_create_new_file_category&action=api',
  get_detail_file_category: '/Primary/?FlowAlias=bs_api_document_get_file_category_detail&action=api',
  update_file_category: '/Primary/?FlowAlias=bs_api_document_update_file_category&action=api',
  set_active_file_category: '/Primary/?FlowAlias=bs_api_document_set_active_file_category&action=api',
  add_group_file_category: '/Primary/?FlowAlias=bs_api_document_add_group_file_category&action=api',
  remove_group_file_category: '/Primary/?FlowAlias=bs_api_document_remove_group_file_category&action=api',
  get_file_type_and_category: '/Primary/?FlowAlias=bs_api_document_get_file_type_and_category&action=api',
  // // File
  get_all_active_file: '/Primary/?FlowAlias=bs_api_document_get_active_file_list_by_page&action=api',
  get_all_inactive_file: '/Primary/?FlowAlias=bs_api_document_get_inactive_file_list_by_page&action=api',
  create_file: '/Primary/?FlowAlias=bs_api_document_create_new_file&action=api',
  get_detail_file: '/Primary/?FlowAlias=bs_api_document_get_file_detail&action=api',
  update_file: '/Primary/?FlowAlias=bs_api_document_update_file&action=api',
  set_active_file: '/Primary/?FlowAlias=bs_api_document_set_active_file&action=api',
  // // File Type
  get_file_type_list: '/Primary/?FlowAlias=bs_api_document_get_file_type_list_by_page&action=api',
  create_file_type: '/Primary/?FlowAlias=bs_api_document_create_new_file_type&action=api',
  get_detail_file_type: '/Primary/?FlowAlias=bs_api_document_get_file_type_detail&action=api',
  update_file_type: '/Primary/?FlowAlias=bs_api_document_update_file_type&action=api',
  set_active_file_type: '/Primary/?FlowAlias=bs_api_document_set_active_file_type&action=api',

  //EChart
  get_line_chart_data: '/Primary/?FlowAlias=bs_api_get_line_chart_data&action=api',
  get_booking_data_by_career: '/Primary/?FlowAlias=bs_api_get_booking_data_by_career_for_chart&action=api',
  //Collaboration
  get_list_collaboration_process:
    '/Primary/?FlowAlias=bs_api_share_collaborator_get_registration_unverified_list&action=api',
  get_list_collaboration_deprocess:
    '/Primary/?FlowAlias=bs_api_share_collaborator_get_registration_verified_list&action=api',
  get_collaboration_detail: '/Primary/?FlowAlias=bs_api_share_collaborator_get_detail_registration&action=api',
  set_verified: '/Primary/?FlowAlias=bs_api_share_set_verified_collaborator&action=api',

  // Notification
  // // Category
  get_all_notification_category: '/Primary/?FlowAlias=bs_notification_api_get_list_notification_category&action=api',
  get_detail_notification_category:
    '/Primary/?FlowAlias=bs_notification_api_get_detail_notification_category&action=api',
  create_notification_category: '/Primary/?FlowAlias=bs_notification_api_create_new_notification_category&action=api',
  update_notification_category: '/Primary/?FlowAlias=bs_notification_api_update_notification_category&action=api',
  // Message
  get_all_notification_message: '/Primary/?FlowAlias=bs_notification_api_get_list_notification_message&action=api',
  get_detail_notification_message: '/Primary/?FlowAlias=bs_notification_api_get_detail_notification_message&action=api',
  create_notification_message: '/Primary/?FlowAlias=bs_notification_api_create_new_notification_category&action=api',
  update_notification_message: '/Primary/?FlowAlias=bs_notification_api_update_notification_category&action=api',
  add_group_notificaton_message:
    '/Primary/?FlowAlias=bs_notification_api_add_group_for_notification_message&action=api',
  remove_group_notificaton_message:
    '/Primary/?FlowAlias=bs_notification_api_remove_group_for_notification_message&action=api',
  get_all_category: '/Primary/?FlowAlias=bs_notification_api_get_all_category&action=api',
  get_all_account: '/Primary/?FlowAlias=bs_notification_api_get_all_account&action=api',
  create_notification_message: '/Primary/?FlowAlias=bs_notification_api_create_notification_message&action=api',
  update_notification_message: '/Primary/?FlowAlias=bs_notification_api_update_notification_message&action=api',
  set_active_notification_message: '/Primary/?FlowAlias=bs_notification_api_set_active_notification_message&action=api',
  get_list_object_id: '/Primary/?FlowAlias=bs_notification_api_get_list_object&action=api',

  //Order
  get_event_order_list: '/Primary/?FlowAlias=bs_api_sales_get_event_order_list_by_page&action=api',
  get_booking_order_list: '/Primary/?FlowAlias=bs_api_sales_get_booking_order_list_by_page&action=api',
  get_order_detai: '/Primary/?FlowAlias=bs_api_sales_get_order_detail_by_id&action=api',
  get_prepaid_card_order_list: '/Primary/?FlowAlias=bs_api_sales_get_prepaid_card_order_list_by_page&action=api',

  get_pending_event_order_list: '/Primary/?FlowAlias=bs_api_sales_get_event_order_pending_list_by_page&action=api',
  get_pending_booking_order_list: '/Primary/?FlowAlias=bs_api_sales_get_booking_order_pending_list_by_page&action=api',
  get_prepaid_card_order_pending_list:
    '/Primary/?FlowAlias=bs_api_sales_get_prepaid_card_order_pending_list_by_page&action=api',

  get_draft_event_order_list: '/Primary/?FlowAlias=bs_api_sales_get_event_order_draft_list_by_page&action=api',
  get_draft_booking_order_list: '/Primary/?FlowAlias=bs_api_sales_get_booking_order_draft_list_by_page&action=api',
  get_prepaid_card_order_draft_list:
    '/Primary/?FlowAlias=bs_api_sales_get_prepaid_card_order_draft_list_by_page&action=api',

  approve_pending_order: '/Primary/?FlowAlias=bs_api_sales_approve_pending_order_by_id&action=api',

  //  Price
  get_all_counselling_price: '/Primary/?FlowAlias=bs_sale_api_get_counselling_service_price_list&action=api',
  get_detail_counselling_price: '/Primary/?FlowAlias=bs_sale_api_get_detail_counselling_service_price&action=api',
  get_list_counselling_category: '/Primary/?FlowAlias=bs_sale_api_get_list_counselling_category_id&action=api',
  get_list_career_category: '/Primary/?FlowAlias=bs_sale_api_get_list_career_category_id&action=api',
  create_counselling_price: '/Primary/?FlowAlias=bs_sale_api_create_counselling_price&action=api',
  update_counselling_price: '/Primary/?FlowAlias=bs_sale_api_update_counselling_price&action=api',
  set_active_price: '/Primary/?FlowAlias=bs_sale_api_set_active_counselling_price&action=api',

  get_prepaid_card_order: '/Primary/?FlowAlias=bs_api_sale_get_product_and_number_list_by_order_id&action=api',

  // Broadcast
  get_broadcast_list: '/Primary/?FlowAlias=bs_api_broadcast_get_broadcast_list_by_page&action=api',
  get_broadcast_detail: '/Primary/?FlowAlias=bs_api_broadcast_get_broadcast_detail_by_id&action=api',
  create_broadcast: '/Primary/?FlowAlias=bs_api_broadcast_create_broadcast&action=api',
  update_broadcast: '/Primary/?FlowAlias=bs_api_broadcast_update_broadcast&action=api',
  get_category_and_channel: '/Primary/?FlowAlias=bs_api_broadcast_get_category_and_channel&action=api',
  update_new_time_slot: '/Primary/?FlowAlias=bs_api_counselling_update_new_timeslot_meeting&action=api',

  // News
  get_news_list: '/Primary/?FlowAlias=bs_api_news_get_news_list_active_by_page&action=api',
  get_inactive_news_list: '/Primary/?FlowAlias=bs_api_news_get_news_list_inactive_by_page&action=api',
  get_news_detail: '/Primary/?FlowAlias=bs_api_news_get_news_detail_by_id&action=api',
  create_news: '/Primary/?FlowAlias=bs_api_news_create_news&action=api',
  update_news: '/Primary/?FlowAlias=bs_api_news_update_news&action=api',
  get_category: '/Primary/?FlowAlias=bs_api_news_get_category&action=api',
  set_active_news: '/Primary/?FlowAlias=bs_api_news_set_active_news&action=api',
  set_featured_news: '/Primary/?FlowAlias=bs_api_news_set_featured_news&action=api',
  search_published_news: '/Primary/?FlowAlias=bs_api_news_search_published_news_by_page&action=api',
  get_all_news: '/Primary/?FlowAlias=bs_api_news_get_all_news_by_page&action=api',

  // Landing Page
  get_landing_page_list: '/Primary/?FlowAlias=bs_api_site_get_landing_page_list_by_page&action=api',
  get_inactive_landing_page_list: '/Primary/?FlowAlias=bs_api_site_get_landing_page_list_inactive_by_page&action=api',
  get_landing_page_detail: '/Primary/?FlowAlias=bs_api_site_get_landing_page_detail_by_id&action=api',
  create_landing_page: '/Primary/?FlowAlias=bs_api_site_create_landing_page&action=api',
  update_landing_page: '/Primary/?FlowAlias=bs_api_site_update_landing_page&action=api',
  set_active_landing_page: '/Primary/?FlowAlias=bs_api_site_set_active_landing_page&action=api',

  // News Category
  get_news_category_list: '/Primary/?FlowAlias=bs_api_news_get_news_category_list_by_page&action=api',
  get_news_category_detail: '/Primary/?FlowAlias=bs_api_news_get_news_category_detail_by_id&action=api',
  create_news_category: '/Primary/?FlowAlias=bs_api_news_create_news_category&action=api',
  update_news_category: '/Primary/?FlowAlias=bs_api_news_update_news_category&action=api',
  set_active_news_category: '/Primary/?FlowAlias=bs_api_news_set_active_news_category&action=api',

  //University
  get_active_university_list:
    '/Primary/?FlowAlias=bs_api_share_university_get_active_university_list_by_page&action=api',
  get_inactive_university_list:
    '/Primary/?FlowAlias=bs_api_share_university_get_inactive_university_list_by_page&action=api',
  get_university_detail: '/Primary/?FlowAlias=bs_api_share_university_detail_id&action=api',
  get_university_type_list: '/Primary/?FlowAlias=bs_api_share_university_get_type_list&action=api',
  update_university: '/Primary/?FlowAlias=bs_api_share_university_update_detail&action=api',
  active_university: '/Primary/?FlowAlias=bs_api_share_university_active&action=api',
  create_university: '/Primary/?FlowAlias=bs_api_share_university_create_detail&action=api',
  get_inuniversity_list: '/Primary/?FlowAlias=bs_api_university_get_inactive_university_list&action=api',
  //UniversityList
  get_active_universitylist: '/Primary/?FlowAlias=bs_api_university_get_active_universitylist_by_page&action=api',
  get_inactive_universitylist: '/Primary/?FlowAlias=bs_api_university_get_inactive_universitylist_by_page&action=api',
  get_universitylist_detail: '/Primary/?FlowAlias=bs_api_university_get_universitylist_detail&action=api',
  update_universitylist: '/Primary/?FlowAlias=bs_api_university_update_universitylist_detail&action=api',
  active_universitylist: '/Primary/?FlowAlias=bs_api_university_set_active_universitylist&action=api',
  create_universitylist: '/Primary/?FlowAlias=bs_api_university_create_new_universitylist&action=api',
  get_activenewslist: '/Primary/?FlowAlias=bs_api_news_get_active_newslist&action=api',

  //Career
  get_career_active_list: '/Primary/?FlowAlias=bs_api_partner_get_active_career_list_by_page&action=api',
  get_career_inactive_list: '/Primary/?FlowAlias=bs_api_partner_get_inactive_career_list_by_page&action=api',
  get_career_detail: '/Primary/?FlowAlias=bs_api_partner_get_career_detail_by_id&action=api',
  create_career: '/Primary/?FlowAlias=bs_api_partner_create_new_career&action=api',
  update_career: '/Primary/?FlowAlias=bs_api_parter_update_career_by_id&action=api',

  //CareerList
  get_careerlist_active_list: '/Primary/?FlowAlias=bs_api_career_get_active_careerlist_by_page&action=api',
  get_careerlist_inactive_list: '/Primary/?FlowAlias=bs_api_career_get_inactive_careerlist_by_page&action=api',
  get_careerlist_detail: '/Primary/?FlowAlias=bs_api_partner_get_careerlist_detail_by_id&action=api',
  create_careerlist: '/Primary/?FlowAlias=bs_api_partner_create_new_career_list&action=api',
  update_careerlist: '/Primary/?FlowAlias=bs_api_parter_update_career_list_by_id&action=api',
  get_active_list_career: '/Primary/?FlowAlias=bs_api_partner_get_active_list_career&action=api',
  set_active_career: '/Primary/?FlowAlias=bs_api_partner_set_active_career&action=api',
  set_active_career_list: '/Primary/?FlowAlias=bs_api_partner_set_active_career_list&action=api',
  set_featured_career: '/Primary/?FlowAlias=bs_api_partner_set_featured_career_list&action=api',
  get_inactive_career: '/Primary/?FlowAlias=bs_api_career_get_inactive_careerlist&action=api',

  //Banner
  get_banner_list: '/Primary/?FlowAlias=bs_api_site_banner_get_list_banner_active&action=api',
  get_banner_list_inactive: '/Primary/?FlowAlias=bs_api_site_banner_get_list_banner_inactive&action=api',
  get_banner_detai: '/Primary/?FlowAlias=bs_api_site_banner_get_banner_detail&action=api',
  create_new_banner: '/Primary/?FlowAlias=bs_api_site_banner_create_new_banner&action=api',
  update_banner: '/Primary/?FlowAlias=bs_api_site_banner_update_banner&action=api',
  set_active_banner: '/Primary/?FlowAlias=bs_api_site_banner_set_active_banner&action=api',
  get_all_banner: '/Primary/?FlowAlias=bs_api_site_banner_get_all_banner&action=api',

  // BannerList
  get_bannerlist_list: '/Primary/?FlowAlias=bs_api_site_banner_get_list_banner_by_page&action=api',
  get_bannelist_list_inactive: '/Primary/?FlowAlias=bs_api_site_banner_get_list_banner_inactive_by_page&action=api',
  get_bannerlist_detail: '/Primary/?FlowAlias=bs_api_site_banner_get_bannerlist_detail&action=api',
  create_new_bannerlist: '/Primary/?FlowAlias=bs_api_site_banner_create_new_bannerlist&action=api',
  update_bannerlist: '/Primary/?FlowAlias=bs_api_site_banner_update_bannerlist&action=api',

  // NewsList
  get_newslist_list: '/Primary/?FlowAlias=bs_api_news_get_news_list_by_page&action=api',
  get_newslist_detail: '/Primary/?FlowAlias=bs_api_news_get_newslist_detail_by_id&action=api',
  create_new_newslist: '/Primary/?FlowAlias=bs_api_news_create_new_newslist&action=api',
  update_newslist: '/Primary/?FlowAlias=bs_api_news_update_newslist&action=api',
  set_active_newslist: '/Primary/?FlowAlias=bs_api_news_set_active_newslist&action=api',

  //Career Category
  create_career_category: '/Primary/?FlowAlias=bs_api_partner_career_create_career_category&action=api',
  update_career_category: '/Primary/?FlowAlias=bs_api_partner_career_update_career_category&action=api',
  set_active_career_category: '/Primary/?FlowAlias=bs_api_partner_career_set_active_career_category&action=api',
  get_career_category_detail: '/Primary/?FlowAlias=bs_api_partner_career_get_career_category_detail&action=api',
  get_active_career_category_list:
    '/Primary/?FlowAlias=bs_api_partner_career_get_active_career_category_list_by_page&action=api',
  get_inactive_career_category_list:
    '/Primary/?FlowAlias=bs_api_partner_career_get_inactive_career_category_list_by_page&action=api',
  get_career_category_list_key_value:
    '/Primary/?FlowAlias=bs_api_partner_career_get_active_career_category_list&action=api',

  // Counseling Category
  create_counselling_category: '/Primary/?FlowAlias=bs_api_partner_create_new_counseling_category &action=api',
  update_counselling_category: '/Primary/?FlowAlias=bs_api_partner_update_counseling_category&action=api',
  get_counselling_category_detail: '/Primary/?FlowAlias=bs_api_partner_get_counselling_category_detail&action=api',
  get_list_menu_item: '/Primary/?FlowAlias=bs_api_partner_get_list_menu_item&action=api',
  get_counselling_category_list: '/Primary/?FlowAlias=bs_api_partner_get_list_counselling_category&action=api',

  // QnA
  create_qna: '/Primary/?FlowAlias=bs_site_api_create_new_qna &action=api',
  update_qna: '/Primary/?FlowAlias=bs_site_api_update_qna&action=api',
  get_qna_detail: '/Primary/?FlowAlias=bs_site_api_get_qna_detail&action=api',
  get_qna_list: '/Primary/?FlowAlias=bs_site_api_get_list_qna&action=api',
  get_qna_list_inactive: '/Primary/?FlowAlias=bs_site_api_get_list_qna_inactive&action=api',
  get_list_landing_page: '/Primary/?FlowAlias=bs_site_api_get_list_landing_page&action=api',
  get_list_category: '/Primary/?FlowAlias=bs_site_api_get_list_category&action=api',
  get_list_news: '/Primary/?FlowAlias=bs_site_api_get_list_news&action=api',
  get_list_sub_category: '/Primary/?FlowAlias=bs_site_api_get_list_sub_category&action=api',

  //Mentor Import
  import_mentor_data: '/Primary/?FlowAlias=bs_api_mentor_import_data_from_url&action=api',
  get_meet_ueb_mentor: '/Primary/?FlowAlias=bs_api_contest_get_meet_ueb_mentor_list_by_page&action=api',
  export_meet_ueb_mentor: '/Primary/?FlowAlias=bs_api_contest_export_meet_ueb_mentor_list&action=api',

  get_mentorlist: '/Primary/?FlowAlias=bs_api_mentor_get_mentorlist_meta_key_by_company&action=api',
  get_podcast_list: '/Primary/?FlowAlias=bs_api_podcast_get_playlist_meta&action=api',



  get_chat_box_list: '/Primary/?FlowAlias=bs_api_chat_get_chat_box_list_by_page&action=api',
  get_chat_message_list: '/Primary/?FlowAlias=bs_api_get_chat_message_list_by_chatbox_id&action=api',
  post_chat_message: '/Primary/?FlowAlias=bs_api_post_chat_message&action=api',

};
export const apiDomain = 'https://upload.truebpm.vn';
// export const apiDomain = 'http://localhost:4000'

export const roleActions = {
  list_active_role: 'MYM_ORGANISATION_HOME_OPEN_ROLE_TEMPLATE_DEACTIVE_LIST',
  list_inactive_role: 'MYM_ORGANISATION_HOME_OPEN_ROLE_TEMPLATE_ACTIVE_LIST',
};
export const processroleActions = {
  list_tree: 'MYM_ORGANISATION_HOME_PROCESS_ROLE_MANAGE',
};
export const accountActions = {
  list_active_user: 'MYM_ORGANISATION_HOME_OPEN_ACTIVE_USER_LIST',
  list_inactive_user: 'MYM_ORGANISATION_HOME_OPEN_USER_DEACTIVE_LIST',
};
export const departmentActions = {
  list_active_department: 'MYM_ORGANISATION_HOME_OPEN_DEPARTMENT_ACTIVE_LIST',
};
export const departmentDeactiveActions = {
  list_inactive_department: 'MYM_ORGANISATION_HOME_OPEN_DEPARTMENT_DEACTIVE_LIST',
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
export const contestActions = {
  ueb_meet_mentor: 'MYM_MARKETING_HOME_OPEN_MEET_UEB_MENTOR_LIST',
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
  calendar: 'MYM_BOOKING_HOME_OPEN_CALENDAR',
  dashboard: 'MYM_BOOKING_HOME_OPEN_BOOKING_DASHBOARD',
  high_school_uncompleted_list: 'MYM_BOOKING_HOME_OPEN_UNCOMPLETED_COUNSELING_LIST',
  high_school_cancel_list: 'MYM_BOOKING_HOME_OPEN_CANCEL_COUNSELLING_LIST',
  high_school_completed_list: 'MYM_BOOKING_HOME_OPEN_COMPLETED_COUNSELLING_LIST',
  high_school_all_list: 'MYM_BOOKING_HOME_OPEN_COUNSELLING_LIST',
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
export const partnerActions = {
  active_list: 'MYM_PARTNER_COMPANY_OPEN_ACTIVE_PARTNER_LIST',
  inactive_list: 'MYM_PARTNER_COMPANY_OPEN_INACTIVE_PARTNER_LIST',
};
export const partnerCategoryActions = {
  active_list: 'MYM_PARTNER_COMPANY_OPEN_CATEGORY_LIST',
};

export const fileActions = {
  active_list: 'MYM_DOCUMENT_HOME_OPEN_ACTIVE_FILE',
  inactive_list: 'MYM_DOCUMENT_HOME_OPEN_INACTIVE_FILE',
};

export const fileCategoryActions = {
  active_list: 'MYM_DOCUMENT_HOME_OPEN_FILE_CATEGORY',
};

export const fileTypeActions = {
  active_list: 'MYM_DOCUMENT_HOME_OPEN_FILE_TYPE_LIST',
};
export const collaborationActions = {
  process_list: 'MYM_SHARE_HOME_OPEN_COLLABORATOR_REGISTRATION_LIST',
  deprocess_list: 'MYM_SHARE_HOME_OPEN_REJECT_COLLABORATOR_REGISTRATION_LIST',
};
export const notificationActions = {
  active_list: 'MYM_NOTIFICATION_HOME_OPEN_CATEGORY_LIST',
};
export const notificationMessageActions = {
  active_list: 'MYM_NOTIFICATION_HOME_OPEN_MESSAGE_LIST',
};
export const orderActions = {
  booking_list: 'MYM_SALES_HOME_OPEN_COUNSELLING_ORDER_LIST',
  pending_booking_list: 'MYM_SALES_HOME_COUNSELING_ORDER_PENDING_LIST',
  draft_booking_list: 'MYM_SALES_HOME_COUNSELING_ORDER_DRAFT_LIST',
  event_list: 'MYM_SALES_HOME_OPEN_EVENT_ORDER_LIST',
  pending_event_list: 'MYM_SALES_HOME_EVENT_OPEN_PENDING_LIST',
  draft_event_list: 'MYM_SALES_HOME_EVENT_OPEN_DRAFT_LIST',
  prepaid_list: 'MYM_SALES_HOME_OPEN_PREPAIDCARD_LIST',
  pending_prepaid_list: 'MYM_SALES_HOME_OPEN_PREPAIDCARD_ORDER_PENDINGLIST',
  draft_prepaid_list: 'MYM_SALES_HOME_OPEN_PREPAIDCARD_ORDER_DRAFT_LIST',
};
export const counsellingPriceActions = {
  active_list: 'MYM_SALES_HOME_OPEN_PRICE_LIST',
};
export const broadcastActions = {
  active_list: 'MYM_BROADCAST_HOME_OPEN_BROADCAST_LIST',
};
export const newsActions = {
  active_list: 'MYM_SITE_HOME_OPEN_NEWS_LIST',
  inactive_list: 'MYM_SITE_HOME_OPEN_INACTIVE_NEWS_LIST',
};
export const landingPageActions = {
  active_list: 'MYM_SITE_HOME_OPEN_LANDING_PAGE_LIST',
  inactive_list: 'MYM_SITE_HOME_OPEN_INACTIVE_LANDING_PAGE_LIST',
};
export const newsCategoryActions = {
  active_list: 'MYM_SITE_HOME_OPEN_NEWS_CATEGORY_LIST',
};

export const universityActions = {
  active_list: 'MYM_PARTNER_HOME_OPEN_UNIVERSITY_ACTIVE_LIST',
  inactive_list: 'MYM_PARTNER_HOME_OPEN_UNIVERSITY_INACTIVE_LIST',
  activelist: 'MYM_PARTNER_HOME_OPEN_ACTIVE_UNIVERSITYLIST',
  inactivelist: 'MYM_PARTNER_HOME_OPEN_INACTIVE_UNIVERSITYLIST',
};

export const careerActions = {
  active_list: 'MYM_PARTNER_HOME_OPEN_CAREER_LIST',
  inactive_list: 'MYM_PARTNER_HOME_OPEN_INACTIVE_CAREER_LIST',
  activelist: 'MYM_PARTNER_HOME_OPEN_CAREERLISST_LIST',
  inactivelist: 'MYM_PARTNER_HOME_OPEN_INACTIVE_CAREERLISST_LIST',
  categoryactive: 'MYM_PARTNER_HOME_OPEN_ACTIVE_CAREER_CATEGORY_LIST',
  categoryinactive: 'MYM_PARTNER_HOME_OPEN_INACTIVE_CAREER_CATEGORY_LIST',
};

export const bannerActions = {
  active_list: 'MYM_SITE_HOME_OPEN_BANNER_LIST',
  inactive_list: 'MYM_SITE_HOME_BANNER_INACTIVE_LIST',
};
export const bannerListActions = {
  active_list: 'MYM_SITE_HOME_OPEN_BANNERLIST_LIST',
  inactive_list: 'MYM_SITE_HOME_BANNERLIST_INACTIVE_LIST',
};
export const newsListActions = {
  active_list: 'MYM_SITE_HOME_OPEN_NEWSLIST_LIST',
  inactive_list: 'MYM_SITE_HOME_NEWSLIST_INACTIVE_LIST',
};
export const counsellingCategoryActions = {
  active_list: 'MYM_PARTNER_HOME_OPEN_SERVICE_LIST',
};
export const qnaActions = {
  active_list: 'MYM_SITE_HOME_OPEN_QNA_LIST',
  inactive_list: 'MYM_SITE_HOME_OPEN_QNA_INACTIVE_LIST',
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
      create: 'MYM_ORGANISATION_HOME_CREATE_USER_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_ORGANISATION_HOME_UPDATE_USER_FORM_BUTTON',
    },
  },
  department: {
    list: {
      create: 'MYM_ORGANISATION_HOME_CREATE_DEPARTMENT_MENU_BUTTON',
      update: 'MYM_ORGANISATION_HOME_UPDATE_DEPARTMENT_MENU_BUTTON',
      adduser: 'MYM_ORGANISATION_HOME_ADD_USER_DEPARTMENT_MENU_BUTTON',
      removeaccount: 'MYM_ORGANISATION_HOME_REMOVE_ACCOUNT_MENU_BUTTON',
      syncDept: 'MYM_ORGANISATION_HOME_SYNC_DEPARTMENT_MENU_BUTTON',
      deactive: 'MYM_ORGANISATION_HOME_DEACTIVE_DEPARTMENT_MENU_BUTTON',
    },
    detail: {
      save: 'DEPARTMENT_LIST_CREATE_FORM_BUTTON',
    },
  },
  role: {
    list: {
      create: 'MYM_ORGANISATION_HOME_ROLE_TEMPLATE_CREATE_MENU_BUTTON',
    },
    detail: {},
  },
  processrole: {
    list: {
      create: 'MYM_ORGANISATION_HOME_CREATE_NEW_PROCESS_ROLE_MENU_BUTTON',
      update: 'MYM_ORGANISATION_HOME_UPDATE_PROCESS_ROLE_MENU_BUTTON',
      update_dept_role: 'MYM_ORGANISATION_HOME_UPDATE_DEPARTMENT_ROLE_MENU_BUTTON',
      adduser: 'MYM_ORGANISATION_HOME_ADD_ACCOUNT_ROLE_MENU_BUTTON',
      adddept: 'MYM_ORGANISATION_HOME_ADD_DEPT_ROLE_MENU_BUTTON',
      removeaccount: 'MYM_ORGANISATION_HOME_REMOVE_ACCOUNT_ROLE_MENU_BUTTON',
      removedept: 'MYM_ORGANISATION_HOME_REMOVE_DEPT_ROLE_MENU_BUTTON',
      syncRole: 'MYM_ORGANISATION_HOME_SYNC_DEPARTMENT_ROLE_MENU_BUTTON',
    },
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
      importData: 'MYM_PARTNER_MENTOR_IMPORT_DATA_MENU_BUTTON',
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
      download: 'MYM_BOOKING_HOME_DOWNLOAD_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_BOOKING_COUNSELING_SAVE_FORM_BUTTON',
      change_timeslot: 'MYM_BOOKING_HOME_CHANGE_TIMESLOT_FORM_BUTTON',
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
    list: {
      assign: 'MYM_PAYMENT_PREPAIDCARD_ASSIGN_MENU_BUTTON',
    },
  },
  prepaidcardbatch: {
    list: {
      create: 'MYM_PAYMENT_PREPAIDCARD_BATCH_CREATE_MENU_BUTTON',
      send_email: 'MYM_PAYMENT_PREPAIDCARD_BATCH_SEND_EMAIL_MENU_BUTTON',
    },
    detail: {
      generate: 'MYM_PAYMENT_PREPAIDCARD_BATCH_GENERATE_FORM_BUTTON',
      import: 'MYM_PAYMENT_PREPAIDCARD_BATCH_IMPORT_FORM_BUTTON',
      save: 'MYM_PAYMENT_PREPAIDCARD_BATCH_SAVE_FORM_BUTTON',
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
  partner: {
    list: {
      create: 'MYM_PARTNER_MENTOR_PARTNER_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_MENTOR_PARTNER_SAVE_FORM_BUTTON',
    },
  },
  partner_category: {
    list: {
      create: 'MYM_PARTNER_MENTOR_PARTNER_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_MENTOR_PARTNER_CATRGORY_SAVE_FORM_BUTTON',
    },
  },
  file: {
    list: {
      create: 'MYM_DOCUMENT_HOME_FILE_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_DOCUMENT_HOME_FILE_SAVE_FORM_BUTTON',
    },
  },
  fileCategory: {
    list: {
      create: 'MYM_DOCUMENT_HOME_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_DOCUMENT_HOME_CATEGORY_SAVE_FORM_BUTTON',
    },
  },
  fileType: {
    list: {
      create: 'MYM_DOCUMENT_HOME_FILE_TYPE_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_DOCUMENT_HOME_FILE_TYPE_SAVE_FORM_BUTTON',
    },
  },
  collaboration: {
    list: {},
    detail: {
      approve: 'MYM_SHARE_HOME_APPROVE_FORM_BUTTON',
      reject: 'MYM_SHARE_HOME_REJECT_MENU_BUTTON',
    },
  },
  notificationCategory: {
    list: {
      create: 'MYM_SHARE_HOME_NOTIFICATION_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SHARE_HOME_NOTIFICATION_CATEGORY_SAVE_FORM_BUTTON',
    },
  },
  notificationMessage: {
    list: {
      create: 'MYM_SHARE_HOME_NOTIFICATION_MESSAGE_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SHARE_HOME_NOTIFICATION_MESSAGE_SAVE_FORM_BUTTON',
    },
  },

  order: {
    detail: {
      process: 'MYM_SALES_HOME_PROCESS_PAYMENT_FORM_BUTTON',
    },
  },

  counsellingPrice: {
    list: {
      create: 'MYM_SALES_HOME_PRICE_CREATE_NEW_BUTTON',
    },
    detail: {
      save: 'MYM_SALES_HOME_PRICE_SAVE_FORM_BUTTON',
    },
  },
  broadcast: {
    list: {
      create: 'MYM_BROADCAST_HOME_BROADCAST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_BROADCAST_HOME_BROADCAST_SAVE_FORM_BUTTON',
    },
  },
  news: {
    list: {
      create: 'MYM_SITE_HOME_NEWS_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_NEWS_SAVE_FORM_BUTTON',
    },
  },
  landingPage: {
    list: {
      create: 'MYM_SITE_HOME_LANDING_PAGE_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_LANDING_PAGE_SAVE_FORM_BUTTON',
    },
  },
  newsCategory: {
    list: {
      create: 'MYM_SITE_HOME_NEWS_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_NEWS_CATEGORY_SAVE_FORM_BUTTON',
    },
  },

  university: {
    list: {
      create: 'MYM_PARTNER_HOME_CREATE_UNIVERISTY_MENU_BUTTON',
      create_list: 'MYM_PARTNER_HOME_CREATE_NEW_UNIVERSITYLIST',
    },
    detail: {
      save: 'MYM_PARTNER_HOME_CREATE_UNIVERSITY_FORM_BUTTON',
    },
  },
  career: {
    list: {
      create: 'MYM_PARTNER_HOME_CREATE_CAREER_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_HOME_SAVE_CAREER_DETAIL_FORM_BUTTON',
    },
  },
  careerlist: {
    list: {
      create: 'MYM_PARTNER_HOME_CREATE_CAREERLIST_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_HOME_SAVE_CAREERLIST_DETAIL_FORM_BUTTON',
    },
  },
  banner: {
    list: {
      create: 'MYM_SITE_HOME_BANNER_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_BANNER_SAVE_FORM_BUTTON',
    },
  },
  bannerList: {
    list: {
      create: 'MYM_SITE_HOME_BANNERLIST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_BANNERLIST_SAVE_FORM_BUTTON',
    },
  },
  newsList: {
    list: {
      create: 'MYM_SITE_HOME_NEWSLIST_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_NEWSLIST_SAVE_FORM_BUTTON',
    },
  },
  careerCategory: {
    list: {
      create: 'MYM_PARTNER_HOME_CREATE_CAREER_CATEGORY_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_HOME_UPDATE_CAREER_CATEGORY_FORM_BUTTON',
    },
  },
  counsellingCategory: {
    list: {
      create: 'MYM_PARTNER_HOME_COUSELLING_CATEGORY_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_PARTNER_HOME_COUSELLING_CATEGORY_SAVE_FORM_BUTTON',
    },
  },
  qna: {
    list: {
      create: 'MYM_SITE_HOME_QNA_CREATE_MENU_BUTTON',
    },
    detail: {
      save: 'MYM_SITE_HOME_QNA_SAVE_FORM_BUTTON',
    },
  },
  contest: {
    list: {
      ueb: 'MYM_MARKETING_HOME_EXPORT_MEET_UEB_MENTOR_MENU_BUTTON',
    },
  },
};
