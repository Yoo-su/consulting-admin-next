import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { Univ } from '../types/univ.type';

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
  return await apiInstance.get<Univ[]>(GET_UNIV_LIST_URL, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetUnivListResponse[];
      return parsedData.map((item) => ({
        univID: item.UnivID,
        univName: item.UnivName,
        univAddress: item.UnivAddress,
        longitude: item.Longitude,
        latitude: item.Latitude,
        isActive: item.isActive,
      }));
    },
  });
};
