import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import { memo } from 'react';

type DeleteLevelRowButtonProps = {
  label: string;
  handleDeleteLevelRow: (deleteRowLabel: string) => void;
};
export const DeleteLevelRowButton = memo(({ label, handleDeleteLevelRow }: DeleteLevelRowButtonProps) => {
  return <StyledDeleteIcon fontSize="small" onClick={() => handleDeleteLevelRow(label)} />;
});
DeleteLevelRowButton.displayName = 'DeleteLevelRowButton';
const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: 'rgba(0,0,0,0.6)',
  ':hover': { color: theme.palette.error.main },
}));
