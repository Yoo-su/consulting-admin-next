import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

type SyncMoaNesinServiceResponse = {
  message: string;
  stastusCode: number;
};
export type SyncMoaNesinServiceParams = {
  userID: string;
  departmentID: 1 | 2 | undefined;
};
export const syncMoaNesinService = async (params: SyncMoaNesinServiceParams) => {
  return await apiInstance.post<SyncMoaNesinServiceResponse>(API_URLS.dashboard.syncMoaNesinService, params);
};
