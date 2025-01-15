import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { CurTBLVersion, VersionServer } from '../models';

type UpdateVersionListResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};
export type VersionListParams = {
  server: VersionServer['value'];
  tables: Omit<CurTBLVersion, 'ServiceID'>[];
};
export type UpdateVersionListParams = {
  serviceID: string;
  params: VersionListParams;
};
export const updateVersionList = async ({
  serviceID,
  params,
}: UpdateVersionListParams) => {
  return await apiInstance.post<UpdateVersionListResponse>(
    `${API_URLS.dashboard.versionList}/${serviceID}`,
    params
  );
};
