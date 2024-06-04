'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ServiceListTable from './service-table';
import AddServiceForm from './add-service-form';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';

const ServiceSettingBox = () => {
  const { serviceList, currentUniv } = useUnivService();

  return (
    <Stack direction={'column'} sx={{ mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 } }} spacing={5}>
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h6">서비스 추가</Typography>
        <AddServiceForm univID={currentUniv?.univID ?? ''} />
      </Stack>
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
