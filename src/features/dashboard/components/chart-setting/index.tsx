'use client';

import { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import toast from 'react-hot-toast';

import ModelLevelTable from './model-level-table';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import ModelChartBox from './model-chart-box';
import AlertBox from './alert-box';
import EmptyBox from '@/shared/components/empty-box';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import { ChartData } from '../../types/chart-data.type';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const {
    isLoading,
    groupedByModelNum,
    modelNumbers,
    getModelLevels,
    addNewModel,
    deleteModel,
    selectedModel,
    setSelectedModel,
    addNewModelLevel,
  } = useChartSetting();

  const handleDeleteModelBtnClick = (modelNum: number) => {
    toast((t) => (
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
        <Typography variant="body2">{modelNum + 1}번 모델을 제거하시겠습니까?</Typography>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={0.2}>
          <Button
            variant="text"
            color="error"
            size="small"
            sx={{ width: 'fit-content' }}
            onClick={() => {
              deleteModel(modelNum);
              toast.dismiss(t.id);
            }}
          >
            예
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="small"
            sx={{ width: 'fit-content' }}
            onClick={() => toast.dismiss(t.id)}
          >
            아니오
          </Button>
        </Stack>
      </Stack>
    ));
  };

  if (isLoading) return <ContentLoadingSkeleton />;

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
        <ModelChartBox selectedModel={selectedModel} modelChartData={groupedByModelNum[selectedModel]} />
      )}

      {modelNumbers.length ? (
        <Box sx={{ mt: 4 }}>
          {modelNumbers.map((mn) => {
            const modelLevels = getModelLevels(mn);
            return (
              <Accordion
                key={`model-${mn}`}
                expanded={selectedModel === mn}
                slotProps={{ transition: { unmountOnExit: true } }}
              >
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
                  >{`모델 ${mn + 1}`}</Typography>

                  <Stack direction={'row'} sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Chip
                      icon={<DeleteIcon />}
                      label={<Typography variant="body2">모델삭제</Typography>}
                      size="small"
                      clickable
                      onClick={() => handleDeleteModelBtnClick(mn)}
                    />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {modelLevels.map((ml) => (
                    <MemoizedModelLevelTable
                      key={`model-${mn}-level-${ml}-table`}
                      groupedByModelNum={groupedByModelNum}
                      modelNum={mn}
                      level={ml}
                    />
                  ))}
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
    </Stack>
  );
};

type MemoizedModelLevelTableProps = {
  groupedByModelNum: Record<number, ChartData[]>;
  modelNum: number;
  level: number;
};
const MemoizedModelLevelTable = memo(({ groupedByModelNum, modelNum, level }: MemoizedModelLevelTableProps) => {
  const filterByLevel = useMemo(
    () => groupedByModelNum[modelNum].filter((item) => item.level === level),
    [groupedByModelNum, modelNum, level]
  );

  return <ModelLevelTable chartData={filterByLevel} modelNum={modelNum} level={Number(level)} />;
});

MemoizedModelLevelTable.displayName = 'MemoizedModelLevelTable';

export default ChartSettingBox;
