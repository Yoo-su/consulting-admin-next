'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AllBoardContainer from '@/features/dashboard/components/overview/consultingapp-state-board/all-board-container';
import { Stack } from '@mui/material';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';

const ConsultingAppStateBoard = () => {
  const { consultingAppStates } = useConsultingAppState();

  const serviceYear = consultingAppStates[0].serviceYear;
  const serviceType = consultingAppStates[0].serviceType === 'S_A' ? '수시' : '정시';

  return (
    <Box>
      <Accordion slotProps={{ transition: { unmountOnExit: true } }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="consultingapp-states-content"
          id="consultingapp-states-content"
        >
          <Stack direction="row" spacing={2} alignItems={'baseline'}>
            <Typography variant="h5">입학상담앱 담당자 및 현황</Typography>
            <Typography variant="h6">
              {serviceYear}학년 {serviceType}
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
