import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const getCalcMethod = async (serviceID: string) => {
  const { data } = await apiInstance.get(
    API_URLS.dashboard.getCalcMethod(serviceID)
  );
  return data;
};
