import { ChartData } from '../models';

export const getDistinctColumnValues = (
  chartData: ChartData[],
  columnKey: keyof ChartData
) => {
  return Array.from(new Set(chartData.map((item) => item[columnKey])));
};
