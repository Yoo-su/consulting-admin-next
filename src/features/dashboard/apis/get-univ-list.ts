import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { Univ } from '../types/univ.type';

type GetUnivListResponse = {
  UnivID: string;
  UnivName: string;
  UnivAddress: string;
  Longitude: string;
  Latitude: string;
  isActive: boolean;
};

export const getUnivList = async () => {
  const { data } = await apiInstance.get<Univ[]>(apiUrls.admin.getUnivList, {
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
  return data;
};
