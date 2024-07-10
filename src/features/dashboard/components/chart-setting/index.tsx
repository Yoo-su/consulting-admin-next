'use client';

import { useState, useMemo, Fragment, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import toast from 'react-hot-toast';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import SaveDataButton from '@/shared/components/save-data-button';
import EmptyBox from '@/shared/components/empty-box';
import { getGroupedData } from '../../services/overview/get-grouped-data';
import ModelAccordion from './model-accordion';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import { useUpdateChartDataMutation } from '../../hooks/tanstack/use-update-chart-data-mutation';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const { isLoading, chartData, modelNumbers, addNewModel, hasChanges, syncChartData } = useChartSetting();
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const { mutateAsync } = useUpdateChartDataMutation();

  const handleSelectModel = useCallback((modelNum: number | null) => {
    setSelectedModel(modelNum);
  }, []);

  /**
   *  모델 번호로 그룹핑된 데이터
   */
  const groupedByModelNum = useMemo(() => {
    return getGroupedData(chartData, 'modelNum', modelNumbers);
  }, [chartData]);

  const handleSaveBtnClick = useCallback(() => {
    toast.promise(
      mutateAsync({ serviceID: currentService?.serviceID ?? '', chartData: chartData }).then(() => {
        syncChartData();
      }),
      {
        loading: <Typography variant="body2">차트 정보를 업데이트하는 중입니다...</Typography>,
        success: <Typography variant="body2">차트정보 업데이트 완료!</Typography>,
        error: <Typography variant="body2">차트정보 업데이트 중 문제가 발생했습니다</Typography>,
      }
    );
  }, [chartData]);

  return (
    <ContentWrapper>
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <ContentWrapper.Header bottomDivider>
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
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            <Fragment>
              {chartData.length ? (
                <Fragment>
                  {hasChanges && <SaveDataButton handleBtnClick={handleSaveBtnClick} />}
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
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default ChartSettingBox;
