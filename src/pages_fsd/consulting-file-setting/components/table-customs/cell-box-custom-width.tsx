import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ComponentPropsWithoutRef, CSSProperties, PropsWithChildren } from 'react';

import { CellBoxCustomWidthStyle, SIZE_MAPPINGS } from '../../constants';

type CellBoxCustomWidthProps = PropsWithChildren & {
  size?: 'xs' | 's' | 'm' | 'l';
  typo?: boolean;
  justifyContent?: CSSProperties['justifyContent'];
} & ComponentPropsWithoutRef<'div'>;

export const CellBoxCustomWidth = ({
  children = null,
  size = 'l',
  typo = false,
  justifyContent = 'flex-start',
  ...rest
}: CellBoxCustomWidthProps) => {
  const width = SIZE_MAPPINGS[size];
  return (
    <Box sx={{ ...CellBoxCustomWidthStyle, width, justifyContent }} {...rest}>
      {typo ? <Typography>{children}</Typography> : <>{children}</>}
    </Box>
  );
};
