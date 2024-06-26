import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { memo } from 'react';

type ArrowUpIconButtonProps = {
  props: any;
};

const ArrowUpIconButton = ({ props }: ArrowUpIconButtonProps) => {
  return (
    <IconButton {...props} size="small" aria-label="add">
      <ArrowDropUpIcon fontSize="small" />
    </IconButton>
  );
};

export default memo(ArrowUpIconButton);
