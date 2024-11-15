import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ConsultingAppState } from '../models';

export const getConsultingAppState = async () => {
  const { data } = await apiInstance.get<ConsultingAppState[]>(
    API_URLS.dashboard.getConsultingAppState
  );
  return data;
};
