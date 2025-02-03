import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const updateConversionTable = async (serviceID: string, tableID: string) => {
  const { data } = await apiInstance.put(API_URLS.dashboard.updateConversionTable(serviceID, tableID));
  return data;
};
