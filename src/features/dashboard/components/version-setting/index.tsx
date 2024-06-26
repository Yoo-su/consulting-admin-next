'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import VersionListTable from './version-list-table';

const versionServer: VersionServer[] = [
  { value: 'testDb', label: '테스트' },
  { value: 'realDb', label: '리얼' },
];

export type VersionServer = { value: 'testDb' | 'realDb'; label: string };

const VersionSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const [serverType, setServerType] = useState<VersionServer>({ value: 'testDb', label: '테스트' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServerType(versionServer.find((server) => server.value === event.target.value)!);
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 1, sm: 3, md: 3, lg: 3, xl: 5 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
      spacing={1}
      alignItems={'center'}
    >
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography variant="h6">
          {currentUniv!.univName}({currentService!.serviceID}) 서비스 테이블
        </Typography>
        <TextField size="small" select defaultValue={'testDb'} onChange={handleChange} sx={SelectClass}>
          {versionServer.map((server) => (
            <MenuItem key={server.value} value={server.value}>
              {server.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6">버전 목록</Typography>
      </Stack>
      <VersionListTable serviceID={currentService!.serviceID} type={serverType} />
    </Stack>
  );
};
export default VersionSettingBox;

const SelectClass = {
  '& .MuiSelect-select': {
    padding: '2px 14px',
    margin: 0,
    fontFamily: '__IBM_Plex_Sans_KR_e39452,__IBM_Plex_Sans_KR_Fallback_e39452',
    fontSize: '1.25rem',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    fontWeight: '700',
  },
};
