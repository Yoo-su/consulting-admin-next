import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export const deployTestData = async (serviceID: string) => {
  return await apiInstance.post(`${API_URLS.dashboard.deployTestData}`, {
    serviceID,
  });
};
