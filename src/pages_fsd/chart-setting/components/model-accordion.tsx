'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { useModelAccordion } from '../hooks';
import { useChartSettingStore } from '../models';
import { ModelChartBox } from './model-chart-box';
import { ModelLevelTable } from './model-level-table';

type ModelAccordionProps = {
  modelNum: number;
};
export const ModelAccordion = memo(({ modelNum }: ModelAccordionProps) => {
  const isEditing = useChartSettingStore((state) => state.isEditing);
  const {
    isExpanded,
    modelLevels,
    modelChartData,
    handleClickTitle,
    handleClickDelete,
    addNewModelLevel,
  } = useModelAccordion({
    modelNum,
  });

  return (
    <Accordion expanded={isExpanded}>
      <AccordionSummary aria-controls="chart-model-accordion">
        <ModelAccordionTitle variant="h6" onClick={handleClickTitle}>{`모델 ${
          modelNum + 1
        }`}</ModelAccordionTitle>

        {isExpanded && (
          <Stack
            direction={'row'}
            sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Chip
              icon={<DeleteIcon />}
              label={<Typography variant="body2">모델삭제</Typography>}
              size="small"
              clickable
              onClick={handleClickDelete}
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
            modelNum={modelNum}
            levelNum={ml}
          />
        ))}
        {!isEditing && (
          <AddLevelBox
            onClick={() => {
              addNewModelLevel();
            }}
          >
            <AddCircleIcon sx={{ mr: 1, color: '#0069A0' }} />
            <Typography variant="body2" sx={{ color: '#0069A0' }}>
              단계 추가
            </Typography>
          </AddLevelBox>
        )}
      </AccordionDetails>
    </Accordion>
  );
});
ModelAccordion.displayName = 'ModelAccordion';

const ModelAccordionTitle = styled(Typography)({
  ':hover': {
    bgcolor: 'rgba(0,0,0,0.04)',
  },
  flexGrow: 1,
  borderRadius: '0.3rem',
  px: 1,
});

const AddLevelBox = styled(Box)({
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
});
