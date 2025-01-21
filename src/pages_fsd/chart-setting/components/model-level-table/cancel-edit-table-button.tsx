import { Button, Typography } from '@mui/material';
import { memo } from 'react';

type CancelEditTableButtonProps = {
  handleCancelEdit: () => void;
};
export const CancelEditTableButton = memo(
  ({ handleCancelEdit }: CancelEditTableButtonProps) => {
    return (
      <Button
        size="small"
        color="inherit"
        variant="outlined"
        onClick={handleCancelEdit}
      >
        <Typography variant="body1" fontSize={12}>
          취소
        </Typography>
      </Button>
    );
  }
);
CancelEditTableButton.displayName = 'CancelEditTableButton';
