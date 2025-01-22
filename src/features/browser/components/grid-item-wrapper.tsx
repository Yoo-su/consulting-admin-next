import { Grid, styled } from '@mui/material';
import { memo, ReactNode, useMemo } from 'react';

type GridItemWrapperProps = {
  isBasic: boolean;
  children: ReactNode;
};
export const GridItemWrapper = memo(
  ({ isBasic, children }: GridItemWrapperProps) => {
    const xsGridItemSize = useMemo(() => {
      if (isBasic) return 2;
      else return 3;
    }, [isBasic]);
    const smGridItemSize = useMemo(() => {
      if (isBasic) return 1.5;
      else return 3;
    }, [isBasic]);

    return (
      <GridItem item xs={xsGridItemSize} sm={smGridItemSize}>
        {children}
      </GridItem>
    );
  }
);
GridItemWrapper.displayName = 'GridItemWrapper';

const GridItem = styled(Grid)({
  flexBasis: '100%',
  minWidth: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});
