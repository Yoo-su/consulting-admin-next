import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const deleteConversionTable = async () => {
  const { data } = await apiInstance.delete(API_URLS.dashboard.deleeteConversionTable);
  return data;
};
