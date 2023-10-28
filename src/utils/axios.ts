// import { HOST_API } from '@/config';
import axios from 'axios';

import { HOST_API } from '@/config';

// import { defaultLang, HOST_API } from '../config';
// import AxiosMockAdapter from 'axios-mock-adapter';

// add axios mock support
const axiosMockInstance = axios.create({
  baseURL: HOST_API,
});
const axiosLiveInstance = axios.create({
  baseURL: HOST_API,
});

// export const axiosMockAdapterInstance = new AxiosMockAdapter(
//   axiosMockInstance,
//   { delayResponse: 0 }
// );

const axiosInstance =
  process.env.NEXT_PUBLIC_IS_AXIOS_MOCK === 'true'
    ? axiosMockInstance
    : axiosLiveInstance;

axiosInstance.interceptors.request.use(
  config => {
    if (typeof localStorage !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (config.headers) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(response => {
  if (response.data.success === false) {
    if (response.data.code === 'token_expired' && window) {
      window.location.reload();
    }

    return Promise.reject(response.data);
  }

  return response;
});

export default axiosInstance;
