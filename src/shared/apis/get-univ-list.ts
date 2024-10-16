import { authInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { Univ } from '../models';

type GetUnivListResponse = {
  UnivID: string;
  UnivName: string;
  UnivAddress: string;
  Longitude: string;
  Latitude: string;
  isActive: boolean;
  UnivEngName: string | null;
};

export const getUnivList = async () => {
  const { data } = await authInstance.get<Univ[]>(API_URLS.admin.getUnivList, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetUnivListResponse[];
      return parsedData.map((item) => ({
        univID: item.UnivID,
        univName: item.UnivName,
        univAddress: item.UnivAddress,
        longitude: item.Longitude,
        latitude: item.Latitude,
        isActive: item.isActive,
        univEngName: item.UnivEngName,
      }));
    },
  });
  return data;
};
