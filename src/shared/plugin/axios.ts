import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
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
