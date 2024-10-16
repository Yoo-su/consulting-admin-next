import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

type SetFlutterCustomConfigResponse = {
  statusCode: number;
  message?: string;
};
export type SetFlutterCustomConfigParams = {
  serviceID: string;
  RowIdx: number | null;
  RowValue: string;
};
export const setFlutterCustomConfig = async ({ serviceID, RowIdx, RowValue }: SetFlutterCustomConfigParams) => {
  if (!serviceID || RowIdx === null) {
    return null;
  }
  const customParams = { RowIdx, RowValue };
  return await apiInstance.post<SetFlutterCustomConfigResponse>(
    `${API_URLS.dashboard.flutterCustomConfig}/${serviceID}`,
    customParams
  );
};
