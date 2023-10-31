import axios from 'axios';
import { AppError } from '../utils/AppError';

export const api = axios.create({
  baseURL: 'http://192.168.0.34:3333',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.error));
    }

    return Promise.reject(error);
  },
);
