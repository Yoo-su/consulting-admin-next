import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const getDetailPageData = async (serviceID: string) => {
  return await apiInstance.get(`${apiUrls.dashboard.detailpage}/${serviceID}`);
};
