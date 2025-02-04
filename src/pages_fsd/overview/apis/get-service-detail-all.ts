import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ServiceDetail } from '../models';

export const getServiceDetailAll = async () => {
  const { data } = await apiInstance.get<ServiceDetail[]>(API_URLS.dashboard.getServiceDetailAll);
  return data;
};
