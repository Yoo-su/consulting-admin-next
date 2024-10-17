'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';

import AllBoardContainer from './all-board-container';
import ServiceYearSelect from './selects/service-year-select';
import ServiceTypeSelect from './selects/service-type-select';

const ConsultingAppStateBoard = () => {
  return (
    <Box>
      <Accordion slotProps={{ transition: { unmountOnExit: true } }} expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="consultingapp-states-content"
          id="consultingapp-states-content"
        >
          <Stack direction="row" spacing={2} alignItems={'baseline'}>
            <Typography variant="h5">입학상담앱 담당자 및 현황</Typography>
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
