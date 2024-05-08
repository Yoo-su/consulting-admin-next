'use client';

import Stack from '@mui/material/Stack';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

const BasicBoard = () => {
  const { consultingAppStates } = useConsultingAppState();
  const groupedByCurrentStates = getGroupedStatesObject(consultingAppStates, 'currentState');

  return (
    <Stack direction={'row'} spacing={2} sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}>
      {Object.values(stateBoardDomainItems).map((item) => (
        <StateCol
          key={item.title}
          currentStateKey={item.key}
          groupedStates={groupedByCurrentStates[item.key] ?? []}
          title={item.title}
          color={item.color}
          bgcolor={item.bgcolor}
        />
      ))}
    </Stack>
  );
};

export default BasicBoard;
