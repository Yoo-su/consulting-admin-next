import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ChartData } from '../models';

export const updateChartData = async (serviceID: string, chartData: ChartData[]) => {
  const transformedChartData = chartData.map((item) => ({
    ServiceID: Number(item.serviceID),
    ModelNum: item.modelNum,
    Label: item.label,
    Percentage: Number(item.percentage),
    Level: item.level,
    ChartLabel: item.chartLabel,
  }));
  return await apiInstance.post(`${API_URLS.dashboard.chartData}/${serviceID}`, {
    chartData: transformedChartData,
  });
};
