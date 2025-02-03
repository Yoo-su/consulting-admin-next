import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ConsultingAppState } from '../models';

export const getConsultingAppStateAll = async () => {
  const { data } = await apiInstance.get<ConsultingAppState[]>(API_URLS.dashboard.getConsultingAppStateAll);
  return data;
};
