'use client';

import Stack from '@mui/material/Stack';

import { useVersionSetting } from '../hooks';
import { TableTitle } from './table-title';
import { VersionListTable } from './version-list-table';
import { TableContainerClass } from '../constants';

export const VersionSettingContainer = () => {
  const { downmd, univName, serviceID, serverType, setServerType } =
    useVersionSetting();

  return (
    <Stack
      direction={downmd ? 'column' : 'row'}
      sx={TableContainerClass}
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
