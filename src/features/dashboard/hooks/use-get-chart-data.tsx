import { useState, useEffect, useCallback } from 'react';
import { getChartData } from '../apis/get-chart-data';
import { ChartData } from '../types/chart-data.type';

export const useGetChartData = (serviceID: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const execute = useCallback(() => {
    if (!serviceID) return;
    setIsLoading(true);
    getChartData(serviceID).then((res) => {
      setChartData(res.data);
      setIsLoading(false);
    });
  }, [serviceID]);

  useEffect(() => {
    if (serviceID) execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceID]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { chartData, setChartData, isLoading };
};
