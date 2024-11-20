import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const createCalcConfig = async (serviceID: string) => {
  const { data } = await apiInstance.post(
    API_URLS.dashboard.createCalcConfig(serviceID)
  );
  return data;
};
