import { ReactNode } from 'react';

import { EmptyBox } from '@/shared/components';

import { ERROR_MESSAGE } from '../../constants';
import { useFilteredBoardData } from '../../hooks';
import { useBoardStore } from '../../models';
import { BoardSkeleton } from './skeleton';

type BoardBoundaryProps = {
  children: ReactNode;
};
export const BoardBoundary = ({ children }: BoardBoundaryProps) => {
  const boardType = useBoardStore((state) => state.boardType);

  const { isLoading, filteredServiceDetail, filteredServiceDetailAll } = useFilteredBoardData();

  if (isLoading) return <BoardSkeleton />;
  if (boardType === 'mainUser' && filteredServiceDetail?.length === 0) return <EmptyBox text={ERROR_MESSAGE.NO_DATA} />;
  if (boardType === 'all' && filteredServiceDetailAll?.length === 0) return <EmptyBox text={ERROR_MESSAGE.NO_DATA} />;
  return children;
};
