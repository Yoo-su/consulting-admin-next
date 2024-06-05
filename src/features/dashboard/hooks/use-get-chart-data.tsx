import { useState, useCallback } from 'react';
import { getChartData } from '../apis/get-chart-data';
import { ChartData } from '../types/chart-data.type';

export const useGetChartData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState<ChartData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const execute = (serviceID: string) => {
    getChartData(serviceID).then((res) => {
      setOriginalData(res.data);
      setChartData(res.data);
      setIsLoading(false);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { chartData, setChartData, originalData, isLoading, execute: useCallback(execute, []) };
};
