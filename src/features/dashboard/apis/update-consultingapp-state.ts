import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export const updateConsultingAppState = async (state: ConsultingAppState) => {
  return await apiInstance.patch(apiUrls.dashboard.consultingAppState, {
    state,
  });
};
