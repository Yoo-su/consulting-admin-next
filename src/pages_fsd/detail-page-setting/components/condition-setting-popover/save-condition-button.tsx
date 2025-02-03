import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Chip, styled, Typography } from '@mui/material';
import { memo } from 'react';

type SaveConditionButtonProps = {
  handleClickSave: () => void;
  isConditionChanged: boolean;
};
export const SaveConditionButton = memo(({ handleClickSave, isConditionChanged }: SaveConditionButtonProps) => {
  return (
    <WrapperChip
      clickable
      onClick={handleClickSave}
      disabled={!isConditionChanged}
      icon={<ExitToAppIcon color="inherit" />}
      label={
        <Typography variant="button" fontWeight="bold">
          {isConditionChanged ? '변경사항 반영' : '변경사항 없음'}
        </Typography>
      }
      color={isConditionChanged ? 'info' : 'default'}
    />
  );
});
SaveConditionButton.displayName = 'SaveConditionButton';

const WrapperChip = styled(Chip)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  backgroundColor: '#4863A0',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#4863A0',
  },
  transition: 'all 0.2s ease',
}));
