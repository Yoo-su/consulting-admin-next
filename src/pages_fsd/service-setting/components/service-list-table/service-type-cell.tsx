import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ServiceTypeCellProps = {
  isSusi: number;
};

export const ServiceTypeCell = ({ isSusi }: ServiceTypeCellProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Chip
      label={ServiceTypeChip.label[isSusi]}
      size={downmd ? 'small' : 'medium'}
      sx={{
        color: ServiceTypeChip.color[isSusi],
        bgcolor: ServiceTypeChip.bgcolor[isSusi],
      }}
    />
  );
};

const ServiceTypeChip = {
  label: ['정시', '수시'],
  bgcolor: ['#1b5db7', '#ffc00d'], // #db5a09, #394056
  color: ['white', '#2c4059'],
};
