'use client';

import { useContext } from 'react';

import { MojipSettingContext, MojipSettingContextValue } from '../contexts';

export const useMojipSetting = (): MojipSettingContextValue => {
  const context = useContext(MojipSettingContext);

  if (!context) {
    throw new Error('useMojipSetting must be used within a Provider');
  }

  return context;
};
