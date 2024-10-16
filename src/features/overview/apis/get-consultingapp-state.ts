import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../models';

export const getConsultingAppState = async () => {
  return await apiInstance.get<ConsultingAppState[]>(API_URLS.dashboard.getConsultingAppState);
};
