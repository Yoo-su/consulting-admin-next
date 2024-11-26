'use client';

import { useContext } from 'react';

import { FlutterSettingContext, FlutterSettingContextValue } from '../contexts';

export const useFlutterSetting = (): FlutterSettingContextValue => {
  const context = useContext(FlutterSettingContext);

  if (!context) {
    throw new Error('useUnivService must be used within a Provider');
  }

  return context;
};
