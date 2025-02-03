import { Button, Typography } from '@mui/material';
import { memo } from 'react';

type DeleteLevelButtonProps = {
  handleDeleteLevel: () => void;
};
export const DeleteLevelButton = memo(({ handleDeleteLevel }: DeleteLevelButtonProps) => {
  return (
    <Button size="small" variant="outlined" color="error">
      <Typography variant="body1" fontSize={12} onClick={handleDeleteLevel}>
        단계삭제
      </Typography>
    </Button>
  );
});
DeleteLevelButton.displayName = 'DeleteLevelButton';
