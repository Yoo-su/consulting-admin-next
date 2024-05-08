'use client';

import Stack from '@mui/material/Stack';

import Toolbar from './toolbar';
import BasicBoard from './basic-board';
import DeveloperBoard from './developer-board';
import ConsultingAppStateDialog from './consultingapp-state-dialog';
import ConsultingAppStateBoardSkeleton from './skeleton';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';

const ConsultingAppStateBoard = () => {
  const { isLoading, boardType } = useConsultingAppState();
  if (isLoading) return <ConsultingAppStateBoardSkeleton />;

  return (
    <Stack direction={'column'} spacing={3}>
      <Toolbar />
      {boardType === 'basic' && <BasicBoard />}
      {boardType === 'developer' && <DeveloperBoard />}
      <ConsultingAppStateDialog />
    </Stack>
  );
};

export default ConsultingAppStateBoard;
