'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useUnivService } from '@/shared/hooks/context';

import AddServiceForm from './add-service-form';
import ServiceListTable from './service-table';

const ServiceSettingBox = () => {
  const { serviceList, currentUniv } = useUnivService();

  return (
    <>
      {currentUniv ? (
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
            <ServiceListTable serviceList={serviceList} />
          </Stack>
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Alert color="info" icon={<InfoOutlinedIcon />}>
              대학이 선택되지 않았습니다. 사이드바에서 값을 선택해주세요
            </Alert>
          </Box>
        </>
      )}
    </>
  );
};
export default ServiceSettingBox;
