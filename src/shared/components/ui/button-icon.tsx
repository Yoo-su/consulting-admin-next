import { SvgIconProps } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { ButtonHTMLAttributes, ComponentType, memo } from 'react';

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
