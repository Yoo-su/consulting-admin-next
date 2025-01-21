'use client';

import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

import {
  ContentLoadingSkeleton,
  ContentWrapper,
  EmptyBox,
  SaveDataButton,
} from '@/shared/components';

import { useDetailPageContainer } from '../hooks';
import { AddNewDataButton } from './add-new-data-button';
import { DetailPageDataAccordion } from './detail-page-data-accordion';

export const DetailPageSettingContainer = () => {
  const {
    containerTitle,
    detailPageDatas,
    isDetailPageDataLoading,
    isPostDetailPageDataLoading,
    hasChanges,
    handleAddNewData,
    handleSaveChanges,
  } = useDetailPageContainer();

  return (
    <ContentWrapper>
      {isDetailPageDataLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <ContentWrapper.Header bottomDivider>
            <Stack
              width={'100%'}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h4" textAlign={'left'} width={'100%'}>
                {containerTitle}
              </Typography>
              <AddNewDataButton handleClick={handleAddNewData} />
            </Stack>
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            <Fragment>
              {detailPageDatas?.length ? (
                <AccordionList>
                  <Stack direction={'column'} width={'100%'}>
                    {detailPageDatas?.map((item) => {
                      const mapItemKey = `${item.serviceID}-detailPageDataRowNum-${item.rowNum}`;
                      return (
                        <DetailPageDataAccordion key={mapItemKey} {...item} />
                      );
                    })}
                  </Stack>
                </AccordionList>
              ) : (
                <EmptyBox text={'상세페이지 데이터가 존재하지 않습니다'} />
              )}
            </Fragment>

            {hasChanges && (
              <SaveDataButton
                disabled={isPostDetailPageDataLoading}
                handleBtnClick={handleSaveChanges}
              />
            )}
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
};

const AccordionList = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '2rem',
  width: '100%',
});
