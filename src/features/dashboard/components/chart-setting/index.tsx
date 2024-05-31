'use client';

import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import ModelLevelTable from './model-level-table';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import ModelChartBox from './model-chart-box';
import AlertBox from './alert-box';
import EmptyBox from '@/shared/components/empty-box';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const {
    groupedByModelNum,
    modelNumbers,
    getModelLevels,
    addNewModel,
    deleteModel,
    selectedModel,
    setSelectedModel,
    addNewModelLevel,
  } = useChartSetting();

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
      <Suspense fallback={<ContentLoadingSkeleton />}>
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
        <AlertBox />
        {selectedModel !== null && (
          <ModelChartBox
            selectedModel={selectedModel}
            modelChartData={groupedByModelNum[Number(selectedModel)]}
            modelLevels={getModelLevels(selectedModel)}
          />
        )}

        {modelNumbers.length ? (
          <Box sx={{ mt: 4 }}>
            {modelNumbers.map((mn) => {
              const modelLevels = getModelLevels(Number(mn));
              return (
                <Accordion key={`model-${mn}`} expanded={selectedModel === mn}>
                  <AccordionSummary aria-controls="chart-model-accordion">
                    <Typography
                      variant="h6"
                      sx={{
                        ':hover': {
                          bgcolor: 'rgba(0,0,0,0.04)',
                        },
                        flexGrow: 1,
                        borderRadius: '0.3rem',
                        px: 1,
                      }}
                      onClick={() => {
                        setSelectedModel(mn);
                      }}
                    >{`모델 ${Number(mn) + 1}`}</Typography>

                    <Stack direction={'row'} sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Chip
                        icon={<DeleteIcon />}
                        label={<Typography variant="body2">모델삭제</Typography>}
                        size="small"
                        clickable
                        onClick={() => deleteModel(mn)}
                        /*    sx={{
                          ':hover': { bgcolor: '#BC544B', color: '#fff' },
                        }} */
                      />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {modelLevels.map((ml) => {
                      const filterByLevel = groupedByModelNum[mn].filter((item) => item.level === ml);
                      return (
                        <ModelLevelTable
                          key={`model-${mn}-level-${ml}-table`}
                          chartData={filterByLevel}
                          modelNum={Number(mn)}
                          level={Number(ml)}
                        />
                      );
                    })}
                    <Box
                      sx={{
                        flexGrow: 1,
                        borderRadius: '0.5rem',
                        display: 'flex',
                        py: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        ':hover': {
                          bgcolor: '#E3F2FD',
                        },
                        transition: 'all 0.2s linear',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        addNewModelLevel(mn);
                      }}
                    >
                      <AddCircleIcon sx={{ mr: 1, color: '#0069A0' }} />
                      <Typography variant="body2" sx={{ color: '#0069A0' }}>
                        단계 추가
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ) : (
          <EmptyBox text={'등록된 모델이 없습니다'} />
        )}
      </Suspense>
    </Stack>
  );
};

export default ChartSettingBox;
