'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { useMemo } from 'react';

import { ERROR_MESSAGE, PROGRESS_STATE_ITEMS, PROGRESS_STATES, UPDATE_APP_STATE } from '@/pages_fsd/overview/constants';
import { useFilteredBoardData, useUpdateServiceDetailMutation } from '@/pages_fsd/overview/hooks';
import { ProgressState, ServiceType } from '@/pages_fsd/overview/models';
import { useTypographyToast } from '@/shared/hooks';
import { getGroupedData } from '@/shared/services';

import { CardListColumn } from '../../card-list-column';
import { DeveloperInfo } from './developer-info';

export const DeveloperBoard = () => {
  const { showError, showSuccess } = useTypographyToast();
  const { filteredServiceDetailAll, developers } = useFilteredBoardData();

  const { mutateAsync: updateServiceDetailMutation } = useUpdateServiceDetailMutation();

  const serviceDetailsByDeveloper = useMemo(() => {
    return getGroupedData(filteredServiceDetailAll ?? [], 'developer', developers);
  }, [filteredServiceDetailAll, developers]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      showError(ERROR_MESSAGE.NOT_DROPPABLE);
      return;
    }
    const { source, destination } = result;
    const [sourceDeveloper, sourceAreaState] = source.droppableId.split('/'),
      [destinationDeveloper, destinationAreaState] = destination.droppableId.split('/');

    const sourceDevList = serviceDetailsByDeveloper[sourceDeveloper];
    const destinationDevList = serviceDetailsByDeveloper[destinationDeveloper];

    const sourceDevStateMap = getGroupedData(sourceDevList, 'currentState', PROGRESS_STATES);
    const destinationDevStateMap = getGroupedData(destinationDevList, 'currentState', PROGRESS_STATES);

    const sourceDevStateList = sourceDevStateMap[sourceAreaState as ProgressState];
    const destinationDevStateList = destinationDevStateMap[destinationAreaState as ProgressState];

    // 다른 리스트 간 이동한 경우

    const [removed] = sourceDevStateList.splice(source.index, 1);
    const updateParams = {
      serviceYear: Number(removed.serviceYear),
      univID: Number(removed.univID),
      serviceType: removed.serviceType as ServiceType,
      currentState: destination.droppableId.split('/')[1] as ProgressState,
    };
    removed.currentState = destinationAreaState as ProgressState;
    destinationDevStateList.splice(destination.index, 0, removed);

    // 상태 업데이트
    updateServiceDetailMutation(updateParams).then((res) => {
      if (res.status === 200) {
        showSuccess(UPDATE_APP_STATE.UPDATE_SUCCESS);
      } else {
        showError(UPDATE_APP_STATE.UPDATE_ERROR);
      }
    });
  };

  return (
    <Stack direction={'column'} spacing={3}>
      {developers.map((developer) => {
        const serviceDetails = serviceDetailsByDeveloper[developer];
        const groupedByCurrentStates = getGroupedData(serviceDetails, 'currentState', PROGRESS_STATES);
        return (
          <Stack key={developer} direction={'column'} spacing={1}>
            <DeveloperInfo name={serviceDetails[0]?.developerName} serviceCnt={serviceDetails.length} />

            <DragDropContext onDragEnd={onDragEnd}>
              <Box sx={{ paddingBottom: '1rem' }}>
                <Grid container spacing={1.5}>
                  {Object.values(PROGRESS_STATE_ITEMS).map((item) => (
                    <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
                      <CardListColumn
                        progressStateKey={item.key}
                        serviceDetails={groupedByCurrentStates[item.key as ProgressState] ?? []}
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
