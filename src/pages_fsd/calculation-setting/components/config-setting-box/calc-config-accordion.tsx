import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import { CalcConfig, useCalculationSettingStore } from '../../models';
import { EditableField } from '../editable-field';

type CalcConfigAccordionProps = {
  calcConfig: CalcConfig;
};
export const CalcConfigAccordion = ({
  calcConfig,
}: CalcConfigAccordionProps) => {
  const { dialogType } = useCalculationSettingStore();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant={'h6'}>
          Config ID_{calcConfig.CalcConfigID}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box minHeight={'420px'} display={'flex'} flexDirection={'column'}>
          {Object.keys(calcConfig).map((configKey) => {
            return <EditableField key={configKey} />;
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
