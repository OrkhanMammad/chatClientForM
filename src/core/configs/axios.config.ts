import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { errorToast, successToast } from '../shared/toast/toast';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44373/api',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const method = response?.config?.method?.toUpperCase() ?? '';

    if (method === 'POST') {
      successToast(' successfully sent');
    }

    return response;
  },
  (error) => {
    let errMessage = '';

    const { response } = error;
    const status = response?.status;

    switch (status) {
      case 401:
        errMessage = 'Session expired';
        break;

      case 404:
        errMessage = 'Resource not found';
        break;

      case 500:
        errMessage = 'Server error';
        break;

      default:
        errMessage = 'An error occurred';
    }

    errorToast(errMessage);
    return Promise.reject(error); 
  }
);

export default axiosInstance;
