'use client';

import { Droppable } from '@hello-pangea/dnd';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { ProgressState, ServiceDetail } from '@/pages_fsd/overview/models';

import { StateCard } from './state-card';

type CardListColumnProps = {
  serviceDetails: ServiceDetail[];
  progressStateKey: ProgressState;
  title: string;
  color: string;
  bgcolor: string;
  developer?: string;
};
export const CardListColumn = ({
  serviceDetails,
  title,
  color,
  bgcolor,
  progressStateKey,
  developer,
}: CardListColumnProps) => {
  const droppableId = developer ? developer + '/' + progressStateKey : progressStateKey;

  return (
    <Wrapper spacing={2} bgcolor={bgcolor}>
      <Stack direction={'row'} alignItems={'center'} overflow={'hidden'}>
        <Tooltip title={title} placement="top-start">
          <StateTitleBox bgcolor={color}>
            <Dot bgcolor={color} />
            <StateTitle variant="body2">{title}</StateTitle>
          </StateTitleBox>
        </Tooltip>

        <Stack direction={'row'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <DataCnt variant="body1" color={color}>
            {serviceDetails.length}
          </DataCnt>
        </Stack>
      </Stack>

      <Droppable droppableId={droppableId} isCombineEnabled>
        {(provided) => (
          <CardList ref={provided.innerRef} {...provided.droppableProps} spacing={1}>
            {serviceDetails.map((consultingState, index) => (
              <StateCard key={`${consultingState.univID}${index}`} serviceDetail={consultingState} index={index} />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled(Stack)({
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0.5rem',
  borderRadius: '0.5rem',
  height: 'fit-content',
});

const StateTitleBox = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  borderRadius: '1rem',
  padding: '0.2rem 0.4rem',
});

const Dot = styled(Box)({
  width: '10px',
  height: '10px',
  filter: 'saturate(125%) contrast(125%)',
  borderRadius: '50%',
  marginRight: '0.5rem',
});

const StateTitle = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingRight: '.3rem',
  color: '#000',
});

const DataCnt = styled(Typography)({
  filter: 'saturate(150%) contrast(50%)',
  fontSize: '15px',
  marginLeft: '0.5rem',
});

const CardList = styled(Stack)({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  height: '100%',
  overflowY: 'scroll',
});
