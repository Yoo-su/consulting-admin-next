import { Accordion, AccordionSummary, Typography } from '@mui/material';

const CalcConfigAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>점수 환경변수(config) 설정</Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export default CalcConfigAccordion;
