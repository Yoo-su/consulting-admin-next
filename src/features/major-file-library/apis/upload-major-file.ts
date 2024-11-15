import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export const uploadMajorFile = async (formData: FormData) => {
  return await apiInstance.post(API_URLS.dashboard.uploadMajorFile, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
