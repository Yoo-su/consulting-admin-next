import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const GET_SERVICE_LIST_URL = process.env.NEXT_PUBLIC_BASE_URL + apiUrls.setup.getServiceList;

export const getServiceList = async (univID: string) => {
  return await apiInstance.get(GET_SERVICE_LIST_URL, {
    params: {
      univID,
    },
  });
};
