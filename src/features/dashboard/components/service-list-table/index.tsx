'use client';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ServiceListTable = () => {
  const { currentUniv } = useUnivService();

  return (
    <Stack direction={'column'}>
      <Typography variant="body1">{currentUniv?.univID}</Typography>
      <Typography variant="body1">{currentUniv?.univName}</Typography>
    </Stack>
  );
};
export default ServiceListTable;
