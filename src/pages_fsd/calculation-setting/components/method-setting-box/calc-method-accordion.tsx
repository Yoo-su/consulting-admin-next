import { Accordion, AccordionSummary, Typography } from '@mui/material';

import { CalcMethod } from '../../models';

type CalcMethodAccordionProps = {
  calcMethod: CalcMethod;
};
const CalcMethodAccordion = ({ calcMethod }: CalcMethodAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>
          Method ID: {calcMethod.CalcMethodID}
        </Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export default CalcMethodAccordion;
