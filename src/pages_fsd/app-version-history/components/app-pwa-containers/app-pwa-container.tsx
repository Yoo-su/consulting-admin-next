'use client';

import Stack from '@mui/material/Stack';

import { useSharedStore } from '@/shared/models';

import { AppPWABody } from './app-pwa-body';
import { AppPWAHeader } from './app-pwa-header';

export const AppPWAContainer = () => {
  const { currentUniv, currentService } = useSharedStore();
  const { univEngName, univName } = currentUniv || {};
  const { schoolYear, isSusi, serviceID, serialNo } = currentService || {};

  return (
    <Stack direction={'column'} spacing={4} sx={{ paddingBottom: '.5rem' }}>
      <AppPWAHeader
        univName={univName}
        serviceID={serviceID}
        serialNo={serialNo}
      />
      <AppPWABody
        univEngName={univEngName}
        schoolYear={schoolYear}
        isSusi={isSusi}
      />
    </Stack>
  );
};
