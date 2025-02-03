'use client';

import { Box, Stack, styled } from '@mui/material';
import { Fragment, memo } from 'react';

import { ContentLoadingSkeleton, ContentWrapper, EmptyBox, SaveDataButton } from '@/shared/components';

import { EMPTY_MESSAGE } from '../constants';
import { useChartSettingContainer } from '../hooks';
import { AddModelButton } from './add-model-button';
import { ModelAccordion } from './model-accordion';

export const ChartSettingContainer = memo(() => {
  const {
    containerTitle,
    hasChanges,
    isChartDataLoading,
    isChartDataExist,
    modelNumbers,
    handleAddNewModel,
    handleSaveChanges,
  } = useChartSettingContainer();

  return (
    <ContentWrapper>
      {isChartDataLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <ContentWrapper.Header bottomDivider>
            <HeaderContent>
              <ContentWrapper.Title title={containerTitle} />
              <AddModelButton handleAddNewModel={handleAddNewModel} />
            </HeaderContent>
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            <Fragment>
              {isChartDataExist ? (
                <Fragment>
                  <Box sx={{ mt: 4, width: '100%' }}>
                    {modelNumbers.map((mn) => (
                      <ModelAccordion key={`model-${mn}-accordion`} modelNum={mn} />
                    ))}
                  </Box>
                </Fragment>
              ) : (
                <EmptyBox text={EMPTY_MESSAGE} />
              )}
              {hasChanges && <SaveDataButton handleBtnClick={handleSaveChanges} />}
            </Fragment>
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
});
ChartSettingContainer.displayName = 'ChartSettingContainer';

const HeaderContent = styled(Stack)({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
