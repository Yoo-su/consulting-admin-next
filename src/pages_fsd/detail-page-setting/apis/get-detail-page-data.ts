import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { DetailPageData } from '../models';

type GetDetailPageDataResponse = {
  ServiceID: number;
  RowNum: number;
  Condition: string;
  HtmlCard: string;
  ConditionText: string;
  Mode: string;
};

export const getDetailPageData = async (serviceID: string) => {
  const { data } = await apiInstance.get<DetailPageData[]>(`${API_URLS.dashboard.detailpage}/${serviceID}`, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetDetailPageDataResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID.toString(),
        rowNum: item.RowNum,
        condition: item.Condition,
        htmlCard: item.HtmlCard,
        conditionText: item.ConditionText,
        mode: item.Mode,
      }));
    },
  });
  return data;
};
