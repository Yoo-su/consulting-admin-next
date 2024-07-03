import { ComponentType, memo } from 'react';

import IconButton from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material';

type ButtonIconProps = {
  props?: any;
  Icon: ComponentType<SvgIconProps>;
};
const ButtonIcon = ({ props, Icon }: ButtonIconProps) => {
  return (
    <IconButton {...props} size="small" aria-label="add">
      <Icon fontSize="small" />
    </IconButton>
  );
};

export default memo(ButtonIcon);
