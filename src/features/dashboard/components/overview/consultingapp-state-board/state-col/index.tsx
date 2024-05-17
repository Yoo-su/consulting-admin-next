'use client';

import { DragEvent, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

import StateCard from '../state-card';
import { useUpdateConsultingAppStateMutation } from '@/features/dashboard/hooks/tanstack/use-update-consultingapp-state-mutation';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';

export type StateColProps = {
  groupedStates: ConsultingAppState[];
  currentStateKey: CurrentState;
  title: string;
  color: string;
  bgcolor: string;
};
const StateCol = ({ groupedStates, title, color, bgcolor, currentStateKey }: StateColProps) => {
  const { isPending, mutateAsync } = useUpdateConsultingAppStateMutation();
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      const transferedData = e.dataTransfer.getData('text/plain');
      const state: ConsultingAppState = JSON.parse(transferedData);

      if (state.currentState === currentStateKey) return;

      state.currentState = currentStateKey;
      mutateAsync(state)
        .then(() => {
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
    <Stack
      direction={'column'}
      spacing={2}
      sx={{
        bgcolor: bgcolor,
        p: 1,
        borderRadius: '0.5rem',
        flexGrow: 1,
        height: 'fit-content',
        ...(isDragOver && {
          animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }),
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDrop(e);
        setIsDragOver(false);
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box
          sx={{
            display: 'flex',
            width: '75%',
            alignItems: 'center',
            borderRadius: '1rem',
            bgcolor: color,
            px: '10px',
            py: '5px',
          }}
        >
          <Box
            component={'div'}
            sx={{
              width: '10px',
              height: '10px',
              bgcolor: color,
              filter: 'saturate(125%) contrast(125%)',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
          <Typography
            variant="body2"
            color="black"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            filter: 'saturate(150%) contrast(50%)',
            fontSize: '15px',
            color: color,
            marginLeft: 1,
          }}
        >
          {groupedStates.length}
        </Typography>
      </Stack>

      <Stack component={'ul'} sx={{ listStyle: 'none', p: 0, m: 0 }} spacing={1}>
        {groupedStates.map((consultingState) => (
          <StateCard key={consultingState.serviceID} state={consultingState} />
        ))}
      </Stack>
    </Stack>
  );
};

export default StateCol;
