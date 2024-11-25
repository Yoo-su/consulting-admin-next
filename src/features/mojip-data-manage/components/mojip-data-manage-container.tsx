'use client';

import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';

import ServiceAutocomplete from './service-autocomplete';
import SyncBox from './sync-box';

const MojipDataManageBox = () => {
  const { currentService, currentUniv, serviceList } = useUnivService();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant="h4"
          textAlign={'left'}
          width={'100%'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 상세페이지 데이터 관리`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          {currentUniv && currentService && (
            <Stack direction={'column'} spacing={8} mt={4} mb={6}>
              <Stack direction={'column'} spacing={2}>
                <Stack
                  direction={'row'}
                  spacing={1.5}
                  alignItems={'center'}
                  sx={{ color: '#1F456E' }}
                >
                  <CloudSyncIcon fontSize="large" />
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: 'inherit',
                    }}
                  >
                    서버간 데이터 동기화
                  </InputLabel>
                </Stack>
                <SyncBox serviceID={currentService.serviceID} />
              </Stack>

              <Stack direction={'column'} spacing={2}>
                <Stack
                  direction={'row'}
                  spacing={1.5}
                  alignItems={'center'}
                  sx={{ color: '#1F456E' }}
                >
                  <ContentPasteGoIcon fontSize="large" color="inherit" />
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: 'inherit',
                    }}
                  >
                    이전 서비스 데이터 복제
                  </InputLabel>
                </Stack>
                <ServiceAutocomplete
                  serviceID={currentService?.serviceID}
                  serviceList={serviceList}
                />
              </Stack>
            </Stack>
          )}
        </Box>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MojipDataManageBox;
