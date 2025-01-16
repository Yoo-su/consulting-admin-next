import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, SxProps, Theme, Tooltip } from '@mui/material';
import { MouseEvent } from 'react';

import { ButtonIcon } from '@/shared/components';

import { ArrowButtonClass } from '../../constants';

type ArrowIconButtonProps = {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  classes?: SxProps<Theme>;
  isUp: boolean;
  title: string;
  id: string;
};

export const ArrowIconButton = ({
  handleClick,
  classes = {},
  isUp,
  title,
  id,
}: ArrowIconButtonProps) => {
  return (
    <Tooltip title={title} placement="top">
      <Box>
        <ButtonIcon
          onClick={handleClick}
          id={id}
          sx={{ ...ArrowButtonClass, ...classes }}
          Icon={isUp ? ArrowDropUpIcon : ArrowDropDownIcon}
        />
      </Box>
    </Tooltip>
  );
};
