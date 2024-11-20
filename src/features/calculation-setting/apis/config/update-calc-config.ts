import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const updateCalcConfig = async (serviceID: string, configID: string) => {
  const { data } = await apiInstance.put(
    API_URLS.dashboard.updateCalcConfig(serviceID, configID)
  );
  return data;
};
