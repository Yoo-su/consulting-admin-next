import { Chip, Stack, Typography } from '@mui/material';
import { memo } from 'react';

import { DeveloperChipClass } from '@/pages_fsd/overview/constants';

type DeveloperInfoProps = {
  name: string;
  serviceCnt: number;
};
export const DeveloperInfo = memo(({ name, serviceCnt }: DeveloperInfoProps) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Chip size="small" label={name} sx={DeveloperChipClass} />
      <Typography variant="caption" sx={{ marginLeft: 1 }}>
        {serviceCnt}건
      </Typography>
    </Stack>
  );
});
DeveloperInfo.displayName = 'DeveloperInfo';
