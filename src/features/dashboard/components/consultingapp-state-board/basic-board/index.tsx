'use client';

import Stack from '@mui/material/Stack';

import StateCol from '../state-col';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

type BasicBoardProps = {
  consultingAppStates: ConsultingAppState[];
};
const BasicBoard = ({ consultingAppStates }: BasicBoardProps) => {
  const groupedByCurrentStates = getGroupedStatesObject(consultingAppStates, 'currentState');

  return (
    <Stack direction={'row'} spacing={2} sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}>
      {Object.values(stateBoardDomainItems).map((item) => (
        <StateCol
          key={item.title}
          consultingAppStates={groupedByCurrentStates[item.key] ?? []}
          title={item.title}
          color={item.color}
          bgcolor={item.bgcolor}
        />
      ))}
    </Stack>
  );
};

export default BasicBoard;
