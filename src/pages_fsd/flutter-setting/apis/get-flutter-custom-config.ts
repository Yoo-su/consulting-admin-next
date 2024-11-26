import { API_URLS } from '@/shared/constants/api-urls';
import { authInstance } from '@/shared/plugin/axios';

type GetFlutterCustomConfigResponse = {
  ServiceID: number;
  RowIdx: number;
  RowValue: string;
};

export type GetFlutterCustomConfigParams = {
  serviceID: string;
};

export const getFlutterCustomConfig = async ({
  serviceID,
}: GetFlutterCustomConfigParams) => {
  const { data } = await authInstance.get<GetFlutterCustomConfigResponse[]>(
    `${API_URLS.dashboard.flutterCustomConfig}/${serviceID}`
  );
  return data;
};
