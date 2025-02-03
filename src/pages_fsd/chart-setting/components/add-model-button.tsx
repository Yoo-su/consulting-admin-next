import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

import { ADD_MODEL_TEXT } from '../constants';

type AddModelButtonProps = {
  handleAddNewModel: () => void;
};
export const AddModelButton = memo(({ handleAddNewModel }: AddModelButtonProps) => {
  return (
    <Chip
      color="info"
      size="small"
      icon={<AddCircleIcon fontSize="inherit" />}
      label={<Typography variant="button">{ADD_MODEL_TEXT}</Typography>}
      clickable
      onClick={handleAddNewModel}
    />
  );
});
AddModelButton.displayName = 'AddModelButton';
