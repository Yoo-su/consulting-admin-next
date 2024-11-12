import { ComponentType, memo, ButtonHTMLAttributes } from 'react';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material';

type ButtonIconProps = IconButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    Icon: ComponentType<SvgIconProps>;
  };
const ButtonIcon = ({ Icon, ...props }: ButtonIconProps) => {
  return (
    <IconButton {...props} size="small" aria-label="add">
      <Icon fontSize="small" />
    </IconButton>
  );
};

export default memo(ButtonIcon);
