'use client';

import Stack from '@mui/material/Stack';

import { useUser } from '@/shared/hooks';

import { useHandleStatusBoard } from '../../hooks';
import { useStatusBoardStore } from '../../models';
import { BasicBoard, DeveloperBoard, TableBoard } from './boards';
import { ConsultingAppStateDialog } from './consultingapp-state-dialog';
import { ConsultingAppStateBoardSkeleton } from './skeleton';
import { Toolbar } from './toolbar';

export const AllBoardContainer = () => {
  const { boardType, viewOption, isDialogOpen } = useStatusBoardStore();
  const { isStatesLoading } = useHandleStatusBoard();

  const { isAdmin } = useUser();

  if (isStatesLoading) return <ConsultingAppStateBoardSkeleton />;

  return (
    <Stack direction={'column'} spacing={3}>
      {isAdmin && <Toolbar boardType={boardType} />}
      {viewOption === 'basic' && <BasicBoard boardType={boardType} />}
      {viewOption === 'separated' && <DeveloperBoard />}
      {viewOption === 'table' && <TableBoard />}
      {isDialogOpen && <ConsultingAppStateDialog />}
    </Stack>
  );
};
