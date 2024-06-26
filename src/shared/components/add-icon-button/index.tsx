import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { memo } from 'react';

type AddIconButtonProps = {
  props: any;
};

const AddIconButton = ({ props }: AddIconButtonProps) => {
  return (
    <IconButton {...props} size="small" aria-label="add">
      <AddIcon fontSize="small" />
    </IconButton>
  );
};

export default memo(AddIconButton);
