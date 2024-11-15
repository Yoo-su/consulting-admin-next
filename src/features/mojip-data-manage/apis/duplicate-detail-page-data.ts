import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export const duplicateDetailpageData = async (
  sourceServiceID: string,
  targetServiceID: string
) => {
  return await apiInstance.post(API_URLS.dashboard.duplicateDetailpage, {
    sourceServiceID,
    targetServiceID,
  });
};
