'use client';

import { Fragment, useCallback, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

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
              <Stack direction={'column'} width={'100%'}>
                {detailPageData?.map((item) => (
                  <MojipAccordion
                    serviceID={currentService?.serviceID ?? ''}
                    key={item.serviceID + '-detailpage-data-row-num-' + item.rowNum}
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
