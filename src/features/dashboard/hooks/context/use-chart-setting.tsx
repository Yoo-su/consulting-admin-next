'use client';

import { useContext } from 'react';

import { ChartSettingContext } from '../../contexts/chart-setting-context';
import { ChartSettingContextValue } from '../../contexts/chart-setting-context';

export const useChartSetting = (): ChartSettingContextValue => {
  const context = useContext(ChartSettingContext);

  if (!context) {
    throw new Error('useChartSetting must be used within a Provider');
  }

  return context;
};
