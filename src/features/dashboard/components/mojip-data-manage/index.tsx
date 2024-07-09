'use client';

import Typography from '@mui/material/Typography';

import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';

import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

import SyncBox from './sync-box';
import ServiceAutocomplete from './service-autocomplete';

const MojipDataManageBox = () => {
  const { currentService, currentUniv, serviceList } = useUnivService();

  return (
    <ContentWrapper>
      <Typography
        variant="h6"
        textAlign={'left'}
        width={'100%'}
      >{`${currentUniv?.univName}(${currentService?.serviceID}) 모집요강 데이터 관리`}</Typography>

      {currentUniv && currentService && (
        <Stack direction={'column'} spacing={8} mt={4} py={10}>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={1.5} alignItems={'center'} sx={{ color: '#1F456E' }}>
              <CloudSyncIcon fontSize="large" />
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '16px', color: 'inherit' }}>
                서버간 데이터 동기화
              </InputLabel>
            </Stack>
            <SyncBox serviceID={currentService.serviceID} />
          </Stack>

          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={1.5} alignItems={'center'} sx={{ color: '#1F456E' }}>
              <ContentPasteGoIcon fontSize="large" color="inherit" />
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '16px', color: 'inherit' }}>
                현재 서비스 데이터를 타 서비스로 복제
              </InputLabel>
            </Stack>
            <ServiceAutocomplete serviceID={currentService?.serviceID} serviceList={serviceList} />
          </Stack>
        </Stack>
      )}
    </ContentWrapper>
  );
};

export default MojipDataManageBox;
