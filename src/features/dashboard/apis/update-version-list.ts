import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { CurTBLVersion } from '../types/service-version.type';

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
  return await apiInstance.post<UpdateVersionListResponse>(`${apiUrls.dashboard.versionList}/${serviceID}`, params);
};
