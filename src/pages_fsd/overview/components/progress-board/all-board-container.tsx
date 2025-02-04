'use client';

import Stack from '@mui/material/Stack';

import { useUser } from '@/shared/hooks';

import { useBoardStore } from '../../models';
import { BoardBoundary } from './board-boundary';
import { BasicBoard, DeveloperBoard, TableBoard } from './boards';
import { ServiceDetailDialog } from './service-detail-dialog';
import { Toolbar } from './toolbar';

export const AllBoardContainer = () => {
  const viewOption = useBoardStore((state) => state.viewOption);
  const isDialogOpen = useBoardStore((state) => state.isDialogOpen);
  const { isAdmin } = useUser();

  return (
    <Stack direction={'column'} spacing={3}>
      {isAdmin && <Toolbar />}
      <BoardBoundary>
        {viewOption === 'basic' && <BasicBoard />}
        {viewOption === 'separated' && <DeveloperBoard />}
        {viewOption === 'table' && <TableBoard />}
        {isDialogOpen && <ServiceDetailDialog />}
      </BoardBoundary>
    </Stack>
  );
};
