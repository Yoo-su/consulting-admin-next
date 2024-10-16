import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const duplicateDetailpageData = async (sourceServiceID: string, targetServiceID: string) => {
  return await apiInstance.post(API_URLS.dashboard.duplicateDetailpage, {
    sourceServiceID,
    targetServiceID,
  });
};
