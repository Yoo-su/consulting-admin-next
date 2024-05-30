import { useState, useEffect, useCallback } from 'react';
import { getChartData } from '../apis/get-chart-data';
import { ChartData } from '../types/chart-data.type';

export const useGetChartData = (serviceID: string) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const execute = useCallback(() => {
    if (!serviceID) return;
    getChartData(serviceID).then((res) => {
      setChartData(res.data);
    });
  }, [serviceID]);

  useEffect(() => {
    if (serviceID) execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceID]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { chartData, setChartData };
};
