import { Button, Typography } from '@mui/material';
import { memo } from 'react';

import { CANCEL_EDIT_TEXT } from '../../constants';

type CancelEditTableButtonProps = {
  handleCancelEdit: () => void;
};
export const CancelEditTableButton = memo(({ handleCancelEdit }: CancelEditTableButtonProps) => {
  return (
    <Button size="small" color="inherit" variant="outlined" onClick={handleCancelEdit}>
      <Typography variant="body1" fontSize={12}>
        {CANCEL_EDIT_TEXT}
      </Typography>
    </Button>
  );
});
CancelEditTableButton.displayName = 'CancelEditTableButton';
