import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const deleteCalcMethod = async (serviceID: string, methodID: string) => {
  const { data } = await apiInstance.delete(
    API_URLS.dashboard.deleteCalcMethod(serviceID, methodID)
  );
  return data;
};
