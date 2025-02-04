'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCallback, useMemo } from 'react';

import { PROGRESS_STATE_ITEMS, PROGRESS_STATES, UPDATE_APP_STATE } from '@/pages_fsd/overview/constants';
import { useFilteredBoardData, useUpdateServiceDetailMutation } from '@/pages_fsd/overview/hooks';
import { ProgressState, ServiceType, useBoardStore } from '@/pages_fsd/overview/models';
import { useTypographyToast } from '@/shared/hooks';
import { getGroupedData } from '@/shared/services';

import { CardListColumn } from '../card-list-column';

export const BasicBoard = () => {
  const boardType = useBoardStore((state) => state.boardType);
  const { showError, showSuccess } = useTypographyToast();
  const { mutateAsync: updateServiceDetailMutation } = useUpdateServiceDetailMutation();
  const { filteredServiceDetail, filteredServiceDetailAll } = useFilteredBoardData();

  const filteredState = useMemo(
    () => (boardType === 'mainUser' ? filteredServiceDetail ?? [] : filteredServiceDetailAll ?? []),
    [boardType, filteredServiceDetail, filteredServiceDetailAll]
  );

  const groupedStates = useMemo(() => {
    return getGroupedData(filteredState ?? [], 'currentState', PROGRESS_STATES);
  }, [filteredState]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = groupedStates[source.droppableId as ProgressState];
      const destinationList = groupedStates[destination.droppableId as ProgressState];

      // 같은 리스트 내에서 이동한 경우
      if (source.droppableId === destination.droppableId) return;
      // 다른 리스트 간 이동한 경우
      const [removed] = sourceList.splice(source.index, 1);
      const updateParams = {
        serviceYear: Number(removed.serviceYear),
        univID: Number(removed.univID),
        serviceType: removed.serviceType as ServiceType,
        currentState: destination.droppableId as ProgressState,
      };

      removed.currentState = destination.droppableId as ProgressState;
      destinationList.splice(destination.index, 0, removed);

      updateServiceDetailMutation(updateParams).then((res) => {
        if (res.status === 200) {
          showSuccess(UPDATE_APP_STATE.UPDATE_SUCCESS);
        } else {
          showError(UPDATE_APP_STATE.UPDATE_ERROR);
        }
      });
    },
    [groupedStates]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Grid container spacing={1.5}>
          {Object.values(PROGRESS_STATE_ITEMS).map((item) => (
            <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
              <CardListColumn
                progressStateKey={item.key}
                serviceDetails={groupedStates[item.key as ProgressState]}
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
