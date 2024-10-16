import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { CurTBLVersion } from '../models';

type UpdateVersionListResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};
export type VersionListParams = {
  server: 'testDb' | 'realDb';
  tables: Pick<CurTBLVersion, 'TableName' | 'Version'>[];
};
export type UpdateVersionListParams = {
  serviceID: string;
  params: VersionListParams;
};
export const updateVersionList = async ({ serviceID, params }: UpdateVersionListParams) => {
  return await apiInstance.post<UpdateVersionListResponse>(`${API_URLS.dashboard.versionList}/${serviceID}`, params);
};
