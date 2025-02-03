import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const deleteCalcConfig = async (serviceID: string, configID: string) => {
  const { data } = await apiInstance.delete(API_URLS.dashboard.deleteCalcConfig(serviceID, configID));
  return data;
};
