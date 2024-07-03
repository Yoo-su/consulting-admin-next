'use client';

import { useContext } from 'react';

import { UnivServiceContext, UnivServiceContextValue } from '../../contexts/univ-service-context';

export const useUnivService = (): UnivServiceContextValue => {
  const context = useContext(UnivServiceContext);

  if (!context) {
    throw new Error('useUnivService must be used within a Provider');
  }

  return context;
};
