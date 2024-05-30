'use client';

import { memo } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Draggable } from 'react-beautiful-dnd';

import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';

export type StateCardProps = {
  state: ConsultingAppState;
  index: number;
  developer?: string;
};
const StateCard = ({ state, index, developer }: StateCardProps) => {
  const { univList } = useUnivService();
  const { openDialog, setDialogContentState } = useConsultingAppState();

  const serviceInfo = state.serviceYear + (state.serviceType === 'S_A' ? '수시' : '정시');
  const univName = univList.filter((univ) => univ.univID == state.univID)[0].univName;
  const serviceID = state.serviceID ? state.serviceID : `${state.univID}-미정`;
  console.log('state', state);

  const handleClick = () => {
    setDialogContentState({ ...state, univName, serviceID });
    openDialog('modify');
  };

  return (
    <Draggable draggableId={developer ? developer + '/' + serviceID : serviceID} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          sx={{
            p: 1,
            cursor: 'pointer',
            bgcolor: '#fff',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            '&:hover': {
              transform: 'translateY(-3px)',
              bgcolor: 'rgba(0,0,0,0.1)',
            },
            transition: 'all 0.1s ease-in-out',
          }}
        >
          <Stack direction={'column'} spacing={1}>
            <Stack direction={'column'}>
              <Typography variant="caption">{serviceInfo}</Typography>
              <Typography variant="body2">{univName}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', padding: 0.5, width: 'fit-content' }}>
                <Typography variant="caption">{state.developerName}</Typography>
              </Box>
              <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', padding: 0.5, width: 'fit-content' }}>
                <Typography variant="caption">{state.managerName || '김미정'}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default memo(StateCard);
