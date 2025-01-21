import DeleteIcon from '@mui/icons-material/Delete';
import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

type DeleteModeButtonProps = {
  handleDeleteModel: () => void;
};
export const DeleteModelButton = memo(
  ({ handleDeleteModel }: DeleteModeButtonProps) => {
    return (
      <Chip
        icon={<DeleteIcon />}
        label={<Typography variant="body2">모델삭제</Typography>}
        size="small"
        clickable
        onClick={handleDeleteModel}
      />
    );
  }
);
DeleteModelButton.displayName = 'DeleteModelButton';
