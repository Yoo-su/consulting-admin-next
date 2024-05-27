import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const deployTestData = async (serviceID: string) => {
  return await apiInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}${apiUrls.dashboard.deployTestData}`, {
    serviceID: serviceID,
  });
};
