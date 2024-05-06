import { useContext } from 'react';

import { UnivServiceContext } from '../contexts/univ-service-context';
import { UnivServiceContextValue } from '../contexts/univ-service-context';

export const useUnivService = (): UnivServiceContextValue => {
  const context = useContext(UnivServiceContext);

  if (!context) {
    throw new Error('useUnivServiec must be used within a Provider');
  }

  return context;
};
