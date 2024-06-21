import { keyframes } from '@mui/system';

export const BorderPulseAnimation = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0px ${color};
  }
  100% {
    box-shadow: 0 0 0 2.5px rgba(0, 0, 0, 0);
  }
`;

export const CirclePulseAnimation = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0px ${color};
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
`;
