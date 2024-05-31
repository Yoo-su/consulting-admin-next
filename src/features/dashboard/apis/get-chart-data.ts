import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ChartData } from '../types/chart-data.type';

type GetChartDataResponse = {
  ServiceID: number;
  ModelNum: number;
  Label: string;
  Percentage: number;
  Level: number;
  ChartLabel: string;
};

export const getChartData = async (serviceID: string) => {
  return await apiInstance.get<ChartData[]>(`${apiUrls.dashboard.chartData}/${serviceID}`, {
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
};
