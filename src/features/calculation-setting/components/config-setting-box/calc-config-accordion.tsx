import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import { CalcConfig } from '../../models';

type CalcConfigAccordionProps = {
  calcConfig: CalcConfig;
};
const CalcConfigAccordion = ({ calcConfig }: CalcConfigAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>
          Config ID_{calcConfig.CalcConfigID}
        </Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default CalcConfigAccordion;
