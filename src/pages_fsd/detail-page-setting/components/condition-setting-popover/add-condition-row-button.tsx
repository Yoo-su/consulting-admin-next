import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, styled, Typography } from '@mui/material';
import { memo } from 'react';

type AddConditionRowButtonProps = {
  handleClickAddRow: () => void;
};
export const AddConditionRowButton = memo(({ handleClickAddRow }: AddConditionRowButtonProps) => {
  return (
    <AddRowChip
      clickable
      onClick={handleClickAddRow}
      icon={<AddCircleIcon color="inherit" />}
      label={
        <Typography variant="button" fontWeight="bold">
          행추가
        </Typography>
      }
    />
  );
});
AddConditionRowButton.displayName = 'AddConditionRowButton';

const AddRowChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#597D35',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#597D35',
  },
}));
