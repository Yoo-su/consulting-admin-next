'use client';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { VersionServer } from '../../models';
import { SelectServer } from './select-server';

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
        <SelectServer setServerType={setServerType} />
        <Typography variant="h6">버전 목록</Typography>
      </Stack>
    </Stack>
  );
};
