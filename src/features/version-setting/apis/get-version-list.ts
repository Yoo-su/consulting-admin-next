import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { CurTBLVersionList } from '../models';

export const getVersionList = async (serviceID: string) => {
  return await apiInstance.get<CurTBLVersionList[]>(
    `${API_URLS.dashboard.versionList}/${serviceID}`
  );
};
