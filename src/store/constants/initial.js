export const mentorDisplayOptions = {
  fullname: true,
  email_address: true,
  number_phone: true,
  career: true,
  rating: true,
  status: true,
  active: true,
};

export const userAvatar = 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png';

export const bannerImage =
  'https://firebasestorage.googleapis.com/v0/b/huongnghiepnhanh.appspot.com/o/Document%2FImage%2Fbackground.png?alt=media&token=e1cc029f-6c35-4589-892d-f44970815322';

export const initMentorData = {
  fullname: '',
  email_address: '',
  phone_number: '',
  title: '',
  description: '',
  image_url: '',
  banner_url:
    'https://firebasestorage.googleapis.com/v0/b/huongnghiepnhanh.appspot.com/o/Document%2FImage%2Fbackground.png?alt=media&token=e1cc029f-6c35-4589-892d-f44970815322',
  fb_url: '',
  linkedin_url: '',
  address: '',
  gender_id: '',
  career_category_id: '',
  category_id: '',
  topic_id: '',
  province_id: '',
  is_certified: false,
  workday: [],
  vacation: [],
  counselling_category1_id: '',
  counselling_category2_id: '',
  counselling_category3_id: '',
  career_category1_id: '',
  career_category2_id: '',
  career_category3_id: '',
  counselling_topic1_id: [],
  counselling_topic2_id: [],
  counselling_topic3_id: [],
  order_number: 0,
  is_active: true,
};
export const initPartnerData = {
  id: '',
  title: '',
  name: '',
  is_active: false,
  is_featured: false,
  image_url: '',
};

export const initPartnerCategoryData = {
  id: '',
  title: '',
  created_date: '',
  created_by: '',
  is_active: false,
};

export const initMentorListData = {
  id: '',
  title: '',
  mentor_id_list: [],
  description: '',
  is_hidden: false,
  counselling_category_id: '',
  image_url: '',
  is_active: true,
};

export const initPodcastData = {
  title: '',
  description: '',
  image_url: '',
  duration: 0,
  episodes: 0,
  category_id: '',
  mentor_id: '',
  banner_url: '',
  list_episode_id: [],
  is_for_member: false,
  is_active: true,
};

export const initEpisodeData = {
  id: '',
  title: '',
  image_url: '',
  description: '',
  duration: 0,
  episode_number: 0,
  source_file_url: '',
  is_active: true,
};

export const initPlaylistData = {
  title: '',
  description: '',
  image_url: '',
  podcast_id_list: [],
  is_active: true,
};

export const initBatchData = {
  title: '',
  benefit_description: '',
  image_url: '',
  event_id: '',
  counselling_category_id: '',
  partner_id: '',
  is_qrcode_generated: false,
  is_third_party_voucher: false,
  is_for_counselling_service: false,
  is_partner_limit: false,
  is_for_event: false,
  is_generated: false,
  amount: 0,
  applicable_from_date: '',
  applicable_to_date: '',
  voucher_value: 0,
  source: '',
  prefix: '',
  terms_condition: '',
};

export const initCardBatchData = {
  title: '',
  description: '',
  image_url: '',
  counselling_category_id: '',
  prefix: '',
  value: 0,
  amount: 0,
  available_from_date: '',
  available_to_date: '',
  is_generated: false,
};

export const initWorkingDay = {
  weekday_list: [],
  from_hour: '',
  to_hour: '',
  is_active: true,
  id: '',
  applicable_to_date: '',
  applicable_from_date: '',
};

export const initVacationDay = {
  weekday_list: [],
  from_hour: '',
  to_hour: '',
  is_active: true,
  id: '',
  applicable_to_date: '',
  applicable_from_date: '',
};

export const initEvent = {
  from_date: '',
  to_date: '',
  close_registration_date: '',
  open_registration_date: '',
  online_url: '',
  image_url: '',
  address: '',
  map_lat: '',
  map_long: '',
  map_url: '',
  map_image_url: '',
  mentor_list: [],
  mentor_id_list: [],
  address_title: '',
  title: '',
  category_id_1: ' ',
  category_id_2: ' ',
  category_id_3: ' ',
  category_id_4: ' ',
  is_active: false,
  is_featured: false,
  is_online_event: false,
  province_id: '',
  description: '',
  price: 0,
  action_link: '',
};
export const initAccount = {
  current_school: '',
  degree_id: '',
  dob: '1/1/2018',
  email_address: '@gmail.com',
  full_name: ' ',
  gender_id: '',
  image_url:
    'https://firebasestorage.googleapis.com/v0/b/huongnghiepnhanh.appspot.com/o/Avatar%20Nam.jpg?alt=media&token=8208326e-faa9-4bdf-b811-a48481839cb5',
  is_active: true,
  job_title: '',
  major: '',
  phone_number: '',
  province_id: '',
  password: '',
  id: '',
};
export const initOrder = {
  after_discount_total: 0,
  discount_amount: 0,
  final_total: 0,
  id: '',
  order_code: '',
  order_date: '',
  order_description: '',
  order_title: '',
  payment_type: null,
  payment_type_display: '',
  prepaid_card_serial: '',
  status: '',
  status_display: '',
  total: 0,
  voucher_code: '',
  transaction_log_list: [],
};

export const initFileData = {
  title: '',
  description: '',
  image_url: '',
  file_url: '',
  category_id: '',
  file_type_id: '',
  is_active: true,
};

export const initFileTypeData = {
  title: '',
  image_url: '',
  banner_url: '',
  type: '',
  is_active: true,
};

export const initNotification = {
  title: '',
  is_active: true,
  created_by: '',
  created_date: '',
};

export const initNotificationMessage = {
  title: '',
  is_active: true,
  created_date: '',
  banner_url: '',
  is_red_dot_on: true,
  is_actionable: true,
  body: '',
  id: '',
  action: {
    deeplink: '',
    title: '',
    image_url: '',
    label: '',
    link: '',
    object_id: '',
    object_type: '',
  },
  category_id: '',
  account_id: '',
};
export const initCounsellingPrice = {
  title: '',
  description: '',
  price: 0,
  is_active: true,
  is_default: false,
  id: '',
  created_date: '',
  created_by: '',
  counselling_category_id: '',
  career_category_id: '',
  available_to_date: '',
  available_from_date: '',
};

export const initBroadcastData = {
  title: '',
  subject: '',
  body: '',
  is_active: true,
  is_send_all: false,
  scheduled_datetime: '',
  is_actionable: false,
  action_title: '',
  object_id: '',
  object_type: '',
  email_list_string: '',
  category_id: '',
  channel_code: [],
};

export const initObjectType = ['PODCAST', 'EPISODE', 'MENTOR', 'EVENT', 'VOUCHER'];
