import { useContext } from 'react';

import { ConsultingAppStateContext, ConsultingAppStateContextValue } from '../contexts';

export const useConsultingAppState = (): ConsultingAppStateContextValue => {
  const context = useContext(ConsultingAppStateContext);

  if (!context) {
    throw new Error('useGetConsultingAppState must be used within a Provider');
  }

  return context;
};
