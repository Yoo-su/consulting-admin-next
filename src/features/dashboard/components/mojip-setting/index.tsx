'use client';

import { Fragment, useCallback, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import ServiceAutocomplete from './service-autocomplete';
import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import MojipAccordion from './mojip-accordion';
import SyncBox from './sync-box';
import { useGetDetailPageDataQuery } from '../../hooks/tanstack/use-get-detail-page-data-query';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import EmptyBox from '@/shared/components/empty-box';

const MojipSettingBox = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { currentService, currentUniv } = useUnivService();
  const { data: detailPageData, isPending } = useGetDetailPageDataQuery(currentService?.serviceID);
  const handleChangeSelected = useCallback((selectedRow: number | null) => {
    setSelected(selectedRow);
  }, []);

  useEffect(() => {
    setSelected(null);
  }, [currentService]);

  return (
    <ContentWrapper>
      {isPending ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography
              variant="h6"
              textAlign={'left'}
              width={'100%'}
            >{`${currentUniv?.univName}(${currentService?.serviceID}) 모집요강 설정`}</Typography>
          </Stack>

          {detailPageData?.length ? (
            <Stack direction={'column'} alignItems={'flex-start'} sx={{ mt: 4, width: '100%' }} spacing={5}>
              {currentUniv && currentService && (
                <Stack direction={'column'} spacing={1.5}>
                  <InputLabel sx={{ fontWeight: 'bold' }}>데이터 동기화 및 복제</InputLabel>
                  <Stack direction={'row'} alignItems={'flex-end'} spacing={10}>
                    <SyncBox serviceID={currentService.serviceID} />
                    <ServiceAutocomplete univID={currentUniv?.univID} serviceID={currentService?.serviceID} />
                  </Stack>
                </Stack>
              )}
              <Stack direction={'column'} width={'100%'}>
                <InputLabel sx={{ fontWeight: 'bold', mb: 1.5 }}>모집요강 목록</InputLabel>
                {detailPageData?.map((item) => (
                  <MojipAccordion
                    key={item.serviceID + item.rowNum}
                    selectedRowNum={selected}
                    handleSelectRow={handleChangeSelected}
                    detailPageData={item}
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <EmptyBox text={'상세페이지 데이터가 존재하지 않습니다'} />
          )}
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default MojipSettingBox;
