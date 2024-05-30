'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

import { useUnivService } from '../hooks/context/use-univ-service';
import { useGetChartData } from '../hooks/use-get-chart-data';
import { ChartData } from '../types/chart-data.type';

export type ChartSettingContextValue = {
  chartData: ChartData[];
  setChartData: (chartData: ChartData[]) => void;
};

export const ChartSettingContext = createContext<ChartSettingContextValue | undefined>(undefined);

export type ChartSettingProviderProps = {
  children: ReactNode;
};
const ChartSettingProvider = ({ children }: ChartSettingProviderProps) => {
  const { currentService } = useUnivService();
  const { chartData, setChartData } = useGetChartData(currentService?.serviceID ?? '');

  return (
    <ChartSettingContext.Provider
      value={{
        chartData,
        setChartData,
      }}
    >
      {children}
    </ChartSettingContext.Provider>
  );
};

export default ChartSettingProvider;
