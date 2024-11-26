import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { VERSION_SERVER } from '../constants';
import { VersionServer } from '../models';

type TableTitleProps = {
  univName: string;
  serviceID: string;
  setServerType: React.Dispatch<React.SetStateAction<VersionServer>>;
};

const TableTitle = ({
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
            <MenuItem key={server.value} value={server.value}>
              {server.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6">버전 목록</Typography>
      </Stack>
    </Stack>
  );
};

export default TableTitle;

const SelectClass = {
  '& .MuiSelect-select': {
    padding: '2px 4px',
    margin: 0,
    fontFamily: '__IBM_Plex_Sans_KR_e39452,__IBM_Plex_Sans_KR_Fallback_e39452',
    fontSize: '1.25rem',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    fontWeight: '700',
    minWidth: '55px !important',
  },
};
