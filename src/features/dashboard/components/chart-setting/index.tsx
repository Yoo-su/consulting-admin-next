'use client';

import { useState, useMemo, Fragment, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import SaveChartDataButton from './save-chart-data-button';
import EmptyBox from '@/shared/components/empty-box';
import { getGroupedData } from '../../services/overview/get-grouped-data';
import ModelAccordion from './model-accordion';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import ContentWrapper from '@/shared/components/content-wrapper';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const { isLoading, chartData, modelNumbers, addNewModel } = useChartSetting();

  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const handleSelectModel = useCallback((modelNum: number) => {
    setSelectedModel(modelNum);
  }, []);
  /**
   *  모델 번호로 그룹핑된 데이터
   */
  const groupedByModelNum = useMemo(() => {
    return getGroupedData(chartData, 'modelNum', modelNumbers);
  }, [chartData]);

  return (
    <ContentWrapper>
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h6">{`${currentUniv?.univName}(${currentService?.serviceID}) 차트 데이터 설정`}</Typography>
            <Chip
              color="info"
              size="small"
              icon={<AddCircleIcon fontSize="inherit" />}
              label={<Typography variant="button">모델 추가</Typography>}
              clickable
              onClick={addNewModel}
            />
          </Stack>
          {chartData.length ? (
            <Fragment>
              {currentService && <SaveChartDataButton serviceID={currentService.serviceID} />}
              <Box sx={{ mt: 4, width: '100%' }}>
                {modelNumbers.map((mn) => {
                  return (
                    <ModelAccordion
                      key={`model-${mn}-accordion`}
                      selectedModel={selectedModel}
                      setSelectedModel={handleSelectModel}
                      modelNum={mn}
                      modelChartData={groupedByModelNum[mn]}
                    />
                  );
                })}
              </Box>
            </Fragment>
          ) : (
            <EmptyBox text={'등록된 모델이 없습니다'} />
          )}
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default ChartSettingBox;
