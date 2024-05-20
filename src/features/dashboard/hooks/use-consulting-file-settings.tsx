import { useContext } from 'react';

import {
  ConsultingFileSettingsContextValue,
  ConsultingFileSettingsContext,
} from '../contexts/consulting-file-settings-context';

export const useConsultingFileSettings = (): ConsultingFileSettingsContextValue => {
  const context = useContext(ConsultingFileSettingsContext);

  if (!context) {
    throw new Error('useConsultingFileSettings must be used within a Provider');
  }

  return context;
};
