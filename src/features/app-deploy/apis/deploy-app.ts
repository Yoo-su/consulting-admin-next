import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export const deployApp = async (formData: FormData) => {
  return await apiInstance.post(API_URLS.dashboard.deployApp, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
