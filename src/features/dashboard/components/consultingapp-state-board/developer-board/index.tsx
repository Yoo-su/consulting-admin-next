'use client';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import StateCol from '../state-col';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';
import { getGroupedStatesObject } from '../utils/get-grouped-states';

type DeveloperBoardProps = {
  consultingAppStates: ConsultingAppState[];
};
const DeveloperBoard = ({ consultingAppStates }: DeveloperBoardProps) => {
  const groupedByDeveloper = getGroupedStatesObject(consultingAppStates, 'developer');

  return (
    <Stack direction={'column'} spacing={3}>
      {Object.keys(groupedByDeveloper).map((developer) => {
        const developerStates = groupedByDeveloper[developer];
        const groupedByCurrentStates = getGroupedStatesObject(developerStates, 'currentState');
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

            <Stack
              direction={'row'}
              spacing={2}
              sx={{ '&::-webkit-scrollbar': { display: 'none' }, overflow: 'scroll' }}
            >
              {Object.values(stateBoardDomainItems).map((item) => (
                <StateCol
                  key={item.title}
                  consultingAppStates={groupedByCurrentStates[item.key] ?? []}
                  title={item.title}
                  color={item.color}
                  bgcolor={item.bgcolor}
                />
              ))}
            </Stack>
            <div></div>
            <Divider />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default DeveloperBoard;
