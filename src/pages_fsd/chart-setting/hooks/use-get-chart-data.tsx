import { useCallback, useState } from 'react';

import { getChartData } from '../apis';
import { ChartData } from '../models';

export const useGetChartData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState<ChartData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const execute = (serviceID: string) => {
    getChartData(serviceID).then((res) => {
      const sortedByModelNum = [...res.data].sort(
        (a, b) => a.modelNum - b.modelNum
      );
      setOriginalData(sortedByModelNum);
      setChartData(sortedByModelNum);
      setIsLoading(false);
    });
  };

  const handleChangeChartData = (newChartData: ChartData[]) => {
    const sortedByModelNum = [...newChartData].sort(
      (a, b) => a.modelNum - b.modelNum
    );
    setChartData(sortedByModelNum);
  };

  const syncChartData = () => {
    setOriginalData([...chartData]);
  };

  return {
    chartData,
    setChartData: handleChangeChartData,
    originalData,
    isLoading,
    execute: useCallback(execute, []),
    syncChartData: useCallback(syncChartData, [chartData]),
  };
};
