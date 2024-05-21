'use client';

import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';

import StateCol from '../state-col';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedData } from '../services/get-grouped-data';
import { currentStateList } from '../constants/current-states-list';
import { CurrentState } from '@/features/dashboard/types/consultingapp-state.type';

const DeveloperBoard = () => {
  const { consultingAppStates } = useConsultingAppState();
  const [developers, setDevelopers] = useState<string[]>([]);
  const [groupedByDeveloper, setGroupedByDeveloper] = useState(
    getGroupedData(consultingAppStates, 'developer', developers)
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, combine } = result;
    const [sourceDeveloper, sourceAreaState] = source.droppableId.split('/'),
      [destinationDeveloper, destinationAreaState] = destination?.droppableId.split('/');

    if (sourceDeveloper !== destinationDeveloper) {
      toast.error('다른 개발자 영역입니다');
      return;
    }

    const sourceDevList = groupedByDeveloper[sourceDeveloper];
    const destinationDevList = groupedByDeveloper[destinationDeveloper];

    const sourceDevStateMap = getGroupedData(sourceDevList, 'currentState', currentStateList);
    const destinationDevStateMap = getGroupedData(destinationDevList, 'currentState', currentStateList);

    const sourceDevStateList = sourceDevStateMap[sourceAreaState as CurrentState];
    const destinationDevStateList = destinationDevStateMap[destinationAreaState as CurrentState];

    // 같은 리스트 내에서 이동한 경우
    if (sourceAreaState === destinationAreaState) {
      const [removed] = sourceDevStateList.splice(source.index, 1);
      sourceDevStateList.splice(destination.index, 0, removed);
    }
    // 다른 리스트 간 이동한 경우
    else {
      const [removed] = sourceDevStateList.splice(source.index, 1);
      removed.currentState = destinationAreaState as CurrentState;
      destinationDevStateList.splice(destination.index, 0, removed);
    }

    // 상태 업데이트
    setGroupedByDeveloper((prevState) => ({
      ...prevState,
      sourceDeveloper: sourceDevStateList,
      destinationDeveloper: destinationDevStateList,
    }));
  };

  useEffect(() => {
    const developerList = Array.from(consultingAppStates, (item) => item.developer);
    const developerSet = Array.from(new Set(developerList));
    setDevelopers(developerSet);
  }, [consultingAppStates]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack direction={'column'} spacing={3}>
        {Object.keys(groupedByDeveloper).map((developer) => {
          const developerStates = groupedByDeveloper[developer];
          const groupedByCurrentStates = getGroupedData(developerStates, 'currentState', currentStateList);
          return (
            <Stack key={developer} direction={'column'} spacing={1}>
              <Stack direction={'row'} alignItems={'center'}>
                <Chip
                  size="small"
                  label={developer}
                  sx={{ width: 'fit-content', bgcolor: 'rgba(0,0,0,0.75)', color: '#fff' }}
                />
                <Typography variant="caption" sx={{ marginLeft: 1 }}>
                  {developerStates.length}건
                </Typography>
              </Stack>

              <Box>
                <Grid container spacing={2}>
                  {Object.values(stateBoardDomainItems).map((item) => (
                    <Grid item key={item.title} xs={4} md={2} lg={2} xl={2}>
                      <StateCol
                        currentStateKey={item.key}
                        groupedStates={groupedByCurrentStates[item.key] ?? []}
                        title={item.title}
                        color={item.color}
                        bgcolor={item.bgcolor}
                        developer={developer}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <div></div>
              <Divider />
            </Stack>
          );
        })}
      </Stack>
    </DragDropContext>
  );
};

export default DeveloperBoard;
