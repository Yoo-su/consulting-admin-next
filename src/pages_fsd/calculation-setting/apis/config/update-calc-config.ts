import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

import { CalcConfig } from '../../models';

export const updateCalcConfig = async (serviceID: string, configID: string, putData: CalcConfig[]) => {
  const { data } = await apiInstance.put(API_URLS.dashboard.updateCalcConfig(serviceID, configID), {
    putData,
  });
  return data;
};
