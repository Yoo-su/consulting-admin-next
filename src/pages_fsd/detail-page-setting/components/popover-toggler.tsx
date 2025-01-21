import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Chip, Typography } from '@mui/material';
import { memo, MutableRefObject } from 'react';

type PopoverTogglerProps = {
  handleOpen: () => void;
  anchorRef: MutableRefObject<HTMLDivElement | null>;
  open: boolean;
};
export const PopoverToggler = memo(
  ({ open, handleOpen, anchorRef }: PopoverTogglerProps) => {
    return (
      <Chip
        onClick={handleOpen}
        ref={anchorRef}
        clickable
        icon={<TipsAndUpdatesIcon fontSize="medium" color="inherit" />}
        label={<Typography variant="body1">표시조건 설정</Typography>}
        sx={{
          bgcolor: '#2C4059',
          color: open ? '#F5F1B7' : '#FFFDE9',
        }}
      />
    );
  }
);
PopoverToggler.displayName = 'PopoverToggler';
