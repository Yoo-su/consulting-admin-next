import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const getConversionTable = async (serviceID: string) => {
  const { data } = await apiInstance.get(
    API_URLS.dashboard.getConversionTable(serviceID)
  );
  return data;
};
