import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { Univ } from '@/features/dashboard/types/univ.type';

export const GET_UNIV_LIST_URL = apiUrls.admin.getUnivList;

type GetUnivListResponse = {
  UnivID: string;
  UnivName: string;
  UnivAddress: string;
  Longitude: string;
  Latitude: string;
  isActive: boolean;
};
export const getUnivList = async () => {
  return await apiInstance.get<GetUnivListResponse[]>(GET_UNIV_LIST_URL);
};
