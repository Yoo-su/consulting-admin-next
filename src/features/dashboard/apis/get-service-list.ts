import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const getServiceListUrl = `${process.env.NEXT_PUBLIC_BASE_URL + apiUrls.setup.getServiceList}`;

export const getServiceList = async (univID: string) => {
  return await apiInstance.get(getServiceListUrl, {
    params: {
      univID,
    },
  });
};
