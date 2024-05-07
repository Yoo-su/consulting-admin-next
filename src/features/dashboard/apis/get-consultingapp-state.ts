import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export const getConsultingAppStateUrl = `${process.env.NEXT_PUBLIC_BASE_URL + apiUrls.dashboard.consultingAppState}`;

export const getConsultingAppState = async () => {
  return await apiInstance.get<ConsultingAppState[]>(getConsultingAppStateUrl);
};
