import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export const syncFromTestToDev = async (serviceID: string) => {
  return await apiInstance.post(API_URLS.dashboard.syncFromTestToDev, {
    serviceID,
  });
};
