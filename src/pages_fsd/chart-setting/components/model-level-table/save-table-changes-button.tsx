import { Button, Typography } from '@mui/material';
import { memo } from 'react';

type SaveTableChangesButtonProps = {
  handleSaveTableChanges: () => void;
};
export const SaveTableChangesButton = memo(
  ({ handleSaveTableChanges }: SaveTableChangesButtonProps) => {
    return (
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={handleSaveTableChanges}
        sx={{ color: 'white' }}
      >
        <Typography variant="body1" fontSize={12}>
          완료
        </Typography>
      </Button>
    );
  }
);
SaveTableChangesButton.displayName = 'SaveTableChangesButton';
