'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Droppable } from 'react-beautiful-dnd';

import StateCard from './state-card';
import { ConsultingAppState, CurrentState } from '@/features/overview/models';

export type StateColProps = {
  groupedStates: ConsultingAppState[];
  currentStateKey: CurrentState;
  title: string;
  color: string;
  bgcolor: string;
  developer?: string;
};
const StateCol = ({ groupedStates, title, color, bgcolor, currentStateKey, developer }: StateColProps) => {
  const droppableId = developer ? developer + '/' + currentStateKey : currentStateKey;

  return (
    <Stack
      direction={'column'}
      spacing={2}
      sx={{
        bgcolor: bgcolor,
        flexGrow: 1,
        p: 1,
        borderRadius: '0.5rem',
        height: 'fit-content',
      }}
    >
      <Stack direction={'row'} alignItems={'center'}>
        <Tooltip title={title} placement="top-start">
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '1rem',
              bgcolor: color,
              px: 1,
              py: 0.5,
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
                marginRight: 1,
              }}
            />
            <Typography
              variant="body2"
              color="black"
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                paddingRight: '.3rem',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Tooltip>

        <Stack direction={'row'} sx={{ maxWidth: '35%', justifyContent: 'flex-end' }}>
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
      </Stack>

      <Droppable droppableId={droppableId} isCombineEnabled>
        {(provided) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            component={'ul'}
            sx={{ listStyle: 'none', p: 0, m: 0, height: '100%', overflowY: 'scroll' }}
            spacing={1}
          >
            {groupedStates.map((consultingState, index) => (
              <StateCard key={`${consultingState.univID}${index}`} state={consultingState} index={index} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default StateCol;
