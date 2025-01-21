import DeleteIcon from '@mui/icons-material/Delete';
import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

type DeleteDataButtonProps = {
  rowNumber: number;
  handleDeleteData: (rowNumber: number) => void;
};
export const DeleteDataButton = memo(
  ({ rowNumber, handleDeleteData }: DeleteDataButtonProps) => {
    return (
      <Chip
        icon={<DeleteIcon />}
        label={<Typography variant="body2">데이터 삭제</Typography>}
        size="small"
        clickable
        onClick={() => handleDeleteData(rowNumber)}
      />
    );
  }
);
DeleteDataButton.displayName = 'DeleteDataButton';
