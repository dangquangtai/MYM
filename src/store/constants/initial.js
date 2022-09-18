import { dateOfWeek, timeWorking, workingType } from './time'

export const mentorDisplayOptions = {
  fullname: true,
  email_address: true,
  number_phone: true,
  career: true,
  rating: true,
  status: true,
  active: true,
}

export const userAvatar = 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png';

export const initMentorData = {
  fullname: "",
  email_address: "",
  phone: "",
  title: "",
  description: "",
  image_url: "",
  career: "",
  advise: [],
  fb_url: "",
  linkedIn_url: "",
  is_active: false,
  short_address: "",
  experience: "",
  degree: "",
  alumnus: '',
  gender: '',
  workday: [],
  vacation: []
}

export const initPodcastData = {
  title: "",
  description: "",
  image_url: "",
  duration: 0,
  episodes: 0,
  category_id: "",
  mentor_id: "",
  banner_url: "",
}

export const initEpisodeData = {
  id: "",
  title: "",
  image_url: "",
  description: "",
  is_for_member: false,
  duration: 0,
  episode_number: 0,
}

export const genderList = [
  'Nam',
  'Nữ'
]

export const initWorkingDay = {
  "day": '',
  "hour": '',
  "is_active": false,
  "type": '',
  "id": '',
}

export const initVacationDay = {
  "start": '',
  "end": '',
  "is_active": false,
  "id": '',
}

export const typeBatchList = [
  'Miễn phí',
  'Tính phí',
  'Khuyến mãi',
]

