'use client';

import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import StateCol from './state-col';
import { useConsultingAppState } from '../../hooks';
import { STATE_BOARD_DOMAIN_ITEMS, CURRENT_STATES } from '../../constants';
import { getGroupedData } from '@/shared/services';
import { CurrentState } from '../../models';
import toast from 'react-hot-toast';

const DeveloperBoard = () => {
  const { consultingAppStatesAll } = useConsultingAppState();
  const [developers, setDevelopers] = useState<string[]>([]);
  const [groupedByDeveloper, setGroupedByDeveloper] = useState(
    getGroupedData(consultingAppStatesAll, 'developer', developers)
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      toast.error(<Typography variant="body2">이동 범위가 아닙니다</Typography>);
      return;
    }
    const { source, destination } = result;
    const [sourceDeveloper, sourceAreaState] = source.droppableId.split('/'),
      [destinationDeveloper, destinationAreaState] = destination.droppableId.split('/');

    const sourceDevList = groupedByDeveloper[sourceDeveloper];
    const destinationDevList = groupedByDeveloper[destinationDeveloper];

    const sourceDevStateMap = getGroupedData(sourceDevList, 'currentState', CURRENT_STATES);
    const destinationDevStateMap = getGroupedData(destinationDevList, 'currentState', CURRENT_STATES);

    const sourceDevStateList = sourceDevStateMap[sourceAreaState as CurrentState];
    const destinationDevStateList = destinationDevStateMap[destinationAreaState as CurrentState];

    // 다른 리스트 간 이동한 경우

    const [removed] = sourceDevStateList.splice(source.index, 1);
    removed.currentState = destinationAreaState as CurrentState;
    destinationDevStateList.splice(destination.index, 0, removed);

    // 상태 업데이트
    setGroupedByDeveloper((prevState) => ({
      ...prevState,
      [sourceDeveloper]: sourceDevList,
      [destinationDeveloper]: destinationDevList,
    }));
  };

  useEffect(() => {
    const developerList = Array.from(consultingAppStatesAll, (item) => item.developer);
    const developerSet = Array.from(new Set(developerList));
    setDevelopers(developerSet);
  }, [consultingAppStatesAll]);

  return (
    <Stack direction={'column'} spacing={3}>
      {Object.keys(groupedByDeveloper).map((developer) => {
        const developerStates = groupedByDeveloper[developer];
        const groupedByCurrentStates = getGroupedData(developerStates, 'currentState', CURRENT_STATES);
        return (
          <Stack key={developer} direction={'column'} spacing={1}>
            <Stack direction={'row'} alignItems={'center'}>
              <Chip
                size="small"
                label={developerStates[0].developerName}
                sx={{ marginLeft: '3px', width: 'fit-content', bgcolor: 'rgba(0,0,0,0.75)', color: '#fff' }}
              />
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                {developerStates.length}건
              </Typography>
            </Stack>

            <DragDropContext onDragEnd={onDragEnd}>
              <Box sx={{ paddingBottom: '1rem' }}>
                <Grid container spacing={2}>
                  {Object.values(STATE_BOARD_DOMAIN_ITEMS).map((item) => (
                    <Grid item key={item.title} xs={6} md={2} lg={2} xl={2}>
                      <StateCol
                        currentStateKey={item.key}
                        groupedStates={groupedByCurrentStates[item.key as CurrentState] ?? []}
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
