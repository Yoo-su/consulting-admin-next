import { Box, Grid, styled, SxProps } from '@mui/material';
import { ReactNode, useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore } from '../models';

type GridItemWrapperProps = {
  children: ReactNode;
};

/**
 * @description
 * Browser에 표시되는 아이템(디렉토리, 파일)은
 * browserOption의 itemAppearance 값에 따라
 * 기본형, 카드형으로 그려진다.
 * 기본형, 카드형 각각의 스타일을 관리하기 위한 hook
 */
export const useItemStyle = () => {
  const itemAppearance = useBrowserStore(useShallow((state) => state.browserOption.itemAppearance));
  const isBasic = useMemo(() => itemAppearance === 'basic', [itemAppearance]);
  const BrowserItemWrapper = isBasic ? BasicItemWrapper : CardItemWrapper;
  const BrowserInfoArea = isBasic ? BasicInfoArea : CardInfoArea;

  const GridItemWrapper = useCallback(
    ({ children }: GridItemWrapperProps) => {
      const xsGridItemSize = isBasic ? 2 : 3;
      const smGridItemSize = isBasic ? 1.5 : 3;

      return (
        <GridItem item xs={xsGridItemSize} sm={smGridItemSize}>
          {children}
        </GridItem>
      );
    },
    [isBasic]
  );

  return { GridItemWrapper, BrowserItemWrapper, BrowserInfoArea, isBasic };
};

const GridItem = styled(Grid)({
  flexBasis: '100%',
  minWidth: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});

const commonItemWrapperStyle: SxProps = {
  display: 'flex',
  width: '80%',
  borderRadius: '0.3rem',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  ':hover': {
    bgcolor: '#EBECEE',
  },
};

const BasicItemWrapper = styled(Box)({
  ...commonItemWrapperStyle,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0.3,
  flexDirection: 'column',
});

const CardItemWrapper = styled(Box)({
  ...commonItemWrapperStyle,
  padding: '.3rem',
  flexDirection: 'row',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
});

const BasicInfoArea = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  width: '100%',
  '& .item-name': {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

const CardInfoArea = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  padding: '.3rem',
  width: '100%',
  alignItems: 'flex-end',
  '& .item-name': {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'right',
  },
});
