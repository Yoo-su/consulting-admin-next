import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type GetFlutterCustomConfigResponse = {
  ServiceID: number;
  RowIdx: number;
  RowValue: string;
};

export type GetFlutterCustomConfigParams = {
  serviceID: string;
};

export const getFlutterCustomConfig = async ({ serviceID }: GetFlutterCustomConfigParams) => {
  console.log('serviceid', serviceID);
  const { data } = await authInstance.get<GetFlutterCustomConfigResponse[]>(
    `${apiUrls.dashboard.flutterCustomConfig}/${serviceID}`
  );
  return data;
};
