'use client';

import Stack from '@mui/material/Stack';

import { useVersionSetting } from '../hooks';
import { TableTitle } from './table-title';
import { VersionListTable } from './version-list-table';

export const VersionSettingContainer = () => {
  const { downmd, univName, serviceID, serverType, setServerType } =
    useVersionSetting();

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
