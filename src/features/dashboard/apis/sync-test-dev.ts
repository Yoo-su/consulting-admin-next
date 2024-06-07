import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const syncFromTestToDev = async (serviceID: string) => {
  return await apiInstance.post(apiUrls.dashboard.syncFromTestToDev, {
    serviceID,
  });
};
