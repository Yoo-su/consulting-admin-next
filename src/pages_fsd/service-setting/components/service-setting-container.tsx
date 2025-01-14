'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetServiceListQuery } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { AddServiceForm } from './add-service-form';
import { ServiceListTable } from './service-table';

export const ServiceSettingContainer = () => {
  const currentUniv = useSharedStore((state) => state.currentUniv);
  const { data: serviceList } = useGetServiceListQuery(currentUniv?.univID);

  return (
    <Stack
      direction={'column'}
      sx={{ mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 } }}
      spacing={5}
    >
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h4">서비스 추가</Typography>
        <AddServiceForm univID={currentUniv?.univID ?? ''} />
      </Stack>
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h4">
          {currentUniv?.univName}({currentUniv?.univID}) 서비스 목록
        </Typography>
        <ServiceListTable serviceList={serviceList ?? []} />
      </Stack>
    </Stack>
  );
};
