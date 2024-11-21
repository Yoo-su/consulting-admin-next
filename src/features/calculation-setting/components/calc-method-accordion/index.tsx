import { Accordion, AccordionSummary, Typography } from '@mui/material';

const CalcMethodAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>점수 계산(method) 설정</Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export default CalcMethodAccordion;
