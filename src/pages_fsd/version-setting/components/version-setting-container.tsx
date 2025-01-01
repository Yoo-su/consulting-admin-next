'use client';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

import { useSharedStore } from '@/shared/models';

import { TableTitle } from './table-title';
import { VersionListTable } from './version-list-table';

export type VersionServer = { value: 'testDb' | 'realDb'; label: string };
export const versionServer: VersionServer[] = [
  { value: 'testDb', label: '테스트' },
  { value: 'realDb', label: '리얼' },
];

export const VersionSettingContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const { currentUniv, currentService } = useSharedStore();
  const [serverType, setServerType] = useState<VersionServer>(versionServer[0]);
  const { univName } = currentUniv!;
  const { serviceID } = currentService!;

  return (
    <Stack
      direction={downmd ? 'column' : 'row'}
      sx={{
        mt: { xs: 1, sm: 3, md: 3, lg: 3, xl: 5 },
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
      spacing={1}
      alignItems={'center'}
      justifyContent={'space-evenly'}
    >
      <TableTitle
        univName={univName}
        serviceID={serviceID}
        setServerType={setServerType}
      />
      <VersionListTable serviceID={serviceID} type={serverType} />
    </Stack>
  );
};
