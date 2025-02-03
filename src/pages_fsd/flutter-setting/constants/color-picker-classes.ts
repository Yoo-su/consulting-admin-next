import { PopoverOrigin } from '@mui/material';

export const PopoverTransformOriginClass: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

export const PopoverAnchorOriginClass: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

export const SquareRoundedIconClass = (color: string) => ({
  marginLeft: '-4px',
  paddingRight: '.5rem',
  paddingTop: '1px',
  '&:hover': {
    cursor: 'pointer',
  },
  color: color,
});
