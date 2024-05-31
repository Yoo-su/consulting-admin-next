import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export type GetConsultingAppStateParams = {
  userID: string;
  departmentID: 1 | 2 | undefined;
};
export const getConsultingAppState = async (params: GetConsultingAppStateParams) => {
  return await apiInstance.get<ConsultingAppState[]>(apiUrls.dashboard.getConsultingAppState, { params });
};
