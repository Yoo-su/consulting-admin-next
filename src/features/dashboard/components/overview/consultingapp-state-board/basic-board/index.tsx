'use client';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedData } from '../services/get-grouped-data';
import { ConsultingAppState, CurrentState } from '@/features/dashboard/types/consultingapp-state.type';
import { currentStateList } from '../constants/current-states-list';
import { useUser } from '@/features/auth/hooks/use-user';
import { BoardType } from '@/features/dashboard/contexts/consultingapp-state-context';

type BasicBoardProps = {
  boardType: BoardType;
};

const BasicBoard = ({ boardType }: BasicBoardProps) => {
  const { user } = useUser();
  console.log('user', user);
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();
  const [groupedByCurrentState, setGroupedByCurrentState] = useState<Record<CurrentState, ConsultingAppState[]>>(
    getGroupedData(consultingAppStates, 'currentState', currentStateList)
  );

  const filteredGroupedState =
    boardType === 'all'
      ? groupedByCurrentState
      : Object.keys(groupedByCurrentState).reduce<Record<CurrentState, ConsultingAppState[]>>((acc, key) => {
          const filteredValue = groupedByCurrentState[key as CurrentState].filter((item) => {
            if (user?.departmentID === 1) return item.manager === user?.userName;
            else if (user?.departmentID === 2) return item.developer === user?.userName;
          });
          return { ...acc, [key]: filteredValue };
        }, {} as Record<CurrentState, ConsultingAppState[]>);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = filteredGroupedState[source.droppableId as CurrentState];
      const destinationList = filteredGroupedState[destination.droppableId as CurrentState];

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
      <Box>
        <Grid container spacing={2}>
          {Object.values(stateBoardDomainItems).map((item) => (
            <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
              <StateCol
                currentStateKey={item.key}
                groupedStates={filteredGroupedState[item.key] ?? []}
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
