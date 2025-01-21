import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

type AddNewDataButtonProps = {
  handleClick: () => void;
};
export const AddNewDataButton = memo(
  ({ handleClick }: AddNewDataButtonProps) => {
    return (
      <Chip
        color="info"
        size="small"
        icon={<AddCircleIcon fontSize="inherit" />}
        label={<Typography variant="body2">상세페이지 데이터 추가</Typography>}
        clickable
        onClick={handleClick}
      />
    );
  }
);
AddNewDataButton.displayName = 'AddNewDataButton';
