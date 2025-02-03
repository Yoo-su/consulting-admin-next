import { useCallback, useEffect, useMemo, useState } from 'react';

import { ChartData } from '../models';

export const useModelChartBox = (modelLevels: number[], modelChartData: ChartData[]) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(modelLevels[0] || null);

  const filteredData = useMemo(() => {
    if (!selectedLevel) return [];
    return modelChartData.filter((data) => data.level === selectedLevel);
  }, [modelChartData, selectedLevel]);

  const chartData = useMemo(() => {
    return filteredData.map((data) => ({
      id: data.label ?? '',
      value: data.percentage,
      label: data.chartLabel ?? '',
    }));
  }, [filteredData]);

  const handleSelectLevel = useCallback((level: number) => {
    setSelectedLevel(level);
  }, []);

  useEffect(() => {
    if (selectedLevel && !modelLevels.includes(selectedLevel)) {
      setSelectedLevel(modelLevels[0] || null);
    }
  }, [modelLevels, selectedLevel]);

  return {
    selectedLevel,
    chartData,
    handleSelectLevel,
  };
};
