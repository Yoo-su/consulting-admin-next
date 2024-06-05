'use client';

import Stack from '@mui/material/Stack';

import Toolbar from './toolbar';
import DeveloperBoard from './developer-board';
import ConsultingAppStateDialog from './consultingapp-state-dialog';
import ConsultingAppStateBoardSkeleton from './skeleton';
import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import TableBoard from './table-board';
import BasicBoardContainer from './basic-board-container';

const ConsultingAppStateBoard = () => {
  const { isLoading, boardType, viewOption, isDialogOpen } = useConsultingAppState();

  if (isLoading) return <ConsultingAppStateBoardSkeleton />;

  return (
    <Stack direction={'column'} spacing={3}>
      <Toolbar boardType={boardType} />
      {viewOption === 'basic' && <BasicBoardContainer boardType={boardType} />}
      {viewOption === 'separated' && <DeveloperBoard />}
      {viewOption === 'table' && <TableBoard />}
      {isDialogOpen && <ConsultingAppStateDialog />}
    </Stack>
  );
};

export default ConsultingAppStateBoard;
