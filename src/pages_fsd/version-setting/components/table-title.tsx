'use client';

import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SelectClass, VERSION_SERVER } from '../constants';
import { VersionServer } from '../models';

type TableTitleProps = {
  univName: string;
  serviceID: string;
  setServerType: React.Dispatch<React.SetStateAction<VersionServer>>;
};

export const TableTitle = ({
  univName,
  serviceID,
  setServerType,
}: TableTitleProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServerType(
      VERSION_SERVER.find((server) => server.value === event.target.value)!
    );
  };
  return (
    <Stack
      direction={downmd ? 'row' : 'column'}
      spacing={1}
      alignItems={'center'}
      sx={{ paddingBottom: downmd ? 0 : '10rem' }}
    >
      <Typography variant="h6">
        {univName}({serviceID}) 서비스
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography variant="h6">테이블</Typography>
        <TextField
          size="small"
          select
          defaultValue={'testDb'}
          onChange={handleChange}
          sx={SelectClass}
          variant="standard"
        >
          {VERSION_SERVER.map((server) => (
            <MenuItem
              key={server.value as string}
              value={server.value as string}
            >
              {server.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6">버전 목록</Typography>
      </Stack>
    </Stack>
  );
};
