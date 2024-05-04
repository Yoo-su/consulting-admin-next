'use client';

import Stack from '@mui/material/Stack';

import Toolbar from './toolbar';
import BasicBoard from './basic-board';
import DeveloperBoard from './developer-board';
import ConsultingAppStateBoardSkeleton from './skeleton';
import { useConsultingAppState } from '../../hooks/use-consultingapp-state';

const ConsultingAppStateBoard = () => {
  const { consultingAppStates, isLoading, boardType } = useConsultingAppState();
  if (isLoading) return <ConsultingAppStateBoardSkeleton />;

  return (
    <Stack direction={'column'} spacing={3}>
      <Toolbar />
      {boardType === 'basic' && <BasicBoard consultingAppStates={consultingAppStates} />}
      {boardType === 'developer' && <DeveloperBoard consultingAppStates={consultingAppStates} />}
    </Stack>
  );
};

export default ConsultingAppStateBoard;
