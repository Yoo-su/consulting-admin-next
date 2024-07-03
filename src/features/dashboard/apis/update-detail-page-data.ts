import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { DetailPageData } from '../types/detail-page-data.type';

export const updateDetailPageData = async (serviceID: string, detailPageData: DetailPageData[]) => {
  const transformedDetailpageData = detailPageData.map((item) => {
    return {
      ServiceID: item.serviceID,
      RowNum: item.rowNum,
      Condition: item.condition,
      ConditionText: item.conditionText,
      HtmlCard: item.htmlCard,
      Mode: item.mode,
    };
  });

  return await apiInstance.post(`${apiUrls.dashboard.updateDetailpageData}/${serviceID}`, {
    detailPages: transformedDetailpageData,
  });
};
