import { Button, Typography } from '@mui/material';
import { memo } from 'react';

import { ENTER_EDIT_TEXT } from '../../constants';

type EnterEditModeButtonProps = {
  handleEnterEditMode: () => void;
};
export const EnterEditModeButton = memo(({ handleEnterEditMode }: EnterEditModeButtonProps) => {
  return (
    <Button size="small" variant="outlined" color="primary" onClick={handleEnterEditMode}>
      <Typography variant="body1" fontSize={12}>
        {ENTER_EDIT_TEXT}
      </Typography>
    </Button>
  );
});
EnterEditModeButton.displayName = 'EnterEditModeButton';
