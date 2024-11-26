'use client';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import AllBoardContainer from './all-board-container';
import ServiceTypeSelect from './selects/service-type-select';
import ServiceYearSelect from './selects/service-year-select';

const ConsultingAppStateBoard = () => {
  return (
    <Box>
      <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        expanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="consultingapp-states-content"
          id="consultingapp-states-content"
        >
          <Stack direction="row" spacing={2} alignItems={'baseline'}>
            <Typography variant="h4">입학상담앱 담당자 및 현황</Typography>
            <Typography variant="h6">
              <ServiceYearSelect />
              &nbsp;학년도 &nbsp;
              <ServiceTypeSelect />
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <AllBoardContainer />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ConsultingAppStateBoard;
