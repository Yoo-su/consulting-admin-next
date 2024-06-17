import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { ChartData } from '@/features/dashboard/types/chart-data.type';
import { useMemo } from 'react';
import { useChartSetting } from '@/features/dashboard/hooks/context/use-chart-setting';
import ModelLevelTable from '../model-level-table';
import ModelChartBox from '../model-chart-box';
import { useConfirmToast } from '@/shared/hooks/use-confirm-toast';
import { getGroupedData } from '../../overview/consultingapp-state-board/services/get-grouped-data';

type ModelAccordionProps = {
  modelNum: number;
  modelChartData: ChartData[];
};
const ModelAccordion = ({ modelNum, modelChartData }: ModelAccordionProps) => {
  const { selectedModel, setSelectedModel, deleteModel, addNewModelLevel } = useChartSetting();
  const { openConfirmToast } = useConfirmToast();

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
      /* slotProps={{ transition: { unmountOnExit: true } }} */
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
      </AccordionSummary>
      <AccordionDetails>
        <ModelChartBox selectedModel={modelNum} modelLevels={modelLevels} modelChartData={modelChartData} />

        {modelLevels.map((ml) => (
          <ModelLevelTable
            key={`model-${modelNum}-level-${ml}-table`}
            chartData={[...levelGroupedChartData[ml]]}
            modelNum={modelNum}
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
            addNewModelLevel(modelNum);
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
};

export default ModelAccordion;
