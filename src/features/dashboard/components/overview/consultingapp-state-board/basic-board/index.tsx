'use client';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedData } from '../services/get-grouped-data';
import { ConsultingAppState, CurrentState, ServiceType } from '@/features/dashboard/types/consultingapp-state.type';
import { currentStateList } from '../constants/current-states-list';
import { BoardType } from '@/features/dashboard/contexts/consultingapp-state-context';

type BasicBoardProps = {
  boardType: BoardType;
};

const BasicBoard = ({ boardType }: BasicBoardProps) => {
  const { consultingAppStates, updateConsultingAppState } = useConsultingAppState();
  const [groupedByCurrentState, setGroupedByCurrentState] = useState<Record<CurrentState, ConsultingAppState[]>>(
    getGroupedData(consultingAppStates, 'currentState', currentStateList)
  );

  const filteredGroupedState = boardType === 'mainUser' ? groupedByCurrentState : groupedByCurrentState;

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = filteredGroupedState[source.droppableId as CurrentState];
      const destinationList = filteredGroupedState[destination.droppableId as CurrentState];

      // 같은 리스트 내에서 이동한 경우
      if (source.droppableId === destination.droppableId) return;
      // 다른 리스트 간 이동한 경우
      const [removed] = sourceList.splice(source.index, 1);
      const updateParams = {
        serviceYear: Number(removed.serviceYear),
        univID: Number(removed.univID),
        serviceType: removed.serviceType as ServiceType,
        currentState: destination.droppableId as CurrentState,
      };
      const isSuccess = updateConsultingAppState(updateParams);
      removed.currentState = destination.droppableId as CurrentState;
      destinationList.splice(destination.index, 0, removed);
      if (isSuccess) {
        // 상태 업데이트
        setGroupedByCurrentState((prevState) => ({
          ...prevState,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destinationList,
        }));
      }
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
