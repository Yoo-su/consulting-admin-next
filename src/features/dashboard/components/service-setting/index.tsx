'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ServiceListTable from './service-table';
import AddServiceForm from './add-service-form';
import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';

const ServiceSettingBox = () => {
  const { serviceList, currentUniv } = useUnivService();

  return (
    <Stack direction={'column'} sx={{ mt: 5 }} spacing={5}>
      <AddServiceForm univID={currentUniv?.univID ?? ''} />

      <Stack direction={'column'} spacing={2}>
        <Typography variant="h6">
          {currentUniv?.univName}({currentUniv?.univID}) 서비스 목록
        </Typography>
        <ServiceListTable serviceList={serviceList} />
      </Stack>
    </Stack>
  );
};
export default ServiceSettingBox;
