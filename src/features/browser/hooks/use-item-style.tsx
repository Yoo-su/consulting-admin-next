import { Box, styled, SxProps } from '@mui/material';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore } from '../models';

/**
 * @description
 * Browser에 표시되는 아이템(디렉토리, 파일)은
 * browserOption의 itemAppearance 값에 따라
 * 기본형, 카드형으로 그려진다.
 * 기본형, 카드형 각각의 스타일을 관리하기 위한 hook
 */
export const useItemStyle = () => {
  const itemAppearance = useBrowserStore(
    useShallow((state) => state.browserOption.itemAppearance)
  );

  const isBasic = useMemo(() => {
    return itemAppearance === 'basic';
  }, [itemAppearance]);

  const Wrapper = useMemo(() => {
    return isBasic ? BasicWrapper : CardWrapper;
  }, [isBasic]);
  const InfoArea = useMemo(() => {
    return isBasic ? BasicInfoArea : CardInfoArea;
  }, [isBasic]);

  return { Wrapper, InfoArea, isBasic };
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
