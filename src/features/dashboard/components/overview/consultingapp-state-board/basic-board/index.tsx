'use client';

import { DragEvent } from 'react';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';

import StateCol from '../state-col';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { useUpdateConsultingAppStateMutation } from '@/features/dashboard/hooks/tanstack/use-update-consultingapp-state-mutation';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

const BasicBoard = () => {
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const { isPending, mutateAsync } = useUpdateConsultingAppStateMutation();
  const groupedByCurrentStates = getGroupedStatesObject(consultingAppStates, 'currentState');

  const handleDrop = (e: DragEvent<HTMLDivElement>, currentState: CurrentState) => {
    try {
      e.preventDefault();
      const transferedData = e.dataTransfer.getData('text/plain');
      const state: ConsultingAppState = JSON.parse(transferedData);

      if (state.currentState === currentState) return;

      state.currentState = currentState;
      mutateAsync(state)
        .then((res) => {
          const newStates = consultingAppStates.map((item) => {
            if (item.serviceID === state.serviceID) return state;
            return item;
          });
          setConsultingAppStates(newStates);
        })
        .catch((error) => {
          toast.error('상태 업데이트 중 오류가 발생했습니다');
        });
    } catch (error) {
      toast('비정상적인 카드입니다', {
        icon: '🙅🏻‍♂️',
      });
    }
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
