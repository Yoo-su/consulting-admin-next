import { Alert } from '@mui/material';
import { memo, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useSharedStore } from '@/shared/models';

import { useFoundationStore, useOptionStore, useUiStore } from '../models';

export const UploadStateAlert = memo(() => {
  const currentService = useSharedStore((state) => state.currentService);
  const file = useFoundationStore((state) => state.file);
  const isFileOnly = useOptionStore((state) => state.isFileOnly);
  const { alertOption, setAlertOption } = useUiStore(
    useShallow((state) => ({
      alertOption: state.alertOption,
      setAlertOption: state.setAlertOption,
    }))
  );

  useEffect(() => {
    setAlertOption(null);
  }, [currentService, file, isFileOnly]);

  if (!alertOption) return;

  return (
    <Alert
      severity={alertOption?.color ?? 'info'}
      color={alertOption?.color ?? 'info'}
      sx={{ mt: 4, mx: 'auto', width: '65%' }}
    >
      {alertOption?.message ?? ''}
    </Alert>
  );
});
UploadStateAlert.displayName = 'UploadStateAlert';
