import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

import { ConversionTable } from '../../models/types';

export const getConversionTable = async (serviceID: string) => {
  const { data } = await apiInstance.get<ConversionTable[]>(
    API_URLS.dashboard.getConversionTable(serviceID)
  );
  return data;
};
