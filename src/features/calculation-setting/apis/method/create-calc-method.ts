import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const createCalcMethod = async (serviceID: string) => {
  const { data } = await apiInstance.post(
    API_URLS.dashboard.createCalcMethod(serviceID)
  );
  return data;
};
