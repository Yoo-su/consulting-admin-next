import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const syncFromTestToDev = async (serviceID: string) => {
  return await apiInstance.post(API_URLS.dashboard.syncFromTestToDev, {
    serviceID,
  });
};
