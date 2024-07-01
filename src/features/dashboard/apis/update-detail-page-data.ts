import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { DetailPageData } from '../types/detail-page-data.type';

export const updateDetailPageData = async (serviceID: string, detailPageDatas: DetailPageData[]) => {
  return await apiInstance.post(`${apiUrls.dashboard.updateDetailpageData}/${serviceID}`, {
    serviceID,
    detailPages: detailPageDatas,
  });
};
