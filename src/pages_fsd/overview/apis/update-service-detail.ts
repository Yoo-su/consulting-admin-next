import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ProgressState, ServiceType } from '../models';

type UpdateServiceDetailResponse = {
  serviceYear: number;
  univID: number;
  serviceType: ServiceType;
  serviceID: string | null;
  developer: string;
  manager: string | null;
  salesPerson: string | null;
  currentState: ProgressState;
  isNew: boolean;
  createDate: Date;
  updateDate: Date;
};
export type UpdateServiceDetailParams = {
  serviceYear: number;
  univID: number;
  serviceType: ServiceType;
  currentState: ProgressState;
};
export const updateServiceDetail = async (params: UpdateServiceDetailParams) => {
  return await apiInstance.patch<UpdateServiceDetailResponse>(API_URLS.dashboard.updateServiceDetail, params);
};
