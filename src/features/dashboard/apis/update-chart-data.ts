import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ChartData } from '../types/chart-data.type';

export const updateChartData = async (serviceID: string, chartData: ChartData[]) => {
  const transformedChartData = chartData.map((item) => ({
    ServiceID: Number(item.serviceID),
    ModelNum: item.modelNum,
    Label: item.label,
    Percentage: Number(item.percentage),
    Level: item.level,
    ChartLabel: item.chartLabel,
  }));
  return await apiInstance.post<ChartData[]>(`${apiUrls.dashboard.chartData}/${serviceID}`, {
    chartData: transformedChartData,
  });
};
