import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { DetailPageData } from '../types/detail-page-data.type';

type GetDetailPageDataResponse = {
  ServiceID: number;
  RowNum: number;
  Condition: string;
  HtmlCard: string;
  ConditionText: string;
  Mode: string;
};

export const getDetailPageData = async (serviceID: string) => {
  const { data } = await apiInstance.get<DetailPageData[]>(`${apiUrls.dashboard.detailpage}/${serviceID}`, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetDetailPageDataResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID,
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
