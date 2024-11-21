import { Accordion, AccordionSummary, Typography } from '@mui/material';

const CalcConversionTableAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>
          점수 변환 테이블(conversion-table) 설정
        </Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export default CalcConversionTableAccordion;
