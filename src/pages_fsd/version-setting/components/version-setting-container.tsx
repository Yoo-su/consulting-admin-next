'use client';

import Stack from '@mui/material/Stack';

import { TableContainerClass } from '../constants';
import { useVersionSetting } from '../hooks';
import { VersionListTable } from './table-list';
import { TableTitle } from './table-title';

export const VersionSettingContainer = () => {
  const { downmd, univName, serviceID, serverType, setServerType } = useVersionSetting();

  return (
    <Stack
      direction={downmd ? 'column' : 'row'}
      sx={TableContainerClass}
      spacing={1}
      alignItems={'center'}
      justifyContent={'space-evenly'}
    >
      <TableTitle univName={univName} serviceID={serviceID} setServerType={setServerType} />
      <VersionListTable serviceID={serviceID} type={serverType} />
    </Stack>
  );
};
