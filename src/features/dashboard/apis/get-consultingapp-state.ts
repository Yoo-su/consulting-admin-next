import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export const getConsultingAppState = async () => {
  return await apiInstance.get<ConsultingAppState[]>(apiUrls.dashboard.consultingAppState);
};
