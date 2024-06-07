import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const deployTestData = async (serviceID: string) => {
  return await apiInstance.post(`${apiUrls.dashboard.deployTestData}`, {
    serviceID,
  });
};
