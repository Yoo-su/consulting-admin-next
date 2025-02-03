import { DEFAULT_CHART_DATA } from '../constants';
import { ChartData } from '../models';

export const getNewChartData = (overrides: Partial<ChartData> = {}): ChartData => {
  return {
    ...DEFAULT_CHART_DATA,
    ...overrides,
  };
};
