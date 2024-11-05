import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const uploadMajorFile = async (formData: FormData) => {
  return await apiInstance.post(API_URLS.dashboard.uploadMajorFile, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
