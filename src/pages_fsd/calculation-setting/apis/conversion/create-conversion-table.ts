import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const createConversionTable = async (serviceID: string) => {
  const { data } = await apiInstance.post(API_URLS.dashboard.createConversionTable(serviceID));
  return data;
};
