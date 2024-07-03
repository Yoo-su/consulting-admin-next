'use client';

import { useContext } from 'react';

import { MojipSettingContextValue, MojipSettingContext } from '../../contexts/mojip-setting-context';

export const useMojipSetting = (): MojipSettingContextValue => {
  const context = useContext(MojipSettingContext);

  if (!context) {
    throw new Error('useMojipSetting must be used within a Provider');
  }

  return context;
};
