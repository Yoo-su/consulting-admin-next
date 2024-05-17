import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const GET_SERVICE_LIST_URL = apiUrls.admin.getServiceList;

type GetServiceListResponse = {
  ServiceID: string;
  SchoolYear: string;
  IsSusi: string;
  UnivID: string;
  ServiceName: string;
  Developer: string | null;
  Manager: string | null;
};
export const getServiceList = async (univID: string) => {
  return await apiInstance.get<GetServiceListResponse[]>(`${GET_SERVICE_LIST_URL}/${univID}`, {
    params: {
      univID,
    },
  });
};
