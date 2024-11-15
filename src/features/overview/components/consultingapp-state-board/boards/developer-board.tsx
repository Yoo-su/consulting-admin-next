'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import {
  CURRENT_STATES,
  STATE_BOARD_DOMAIN_ITEMS,
} from '@/features/overview/constants';
import { useUpdateConsultingAppStateMutation } from '@/features/overview/hooks';
import { useHandleStatusBoard } from '@/features/overview/hooks';
import { CurrentState, ServiceType } from '@/features/overview/models';
import { getGroupedData } from '@/shared/services';

import StateCol from '../state-column';

const DeveloperBoard = () => {
  const { filteredConsultingAppStatesAll, developers } = useHandleStatusBoard();

  const { mutateAsync: updateConsultingAppStateMutation } =
    useUpdateConsultingAppStateMutation();

  const developerGroupedStates = useMemo(() => {
    const result = getGroupedData(
      filteredConsultingAppStatesAll ?? [],
      'developer',
      developers
    );
    return result;
  }, [filteredConsultingAppStatesAll]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      toast.error(
        <Typography variant="body2">이동 범위가 아닙니다</Typography>
      );
      return;
    }
    const { source, destination } = result;
    const [sourceDeveloper, sourceAreaState] = source.droppableId.split('/'),
      [destinationDeveloper, destinationAreaState] =
        destination.droppableId.split('/');

    const sourceDevList = developerGroupedStates[sourceDeveloper];
    const destinationDevList = developerGroupedStates[destinationDeveloper];

    const sourceDevStateMap = getGroupedData(
      sourceDevList,
      'currentState',
      CURRENT_STATES
    );
    const destinationDevStateMap = getGroupedData(
      destinationDevList,
      'currentState',
      CURRENT_STATES
    );

    const sourceDevStateList =
      sourceDevStateMap[sourceAreaState as CurrentState];
    const destinationDevStateList =
      destinationDevStateMap[destinationAreaState as CurrentState];

    // 다른 리스트 간 이동한 경우

    const [removed] = sourceDevStateList.splice(source.index, 1);
    const updateParams = {
      serviceYear: Number(removed.serviceYear),
      univID: Number(removed.univID),
      serviceType: removed.serviceType as ServiceType,
      currentState: destination.droppableId.split('/')[1] as CurrentState,
    };
    removed.currentState = destinationAreaState as CurrentState;
    destinationDevStateList.splice(destination.index, 0, removed);

    // 상태 업데이트
    updateConsultingAppStateMutation(updateParams).then((res) => {
      if (res.status === 200) {
        toast.success(
          <Typography variant="body2">
            상태가 성공적으로 업데이트 되었습니다
          </Typography>
        );
      } else {
        toast.error(
          <Typography variant="body2">
            상태 업데이트 중 문제가 발생했습니다
          </Typography>
        );
      }
    });
  };

  return (
    <Stack direction={'column'} spacing={3}>
      {developers.map((developer) => {
        const developerStates = developerGroupedStates[developer];
        const groupedByCurrentStates = getGroupedData(
          developerStates,
          'currentState',
          CURRENT_STATES
        );
        return (
          <Stack key={developer} direction={'column'} spacing={1}>
            <Stack direction={'row'} alignItems={'center'}>
              <Chip
                size="small"
                label={developerStates[0]?.developerName}
                sx={{
                  marginLeft: '3px',
                  width: 'fit-content',
                  bgcolor: 'rgba(0,0,0,0.75)',
                  color: '#fff',
                }}
              />
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                {developerStates.length}건
              </Typography>
            </Stack>

            <DragDropContext onDragEnd={onDragEnd}>
              <Box sx={{ paddingBottom: '1rem' }}>
                <Grid container spacing={1.5}>
                  {Object.values(STATE_BOARD_DOMAIN_ITEMS).map((item) => (
                    <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
                      <StateCol
                        currentStateKey={item.key}
                        groupedStates={
                          groupedByCurrentStates[item.key as CurrentState] ?? []
                        }
                        title={item.title}
                        color={item.color}
                        bgcolor={item.bgcolor}
                        developer={developer}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </DragDropContext>
            <Divider />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default DeveloperBoard;
