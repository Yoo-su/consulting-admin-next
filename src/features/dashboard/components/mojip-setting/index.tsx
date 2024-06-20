'use client';

import { Fragment, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ServiceAutocomplete from './service-autocomplete';
import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import MojipAccordion from './mojip-accordion';
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

  return (
    <ContentWrapper>
      {isPending ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            <Typography
              variant="h6"
              textAlign={'left'}
              width={'100%'}
            >{`${currentUniv?.univName}(${currentService?.serviceID}) 모집요강 설정`}</Typography>

            {currentUniv && currentService && (
              <ServiceAutocomplete univID={currentUniv?.univID} serviceID={currentService?.serviceID} />
            )}
          </Stack>

          {detailPageData?.length ? (
            <Box sx={{ mt: 4, width: '100%' }}>
              {detailPageData?.map((item) => (
                <MojipAccordion
                  key={item.serviceID + item.rowNum}
                  selectedRowNum={selected}
                  handleSelectRow={handleChangeSelected}
                  detailPageData={item}
                />
              ))}
            </Box>
          ) : (
            <EmptyBox text={'상세페이지 데이터가 존재하지 않습니다'} />
          )}
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default MojipSettingBox;
