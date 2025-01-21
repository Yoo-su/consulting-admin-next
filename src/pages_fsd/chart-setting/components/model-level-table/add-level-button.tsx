import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, styled, Typography } from '@mui/material';
import { memo } from 'react';

type AddLevelButtonProps = {
  handleAddNewLevel: () => void;
};
export const AddLevelButton = memo(
  ({ handleAddNewLevel }: AddLevelButtonProps) => {
    return (
      <AddLevelBox onClick={handleAddNewLevel}>
        <AddCircleIcon sx={{ mr: 1, color: '#0069A0' }} />
        <Typography variant="body2" sx={{ color: '#0069A0' }}>
          단계 추가
        </Typography>
      </AddLevelBox>
    );
  }
);
AddLevelButton.displayName = 'AddLevelButton';

const AddLevelBox = styled(Box)({
  flexGrow: 1,
  borderRadius: '0.5rem',
  display: 'flex',
  py: 2,
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    bgcolor: '#E3F2FD',
  },
  transition: 'all 0.2s linear',
  cursor: 'pointer',
});
