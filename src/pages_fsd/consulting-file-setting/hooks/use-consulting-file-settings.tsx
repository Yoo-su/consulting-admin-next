import { useContext } from 'react';

import { ConsultingFileSettingsContext, ConsultingFileSettingsContextValue } from '../contexts';

export const useConsultingFileSettings = (): ConsultingFileSettingsContextValue => {
  const context = useContext(ConsultingFileSettingsContext);

  if (!context) {
    throw new Error('useConsultingFileSettings must be used within a Provider');
  }

  return context;
};
