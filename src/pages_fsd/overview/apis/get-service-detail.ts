import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ServiceDetail } from '../models';

export const getServiceDetail = async () => {
  const { data } = await apiInstance.get<ServiceDetail[]>(API_URLS.dashboard.getServiceDetail);
  return data;
};
