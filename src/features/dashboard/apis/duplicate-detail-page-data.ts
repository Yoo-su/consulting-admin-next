import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const duplicateDetailpageData = async (sourceServiceID: string, targetServiceID: string) => {
  return await apiInstance.post(apiUrls.dashboard.duplicateDetailpage, {
    sourceServiceID,
    targetServiceID,
  });
};
