import { Accordion, AccordionSummary, Typography } from '@mui/material';

export const CalcConversionTableAccordion = () => {
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
