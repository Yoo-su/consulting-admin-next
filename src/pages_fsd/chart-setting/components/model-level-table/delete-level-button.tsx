import { Button, Typography } from '@mui/material';
import { memo } from 'react';

import { DELETE_LEVEL_TEXT } from '../../constants';

type DeleteLevelButtonProps = {
  handleDeleteLevel: () => void;
};
export const DeleteLevelButton = memo(({ handleDeleteLevel }: DeleteLevelButtonProps) => {
  return (
    <Button size="small" variant="outlined" color="error">
      <Typography variant="body1" fontSize={12} onClick={handleDeleteLevel}>
        {DELETE_LEVEL_TEXT}
      </Typography>
    </Button>
  );
});
DeleteLevelButton.displayName = 'DeleteLevelButton';
