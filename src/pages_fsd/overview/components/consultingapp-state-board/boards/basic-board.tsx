'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCallback, useMemo } from 'react';

import {
  CURRENT_STATES,
  ERROR_MESSAGE,
  STATE_BOARD_DOMAIN_ITEMS,
  UPDATE_APP_STATE,
} from '@/pages_fsd/overview/constants';
import {
  useHandleStatusBoard,
  useUpdateConsultingAppStateMutation,
} from '@/pages_fsd/overview/hooks';
import {
  BoardType,
  CurrentState,
  ServiceType,
} from '@/pages_fsd/overview/models';
import { EmptyBox } from '@/shared/components';
import { useTypographyToast } from '@/shared/hooks';
import { getGroupedData } from '@/shared/services';

import { StateCol } from '../state-column';

type BasicBoardContainerProps = {
  boardType: BoardType;
};
export const BasicBoard = ({ boardType }: BasicBoardContainerProps) => {
  const { showError, showSuccess } = useTypographyToast();
  const { mutateAsync: updateConsultingAppStateMutation } =
    useUpdateConsultingAppStateMutation();
  const { filteredConsultingAppStates, filteredConsultingAppStatesAll } =
    useHandleStatusBoard();

  const filteredState = useMemo(
    () =>
      boardType === 'mainUser'
        ? filteredConsultingAppStates ?? []
        : filteredConsultingAppStatesAll ?? [],
    [boardType, filteredConsultingAppStates, filteredConsultingAppStatesAll]
  );

  const groupedStates = useMemo(() => {
    return getGroupedData(filteredState ?? [], 'currentState', CURRENT_STATES);
  }, [filteredState]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceList = groupedStates[source.droppableId as CurrentState];
      const destinationList =
        groupedStates[destination.droppableId as CurrentState];

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

      updateConsultingAppStateMutation(updateParams).then((res) => {
        if (res.status === 200) {
          showSuccess(UPDATE_APP_STATE.UPDATE_SUCCESS);
        } else {
          showError(UPDATE_APP_STATE.UPDATE_ERROR);
        }
      });
    },
    [groupedStates]
  );

  if (!filteredState?.length) return <EmptyBox text={ERROR_MESSAGE.NO_DATA} />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Grid container spacing={1.5}>
          {Object.values(STATE_BOARD_DOMAIN_ITEMS).map((item) => (
            <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
              <StateCol
                currentStateKey={item.key}
                groupedStates={groupedStates[item.key as CurrentState]}
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
