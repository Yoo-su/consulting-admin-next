import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const updateCalcMethod = async (serviceID: string, methodID: string) => {
  const { data } = await apiInstance.put(
    API_URLS.dashboard.updateCalcMethod(serviceID, methodID)
  );
  return data;
};
