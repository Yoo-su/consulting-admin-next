'use client';

import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

import { ContentWrapper } from '@/shared/components';
import { useGetServiceListQuery } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { COPY_PREV_DATA_TEXT, SYNC_DATA_TEXT } from '../constants';
import { ServiceAutocomplete } from './service-autocomplete';
import { SyncBox } from './sync-box';

export const ManageContainer = () => {
  const { currentService, currentUniv } = useSharedStore();
  const containerTitle = `${currentUniv?.univName}(${currentService?.serviceID}) 상세페이지 데이터 관리`;
  const { data: serviceList } = useGetServiceListQuery(currentUniv?.univID);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <ContentWrapper.Title title={containerTitle} />
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          {currentUniv && currentService && (
            <Stack direction={'column'} spacing={8} mt={4} mb={6}>
              <Stack direction={'column'} spacing={2}>
                <Stack direction={'row'} spacing={1.5} alignItems={'center'} sx={{ color: '#1F456E' }}>
                  <CloudSyncIcon fontSize="large" />
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: 'inherit',
                    }}
                  >
                    {SYNC_DATA_TEXT}
                  </InputLabel>
                </Stack>
                <SyncBox serviceID={currentService.serviceID} />
              </Stack>

              <Stack direction={'column'} spacing={2}>
                <Stack direction={'row'} spacing={1.5} alignItems={'center'} sx={{ color: '#1F456E' }}>
                  <ContentPasteGoIcon fontSize="large" color="inherit" />
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: 'inherit',
                    }}
                  >
                    {COPY_PREV_DATA_TEXT}
                  </InputLabel>
                </Stack>
                <ServiceAutocomplete serviceID={currentService?.serviceID} serviceList={serviceList ?? []} />
              </Stack>
            </Stack>
          )}
        </Box>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
