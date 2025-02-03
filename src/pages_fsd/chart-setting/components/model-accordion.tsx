'use client';

import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';
import { memo } from 'react';

import { useModelAccordion } from '../hooks';
import { useChartSettingStore } from '../models';
import { getModelTitle } from '../utils';
import { DeleteModelButton } from './delete-model-button';
import { ModelChartBox } from './model-chart-box';
import { ModelLevelTable } from './model-level-table';
import { AddLevelButton } from './model-level-table/add-level-button';

type ModelAccordionProps = {
  modelNum: number;
};
export const ModelAccordion = memo(({ modelNum }: ModelAccordionProps) => {
  const isEditing = useChartSettingStore((state) => state.isEditing);
  const { isExpanded, modelLevels, modelChartData, handleClickAccordionTitle, handleDeleteModel, handleAddNewLevel } =
    useModelAccordion({
      modelNum,
    });

  return (
    <Accordion expanded={isExpanded}>
      <AccordionSummary aria-controls="chart-model-accordion">
        <ModelAccordionTitle variant="h6" onClick={handleClickAccordionTitle}>
          {getModelTitle(modelNum)}
        </ModelAccordionTitle>

        {isExpanded && (
          <Stack direction={'row'} sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <DeleteModelButton handleDeleteModel={handleDeleteModel} />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <ModelChartBox modelNum={modelNum} modelLevels={modelLevels} modelChartData={modelChartData} />

        {modelLevels.map((ml) => (
          <ModelLevelTable key={`model-${modelNum}-level-${ml}-table`} modelNum={modelNum} levelNum={ml} />
        ))}
        {!isEditing && <AddLevelButton handleAddNewLevel={handleAddNewLevel} />}
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
