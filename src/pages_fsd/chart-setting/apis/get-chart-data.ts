import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ChartData } from '../models';

type GetChartDataResponse = {
  ServiceID: number;
  ModelNum: number;
  Label: string;
  Percentage: number;
  Level: number;
  ChartLabel: string;
};

export const getChartData = async (serviceID: string) => {
  const { data } = await apiInstance.get<ChartData[]>(`${API_URLS.dashboard.chartData}/${serviceID}`, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetChartDataResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID.toString(),
        modelNum: item.ModelNum,
        label: item.Label,
        percentage: item.Percentage,
        level: item.Level,
        chartLabel: item.ChartLabel,
      }));
    },
  });
  return data;
};
