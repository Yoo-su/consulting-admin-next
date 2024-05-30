'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ModelLevelTable from './model-level-table';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import ModelChartBox from './model-chart-box';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const { chartData, groupedByModelNum, modelNumbers, getModelLevels, addNewModel } = useChartSetting();
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  return (
    <Stack
      direction={'column'}
      sx={{
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
      {selectedModel !== null && (
        <ModelChartBox
          selectedModel={Number(selectedModel)}
          modelChartData={groupedByModelNum[Number(selectedModel)]}
          modelLevels={getModelLevels(Number(selectedModel))}
        />
      )}

      <Box sx={{ mt: 4 }}>
        {modelNumbers.map((mn) => {
          const modelLevels = getModelLevels(Number(mn));
          return (
            <Accordion
              key={`model-${mn}`}
              expanded={selectedModel === mn}
              onClick={() => {
                setSelectedModel(mn);
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="chart-model-accordion">
                <Typography variant="h6">{`단계 ${Number(mn) + 1}`}</Typography>
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
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ChartSettingBox;
