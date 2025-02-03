import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

import { CalcConfig } from '../../models/types';

export const getCalcConfig = async (serviceID: string) => {
  const { data } = await apiInstance.get<CalcConfig[]>(API_URLS.dashboard.getCalcConfig(serviceID));
  return data;
};
