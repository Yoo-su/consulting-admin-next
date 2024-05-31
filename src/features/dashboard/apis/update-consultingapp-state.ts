import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { CurrentState, ServiceType } from '../types/consultingapp-state.type';

type UpdateConsultingAppStateResponse = {
  serviceYear: number;
  univID: number;
  serviceType: ServiceType;
  serviceID: string | null;
  developer: string;
  manager: string | null;
  salesPerson: string | null;
  currentState: CurrentState;
  isNew: boolean;
  createDate: Date;
  updateDate: Date;
};
export type UpdateConsultingAppStateParams = {
  serviceYear: number;
  univID: number;
  serviceType: ServiceType;
  currentState: CurrentState;
};
export const updateConsultingAppState = async (params: UpdateConsultingAppStateParams) => {
  return await apiInstance.post<UpdateConsultingAppStateResponse>(apiUrls.dashboard.updateConsultingAppState, params);
};
