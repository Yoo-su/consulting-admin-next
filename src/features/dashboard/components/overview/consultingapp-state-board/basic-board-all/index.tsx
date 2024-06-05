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
import { useUpdateConsultingAppStateMutation } from '@/features/dashboard/hooks/tanstack/use-update-consultingapp-state-mutation';
import toast from 'react-hot-toast';

const BasicBoardAll = () => {
  const { mutateAsync: updateConsultingAppStateMutation } = useUpdateConsultingAppStateMutation();
  const { consultingAppStatesAll, executeConsultingAppState } = useConsultingAppState();
  const [groupedByCurrentStateAll, setGroupedByCurrentStateAll] = useState<Record<CurrentState, ConsultingAppState[]>>(
    getGroupedData(consultingAppStatesAll, 'currentState', currentStateList)
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = groupedByCurrentStateAll[source.droppableId as CurrentState];
      const destinationList = groupedByCurrentStateAll[destination.droppableId as CurrentState];
      const prevStateBackup = { ...groupedByCurrentStateAll };

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

      setGroupedByCurrentStateAll((prevState) => ({
        ...prevState,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));

      updateConsultingAppStateMutation(updateParams).then((res) => {
        if (res.status === 200) {
          toast.success('상태가 성공적으로 업데이트 되었습니다');
          executeConsultingAppState();
        } else {
          toast.error('상태 업데이트 중 문제가 발생했습니다');
          setGroupedByCurrentStateAll(prevStateBackup);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [consultingAppStatesAll]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Grid container spacing={2}>
          {Object.values(stateBoardDomainItems).map((item) => (
            <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
              <StateCol
                currentStateKey={item.key}
                groupedStates={groupedByCurrentStateAll[item.key] ?? []}
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

export default BasicBoardAll;
