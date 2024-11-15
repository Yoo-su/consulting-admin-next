import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useMemo, useState } from 'react';

import { useConfirmToast } from '@/shared/hooks/ui/use-confirm-toast';
import { getGroupedData } from '@/shared/services';

import { useChartSetting } from '../hooks';
import { ChartData } from '../models';
import ModelChartBox from './model-chart-box';
import ModelLevelTable from './model-level-table';

type ModelAccordionProps = {
  isSelected: boolean;
  setSelectedModel: (modelNum: number | null) => void;
  modelNum: number;
  modelChartData: ChartData[];
};
const ModelAccordion = ({
  isSelected,
  setSelectedModel,
  modelNum,
  modelChartData,
}: ModelAccordionProps) => {
  const { deleteModel, addNewModelLevel } = useChartSetting();
  const { openConfirmToast } = useConfirmToast();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const setIsEditingTrue = useCallback(() => {
    setIsEditing(true);
  }, []);

  const setIsEditingFalse = useCallback(() => {
    setIsEditing(false);
  }, []);

  const modelLevels = useMemo(() => {
    return Array.from(new Set(modelChartData.map((item) => item.level)));
  }, [modelChartData]);

  const levelGroupedChartData = useMemo(() => {
    return getGroupedData(modelChartData, 'level', modelLevels);
  }, [modelChartData]);

  const handlClickTitle = useCallback(() => {
    if (isSelected) setSelectedModel(null);
    else setSelectedModel(modelNum);
  }, [isSelected]);

  return (
    <Accordion expanded={isSelected}>
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
          onClick={handlClickTitle}
        >{`모델 ${modelNum + 1}`}</Typography>

        {isSelected && (
          <Stack
            direction={'row'}
            sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Chip
              icon={<DeleteIcon />}
              label={<Typography variant="body2">모델삭제</Typography>}
              size="small"
              clickable
              onClick={() =>
                openConfirmToast(
                  `${modelNum + 1}번 모델을 삭제하시겠습니까?`,
                  () => {
                    deleteModel(modelNum);
                  }
                )
              }
            />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <ModelChartBox
          modelNum={modelNum}
          modelLevels={modelLevels}
          modelChartData={modelChartData}
        />

        {modelLevels.map((ml) => (
          <ModelLevelTable
            key={`model-${modelNum}-level-${ml}-table`}
            chartData={[...levelGroupedChartData[ml]]}
            modelNum={modelNum}
            level={ml}
            isEditing={isEditing}
            setIsEditingTrue={setIsEditingTrue}
            setIsEditingFalse={setIsEditingFalse}
          />
        ))}
        {!isEditing && (
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
              addNewModelLevel(modelNum);
            }}
          >
            <AddCircleIcon sx={{ mr: 1, color: '#0069A0' }} />
            <Typography variant="body2" sx={{ color: '#0069A0' }}>
              단계 추가
            </Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(ModelAccordion);
