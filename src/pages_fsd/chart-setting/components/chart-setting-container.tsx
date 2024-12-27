'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment, memo, useCallback, useState } from 'react';

import {
  ContentLoadingSkeleton,
  ContentWrapper,
  EmptyBox,
  SaveDataButton,
} from '@/shared/components';
import { useSharedStore } from '@/shared/models';

import { useChartSettingContainer, useUpdateChartDataMutation } from '../hooks';
import { ModelAccordion } from './model-accordion';

export const ChartSettingContainer = memo(() => {
  const { currentUniv, currentService } = useSharedStore();
  const {
    hasChanges,
    isChartDataLoading,
    isChartDataExist,
    modelNumbers,
    addNewModel,
    handleSaveBtnClick,
  } = useChartSettingContainer();

  return (
    <ContentWrapper>
      {isChartDataLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <ContentWrapper.Header bottomDivider>
            <Stack
              width={'100%'}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="h4">{`${currentUniv?.univName}(${currentService?.serviceID}) 차트 데이터 설정`}</Typography>
              <Chip
                color="info"
                size="small"
                icon={<AddCircleIcon fontSize="inherit" />}
                label={<Typography variant="button">모델 추가</Typography>}
                clickable
                onClick={addNewModel}
              />
            </Stack>
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            <Fragment>
              {isChartDataExist ? (
                <Fragment>
                  <Box sx={{ mt: 4, width: '100%' }}>
                    {modelNumbers.map((mn) => {
                      return (
                        <ModelAccordion
                          key={`model-${mn}-accordion`}
                          modelNum={mn}
                        />
                      );
                    })}
                  </Box>
                </Fragment>
              ) : (
                <EmptyBox text={'등록된 모델이 없습니다'} />
              )}
              {hasChanges && (
                <SaveDataButton handleBtnClick={handleSaveBtnClick} />
              )}
            </Fragment>
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
});
ChartSettingContainer.displayName = 'ChartSettingContainer';
