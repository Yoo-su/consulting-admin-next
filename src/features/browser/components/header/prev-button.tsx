import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@mui/material';
import { memo } from 'react';

import { ButtonIcon } from '@/shared/components';

type PrevButtonProps = {
  handleMoveToPrev: () => void;
};
export const PrevButton = memo(({ handleMoveToPrev }: PrevButtonProps) => {
  return (
    <Tooltip title={'이전으로'} followCursor>
      <ButtonIcon Icon={ArrowBackIcon} onClick={handleMoveToPrev} />
    </Tooltip>
  );
});
PrevButton.displayName = 'PrevButton';
