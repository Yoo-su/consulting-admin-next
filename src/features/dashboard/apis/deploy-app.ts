import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const deployApp = async (formData: FormData) => {
  return await apiInstance.post(apiUrls.dashboard.deployApp, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
