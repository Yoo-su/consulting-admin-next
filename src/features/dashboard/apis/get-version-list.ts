import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { CurTBLVersionList } from '../types/service-version.type';

export const getVersionList = async (serviceID: string) => {
  return await apiInstance.get<CurTBLVersionList[]>(`${apiUrls.dashboard.versionList}/${serviceID}`);
};
