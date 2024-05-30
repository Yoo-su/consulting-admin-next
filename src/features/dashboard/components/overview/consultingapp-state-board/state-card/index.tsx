'use client';

import { memo } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Draggable } from 'react-beautiful-dnd';

import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';

export type StateCardProps = {
  state: ConsultingAppState;
  index: number;
  developer?: string;
};
const StateCard = ({ state, index, developer }: StateCardProps) => {
  const { openDialog, setDialogContentState } = useConsultingAppState();
  const cardTitle = state.serviceYear + (state.serviceType === 'susi' ? '수시' : '정시') + ' ' + state.univName;

  const handleClick = () => {
    setDialogContentState(state);
    openDialog('modify');
  };

  return (
    <Draggable draggableId={developer ? developer + '/' + state.serviceID : state.serviceID} index={index}>
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
          <Stack direction={'column'} spacing={1.5}>
            <Typography variant="body2">{cardTitle}</Typography>
            <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', px: 1, py: 0.5, width: 'fit-content' }}>
              <Typography variant="caption">{state.developer}</Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default memo(StateCard);
