import { Button, Typography } from '@mui/material';
import { memo } from 'react';

type EnterEditModeButtonProps = {
  handleEnterEditMode: () => void;
};
export const EnterEditModeButton = memo(
  ({ handleEnterEditMode }: EnterEditModeButtonProps) => {
    return (
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleEnterEditMode}
      >
        <Typography variant="body1" fontSize={12}>
          편집모드
        </Typography>
      </Button>
    );
  }
);
EnterEditModeButton.displayName = 'EnterEditModeButton';
