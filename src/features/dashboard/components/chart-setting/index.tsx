'use client';

import { useMemo, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import SaveChartDataButton from './save-chart-data-button';
import EmptyBox from '@/shared/components/empty-box';
import { getGroupedData } from '../overview/consultingapp-state-board/services/get-grouped-data';
import ModelAccordion from './model-accordion';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const { isLoading, chartData, modelNumbers, addNewModel } = useChartSetting();

  /**
   *  모델 번호로 그룹핑된 데이터
   */
  const groupedByModelNum = useMemo(() => {
    return getGroupedData(chartData, 'modelNum', modelNumbers);
  }, [chartData]);

  return (
    <Stack
      direction={'column'}
      sx={{
        position: 'relative',
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
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
              <SaveChartDataButton />
              <Box sx={{ mt: 4 }}>
                {modelNumbers.map((mn) => {
                  return (
                    <ModelAccordion
                      key={`model-${mn}-accordion`}
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
    </Stack>
  );
};

export default ChartSettingBox;
