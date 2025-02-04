import axios from 'axios';

import { AuthEvents } from '../components/guards/auth-guard/auth-event-listener';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/sign-in')) {
        sessionStorage.setItem('redirectPath', window.location.pathname);
      }
      AuthEvents.emit({ type: 'UNAUTHORIZED' });
    }
    return Promise.reject(error);
  }
);

authInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export { apiInstance, authInstance };
