'use client';

import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';

import StateCol from '../state-column';
import EmptyBox from '@/shared/components/ui/empty-box';
import { STATE_BOARD_DOMAIN_ITEMS, CURRENT_STATES } from '@/features/overview/constants';
import { getGroupedData } from '@/shared/services';
import { BoardType, CurrentState, ServiceType } from '@/features/overview/models';
import { useUpdateConsultingAppStateMutation } from '@/features/overview/hooks';
import { useHandleStatusBoard } from '@/features/overview/hooks';

type BasicBoardContainerProps = {
  boardType: BoardType;
};

const BasicBoard = ({ boardType }: BasicBoardContainerProps) => {
  const { mutateAsync: updateConsultingAppStateMutation } = useUpdateConsultingAppStateMutation();
  const { filteredConsultingAppStates, filteredConsultingAppStatesAll } = useHandleStatusBoard();

  const filteredState = useMemo(
    () => (boardType === 'mainUser' ? filteredConsultingAppStates ?? [] : filteredConsultingAppStatesAll ?? []),
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
      const destinationList = groupedStates[destination.droppableId as CurrentState];

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
          toast.success(<Typography variant="body2">상태가 성공적으로 업데이트 되었습니다</Typography>);
        } else {
          toast.error(<Typography variant="body2">상태 업데이트 중 문제가 발생했습니다</Typography>);
        }
      });
    },
    [groupedStates]
  );

  if (!filteredState?.length) return <EmptyBox text={'데이터가 없습니다'} />;

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

export default BasicBoard;
