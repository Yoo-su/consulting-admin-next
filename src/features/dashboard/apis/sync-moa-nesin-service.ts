import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type SyncMoaNesinServiceResponse = {
  message: string;
  stastusCode: number;
};
export type SyncMoaNesinServiceParams = {
  userID: string;
  departmentID: 1 | 2 | undefined;
};
export const syncMoaNesinService = async (params: SyncMoaNesinServiceParams) => {
  return await apiInstance.post<SyncMoaNesinServiceResponse>(apiUrls.dashboard.syncMoaNesinService, params);
};
