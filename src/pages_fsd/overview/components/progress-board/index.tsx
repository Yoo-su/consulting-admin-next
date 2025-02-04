'use client';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material';

import { BOARD_BANNER_TITLE } from '../../constants';
import { AllBoardContainer } from './all-board-container';
import { DataFilter } from './data-filter';

export const ProgressBoard = () => {
  return (
    <Box>
      <Accordion slotProps={{ transition: { unmountOnExit: true } }} expanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="progress-boards" id="progress-boards">
          <Stack direction="row" gap={2} alignItems={'baseline'}>
            <Typography variant="h4">{BOARD_BANNER_TITLE}</Typography>
            <DataFilter />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <AllBoardContainer />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
