import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Fade from '@mui/material/Fade';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useCallback, useMemo, useState } from 'react';
import { useChartSetting } from '@/features/dashboard/hooks/context/use-chart-setting';
import ModelLevelTable from '../model-level-table';
import ModelChartBox from '../model-chart-box';
import { useConfirmToast } from '@/shared/hooks/use-confirm-toast';
import { getGroupedData } from '../../overview/consultingapp-state-board/services/get-grouped-data';
import { ChartData } from '@/features/dashboard/types/chart-data.type';

type ModelAccordionProps = {
  selectedModel: number | null;
  setSelectedModel: (modelNum: number) => void;
  modelNum: number;
  modelChartData: ChartData[];
};
const ModelAccordion = ({ selectedModel, setSelectedModel, modelNum, modelChartData }: ModelAccordionProps) => {
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

  return (
    <Accordion
      key={`model-${modelNum}`}
      expanded={selectedModel === modelNum}
      slots={{ transition: Fade as AccordionSlots['transition'] }}
      slotProps={{ transition: { timeout: 400 } }}
      sx={{
        '& .MuiAccordion-region': { height: selectedModel === modelNum ? 'auto' : 0 },
        '& .MuiAccordionDetails-root': { display: selectedModel === modelNum ? 'block' : 'none' },
      }}
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
            setSelectedModel(modelNum);
          }}
        >{`모델 ${modelNum + 1}`}</Typography>

        {selectedModel === modelNum && (
          <Stack direction={'row'} sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Chip
              icon={<DeleteIcon />}
              label={<Typography variant="body2">모델삭제</Typography>}
              size="small"
              clickable
              onClick={() =>
                openConfirmToast(`${modelNum + 1}번 모델을 삭제하시겠습니까?`, () => {
                  deleteModel(modelNum);
                })
              }
            />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <ModelChartBox selectedModel={modelNum} modelLevels={modelLevels} modelChartData={modelChartData} />

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

export default ModelAccordion;
