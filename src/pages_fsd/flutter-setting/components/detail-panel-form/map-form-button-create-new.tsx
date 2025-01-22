import Add from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import { MapCreateNewButtonClass } from '../../constants';
import { UseMapFormReturn } from '../../hooks';

type MapFormCreateNewButtonProps = {
  mapHookValues: UseMapFormReturn;
  isDisabled: boolean;
};

export const MapFormCreateNewButton = ({
  mapHookValues,
  isDisabled,
}: MapFormCreateNewButtonProps) => {
  const { setIsAdd, isAdd } = mapHookValues;
  const handleAdd = () => {
    setIsAdd(true);
  };
  if (isAdd || isDisabled) return null;
  return (
    <Box sx={{ padding: '.2rem 0' }}>
      <Button
        disableElevation
        size="small"
        variant="contained"
        endIcon={<Add />}
        sx={MapCreateNewButtonClass}
        onClick={handleAdd}
      >
        <Typography variant="caption" sx={{ paddingTop: '3px' }}>
          추가
        </Typography>
      </Button>
    </Box>
  );
};
