import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { DetailPageData } from '../models';

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

  return await apiInstance.post(`${API_URLS.dashboard.updateDetailpageData}/${serviceID}`, {
    detailPages: transformedDetailpageData,
  });
};
