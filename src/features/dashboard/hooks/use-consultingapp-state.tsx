import { useContext } from 'react';

import { ConsultingAppStateContext } from '../contexts/consultingapp-state-context';
import { ConsultingAppStateContextValue } from '../contexts/consultingapp-state-context';

export const useConsultingAppState = (): ConsultingAppStateContextValue => {
  const context = useContext(ConsultingAppStateContext);

  if (!context) {
    throw new Error('useGetConsultingAppState must be used within a Provider');
  }

  return context;
};
