'use client';

import { useContext } from 'react';

import { ChartSettingContext, ChartSettingContextValue } from '../contexts';

export const useChartSetting = (): ChartSettingContextValue => {
  const context = useContext(ChartSettingContext);

  if (!context) {
    throw new Error('useChartSetting must be used within a Provider');
  }

  return context;
};
