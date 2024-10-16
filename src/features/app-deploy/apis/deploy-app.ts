import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const deployApp = async (formData: FormData) => {
  return await apiInstance.post(API_URLS.dashboard.deployApp, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
