import * as axios from 'axios';

const apiServices = axios.create();

apiServices.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiServices;
