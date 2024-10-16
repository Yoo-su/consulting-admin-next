'use client';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';

import StateCol from './state-col';
import { useConsultingAppState } from '@/features/overview/hooks';
import { STATE_BOARD_DOMAIN_ITEMS, CURRENT_STATES } from '@/features/overview/constants';
import { getGroupedData } from '@/shared/services';
import { ConsultingAppState, CurrentState, ServiceType } from '@/features/overview/models';
import { useUpdateConsultingAppStateMutation } from '@/features/overview/hooks';

const BasicBoard = () => {
  const { mutateAsync: updateConsultingAppStateMutation } = useUpdateConsultingAppStateMutation();
  const { consultingAppStates, executeConsultingAppStateAll } = useConsultingAppState();
  const [groupedByCurrentState, setGroupedByCurrentState] = useState<Record<CurrentState, ConsultingAppState[]>>(
    getGroupedData(consultingAppStates, 'currentState', CURRENT_STATES)
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = groupedByCurrentState[source.droppableId as CurrentState];
      const destinationList = groupedByCurrentState[destination.droppableId as CurrentState];
      const prevStateBackup = { ...groupedByCurrentState };

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

      removed.currentState = destination.droppableId as CurrentState;
      destinationList.splice(destination.index, 0, removed);

      setGroupedByCurrentState((prevState) => ({
        ...prevState,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));

      updateConsultingAppStateMutation(updateParams).then((res) => {
        if (res.status === 200) {
          toast.success(<Typography variant="body2">상태가 성공적으로 업데이트 되었습니다</Typography>);
          executeConsultingAppStateAll();
        } else {
          toast.error(<Typography variant="body2">상태 업데이트 중 문제가 발생했습니다</Typography>);
          setGroupedByCurrentState(prevStateBackup);
        }
      });
    },
    [consultingAppStates]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Grid container spacing={2}>
          {Object.values(STATE_BOARD_DOMAIN_ITEMS).map((item) => (
            <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
              <StateCol
                currentStateKey={item.key}
                groupedStates={groupedByCurrentState[item.key as CurrentState] ?? []}
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
