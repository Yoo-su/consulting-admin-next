'use client';

import { Stack } from '@mui/material';

import { ConfigPreviewCard } from './config-preview-card';
import { ConversionTablePreviewCard } from './conversion-table-preview-card';
import { MethodPreviewCard } from './method-preview-card';

export const SettingsOverview = () => {
  return (
    <Stack direction={'row'} gap={3.5} py={4.5} px={1}>
      <ConfigPreviewCard />
      <MethodPreviewCard />
      <ConversionTablePreviewCard />
    </Stack>
  );
};
