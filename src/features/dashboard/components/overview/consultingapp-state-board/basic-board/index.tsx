'use client';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedData } from '../services/get-grouped-data';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';
import { currentStateList } from '../constants/current-states-list';

const BasicBoard = () => {
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const [groupedByCurrentState, setGroupedByCurrentState] = useState<Record<CurrentState, ConsultingAppState[]>>(
    getGroupedData(consultingAppStates, 'currentState', currentStateList)
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = groupedByCurrentState[source.droppableId as CurrentState];
      const destinationList = groupedByCurrentState[destination.droppableId as CurrentState];

      // 같은 리스트 내에서 이동한 경우
      if (source.droppableId === destination.droppableId) {
        const [removed] = sourceList.splice(source.index, 1);
        sourceList.splice(destination.index, 0, removed);
      }
      // 다른 리스트 간 이동한 경우
      else {
        const [removed] = sourceList.splice(source.index, 1);
        removed.currentState = destination.droppableId as CurrentState;
        destinationList.splice(destination.index, 0, removed);
      }

      // 상태 업데이트
      setGroupedByCurrentState((prevState) => ({
        ...prevState,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [consultingAppStates]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}>
        <Grid container spacing={2} sx={{ overflow: 'scroll' }}>
          {Object.values(stateBoardDomainItems).map((item) => (
            <Grid item key={item.title} xs={4} md={2} lg={2} xl={2}>
              <StateCol
                currentStateKey={item.key}
                groupedStates={groupedByCurrentState[item.key] ?? []}
                title={item.title}
                color={item.color}
                bgcolor={item.bgcolor}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </DragDropContext>
  );
};

export default BasicBoard;
