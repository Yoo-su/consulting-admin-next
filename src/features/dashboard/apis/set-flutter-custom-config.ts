import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

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
    `${apiUrls.dashboard.flutterCustomConfig}/${serviceID}`,
    customParams
  );
};
