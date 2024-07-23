import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const uploadMajorFile = async (formData: FormData) => {
  return await apiInstance.post(apiUrls.dashboard.uploadMajorFile, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
