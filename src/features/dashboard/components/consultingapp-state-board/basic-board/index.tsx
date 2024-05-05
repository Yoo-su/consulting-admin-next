'use client';

import { DragEvent } from 'react';
import Stack from '@mui/material/Stack';

import StateCol from '../state-col';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

const BasicBoard = () => {
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const groupedByCurrentStates = getGroupedStatesObject(consultingAppStates, 'currentState');

  const handleDrop = (e: DragEvent<HTMLDivElement>, currentState: CurrentState) => {
    e.preventDefault();
    const transferedData = e.dataTransfer.getData('text/plain');
    const state: ConsultingAppState = JSON.parse(transferedData);

    if (state.currentState === currentState) return;

    state.currentState = currentState;
    const newStates = consultingAppStates.map((item) => {
      if (item.serviceID === state.serviceID) return state;
      return item;
    });
    setConsultingAppStates(newStates);
  };

  return (
    <Stack direction={'row'} spacing={2} sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}>
      {Object.values(stateBoardDomainItems).map((item) => (
        <StateCol
          key={item.title}
          currentStateKey={item.key}
          consultingAppStates={groupedByCurrentStates[item.key] ?? []}
          title={item.title}
          color={item.color}
          bgcolor={item.bgcolor}
          handleDrop={handleDrop}
        />
      ))}
    </Stack>
  );
};

export default BasicBoard;
