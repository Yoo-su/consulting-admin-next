import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export const updateConsultingAppStateUrl = `${process.env.NEXT_PUBLIC_BASE_URL + apiUrls.dashboard.consultingAppState}`;

export const updateConsultingAppState = async (state: ConsultingAppState) => {
  return await apiInstance.patch(updateConsultingAppStateUrl, {
    state,
  });
};
