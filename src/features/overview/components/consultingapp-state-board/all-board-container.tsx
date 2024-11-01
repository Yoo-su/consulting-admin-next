'use client';

import Stack from '@mui/material/Stack';

import Toolbar from './toolbar';
import DeveloperBoard from './boards/developer-board';
import ConsultingAppStateDialog from './consultingapp-state-dialog';
import ConsultingAppStateBoardSkeleton from './skeleton';
import TableBoard from './boards/table-board';
import { useUser } from '@/shared/hooks/context';
import { useStatusBoardStore } from '../../models';
import { useHandleStatusBoard } from '../../hooks';
import BasicBoard from './boards/basic-board';

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
