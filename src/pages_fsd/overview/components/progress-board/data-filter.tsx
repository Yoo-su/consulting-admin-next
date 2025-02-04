import { Stack, Typography } from '@mui/material';

import { ServiceTypeSelect, ServiceYearSelect } from './selects';

export const DataFilter = () => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <ServiceYearSelect />
      <Typography variant="h6">학년도</Typography>
      <ServiceTypeSelect />
    </Stack>
  );
};
