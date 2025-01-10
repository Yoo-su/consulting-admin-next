import { Box, styled, SxProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore } from '../models';

export const useItemStyle = () => {
  const itemAppearance = useBrowserStore(
    useShallow((state) => state.browserOption.itemAppearance)
  );

  const isBasicCard = useMemo(() => {
    return itemAppearance === 'basic';
  }, [itemAppearance]);

  const Wrapper = useMemo(() => {
    return isBasicCard ? BasicWrapper : CardWrapper;
  }, [isBasicCard]);
  const InfoArea = useMemo(() => {
    return isBasicCard ? BasicInfoArea : CardInfoArea;
  }, [isBasicCard]);

  return { Wrapper, InfoArea, isBasicCard };
};

const commonWrapperStyle: SxProps = {
  display: 'flex',
  width: '80%',
  borderRadius: '0.3rem',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  ':hover': {
    bgcolor: '#EBECEE',
  },
};

const BasicWrapper = styled(Box)({
  ...commonWrapperStyle,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0.3,
  flexDirection: 'column',
});

const CardWrapper = styled(Box)({
  ...commonWrapperStyle,
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
