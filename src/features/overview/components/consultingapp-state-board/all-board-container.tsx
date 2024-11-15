'use client';

import Stack from '@mui/material/Stack';

import { useUser } from '@/shared/hooks/context';

import { useHandleStatusBoard } from '../../hooks';
import { useStatusBoardStore } from '../../models';
import BasicBoard from './boards/basic-board';
import DeveloperBoard from './boards/developer-board';
import TableBoard from './boards/table-board';
import ConsultingAppStateDialog from './consultingapp-state-dialog';
import ConsultingAppStateBoardSkeleton from './skeleton';
import Toolbar from './toolbar';

const AllBoardContainer = () => {
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

export default AllBoardContainer;
