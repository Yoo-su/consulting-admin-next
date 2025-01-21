import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

type AddModelButtonProps = {
  handleAddNewModel: () => void;
};
export const AddModelButton = memo(
  ({ handleAddNewModel }: AddModelButtonProps) => {
    return (
      <Chip
        color="info"
        size="small"
        icon={<AddCircleIcon fontSize="inherit" />}
        label={<Typography variant="button">모델 추가</Typography>}
        clickable
        onClick={handleAddNewModel}
      />
    );
  }
);
AddModelButton.displayName = 'AddModelButton';
