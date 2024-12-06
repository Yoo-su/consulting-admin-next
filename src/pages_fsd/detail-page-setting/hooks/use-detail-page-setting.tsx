'use client';

import { useContext } from 'react';

import {
  DetailPageSettingContext,
  DetailPageSettingContextValue,
} from '../contexts';

export const useDetailPageSetting = (): DetailPageSettingContextValue => {
  const context = useContext(DetailPageSettingContext);

  if (!context) {
    throw new Error('useMojipSetting must be used within a Provider');
  }

  return context;
};
