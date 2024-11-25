import { SvgIconProps } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { ButtonHTMLAttributes, ComponentType, forwardRef, memo } from 'react';

type ButtonIconProps = IconButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    Icon: ComponentType<SvgIconProps>;
  };
const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ Icon, ...props }, ref) => {
    return (
      <IconButton ref={ref} size="small" aria-label="add" {...props}>
        <Icon fontSize="inherit" />
      </IconButton>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';
export default memo(ButtonIcon);
