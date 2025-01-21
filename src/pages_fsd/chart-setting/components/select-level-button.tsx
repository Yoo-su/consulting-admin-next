import { Chip, Typography } from '@mui/material';
import { memo } from 'react';

type SelectLevelButtonProps = {
  level: number;
  isSelected: boolean;
  handleClick: (level: number) => void;
};
export const SelectLevelButton = memo(
  ({ level, isSelected, handleClick }: SelectLevelButtonProps) => {
    return (
      <Chip
        size="small"
        label={
          <Typography variant="body1" fontSize={14}>
            단계{level}
          </Typography>
        }
        color={isSelected ? 'info' : 'default'}
        onClick={() => handleClick(level)}
      />
    );
  }
);
SelectLevelButton.displayName = 'SelectLevelButton';
