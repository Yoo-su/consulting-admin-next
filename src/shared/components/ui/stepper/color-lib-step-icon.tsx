import { Check } from '@mui/icons-material';
import { StepIconProps } from '@mui/material/StepIcon';

import { ColorlibStepIconRoot } from './styled';

export const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed && <Check />}
      {active && (
        <span
          style={{
            width: '83%',
            height: '83%',
            borderRadius: '50%',
            backgroundColor: '#45b6fe',
            animation: `circle-pulse 2.5s infinite`,
          }}
        ></span>
      )}
    </ColorlibStepIconRoot>
  );
};
