import { dateOfWeek, timeWorking, workingType } from './time';

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

export const initMentorData = {
  fullname: '',
  email_address: '',
  phone_number: '',
  title: '',
  description: '',
  image_url: '',
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
};

export const initEpisodeData = {
  id: '',
  title: '',
  image_url: '',
  description: '',
  duration: 0,
  episode_number: 0,
  source_file_url: '',
};

export const initPlaylistData = {
  title: '',
  description: '',
  image_url: '',
  podcast_id_list: [],
};

export const initBatchData = {
  title: '',
  benefit_description: '',
  image_url: '',
  event_id: '',
  couselling_category_id: '',
  partner_id: '',
  is_qrcode_generated: false,
  is_third_party_voucher: false,
  is_for_counselling_service: false,
  is_partner_limit: false,
  is_for_event: false,
  amount: 0,
  applicable_from_date: '',
  applicable_to_date: '',
  voucher_value: 0,
  source: '',
  prefix: '',
  terms_condition: '',
};

export const genderList = ['Nam', 'Nữ'];

export const initWorkingDay = {
  week_day: '',
  from_hour: '',
  to_hour: '',
  is_active: true,
  id: '',
  applicable_to_date: '',
  applicable_from_date: '',
};

export const initVacationDay = {
  week_day: '',
  from_hour: '',
  to_hour: '',
  is_active: true,
  id: '',
  applicable_to_date: '',
  applicable_from_date: '',
};

export const typeBatchList = ['Miễn phí', 'Tính phí', 'Khuyến mãi'];
