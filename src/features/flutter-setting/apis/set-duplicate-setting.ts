import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

type SetDuplicateSettingResponse = {
  statusCode: number;
  message?: string;
  errorMessages?: string;
};
export type SetDuplicateSettingParams = {
  sourceServiceID: number;
  targetServiceID: number;
};
export const setDuplicateSetting = async ({ sourceServiceID, targetServiceID }: SetDuplicateSettingParams) => {
  if (!sourceServiceID || !targetServiceID) {
    return null;
  }
  const customParams = { sourceServiceID, targetServiceID };
  const { data } = await apiInstance.post<SetDuplicateSettingResponse>(
    API_URLS.dashboard.setDuplicateSetting,
    customParams
  );
  return data;
};
