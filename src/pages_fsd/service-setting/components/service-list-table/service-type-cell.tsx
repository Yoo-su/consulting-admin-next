import { ServiceTypeChip } from '@/shared/constants';
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
