'use client';

import { Stack } from '@mui/material';

import { ConfigPreviewCard } from './config-preview-card';
import { ConversionTablePreviewCard } from './conversion-table-preview-card';
import { MethodPreviewCard } from './method-preview-card';

type SettingsOverviewProps = {
  serviceID: string;
};
export const SettingsOverview = ({ serviceID }: SettingsOverviewProps) => {
  return (
    <Stack direction={'row'} gap={3.5} py={4.5} px={1}>
      <ConfigPreviewCard serviceID={serviceID} />
      <MethodPreviewCard serviceID={serviceID} />
      <ConversionTablePreviewCard serviceID={serviceID} />
    </Stack>
  );
};
