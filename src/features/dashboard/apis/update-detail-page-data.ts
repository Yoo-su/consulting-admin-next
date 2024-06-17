import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const updateDetailPageData = async (serviceID: string, data: any) => {
  return await apiInstance.post(`${apiUrls.dashboard.detailpage}/${serviceID}`, {
    serviceID,
  });
};
