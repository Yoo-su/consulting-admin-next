import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const deployTestData = async (serviceID: string) => {
  return await apiInstance.post(`${API_URLS.dashboard.deployTestData}`, {
    serviceID,
  });
};
