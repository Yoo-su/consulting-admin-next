import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

import { CalcMethod } from '../../models/types/calc-method';

export const getCalcMethod = async (serviceID: string) => {
  const { data } = await apiInstance.get<CalcMethod[]>(API_URLS.dashboard.getCalcMethod(serviceID));
  return data;
};
