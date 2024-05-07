'use client';

import { DragEvent } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

const DeveloperBoard = () => {
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const groupedByDeveloper = getGroupedStatesObject(consultingAppStates, 'developer');

  const handleDrop = (e: DragEvent<HTMLDivElement>, currentState: CurrentState) => {
    try {
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
    } catch (error) {
      toast('비정상적인 카드입니다', {
        icon: '🙅🏻‍♂️',
      });
    }
  };

  return (
    <Stack direction={'column'} spacing={3}>
      {Object.keys(groupedByDeveloper).map((developer) => {
        const developerStates = groupedByDeveloper[developer];
        const groupedByCurrentStates = getGroupedStatesObject(developerStates, 'currentState');
        return (
          <Stack key={developer} direction={'column'} spacing={1}>
            <Stack direction={'row'} alignItems={'center'}>
              <Chip
                size="small"
                label={developer}
                sx={{ width: 'fit-content', bgcolor: 'rgba(0,0,0,0.75)', color: '#fff' }}
              />
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                {developerStates.length}건
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              spacing={2}
              sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}
            >
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
            <div></div>
            <Divider />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default DeveloperBoard;
