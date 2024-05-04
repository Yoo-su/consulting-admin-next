import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import StateCard from '../state-card';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';

export type StateColProps = {
  consultingAppStates: ConsultingAppState[];
  title: string;
  color: string;
  bgcolor: string;
};
const StateCol = ({ consultingAppStates, title, color, bgcolor }: StateColProps) => {
  return (
    <Stack
      direction={'column'}
      spacing={2}
      sx={{
        bgcolor: bgcolor,
        p: 1,
        borderRadius: '0.5rem',
        flexGrow: 1,
        height: 'fit-content',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box
          sx={{
            display: 'flex',
            width: '75%',
            alignItems: 'center',
            borderRadius: '1rem',
            bgcolor: color,
            px: '10px',
            py: '5px',
          }}
        >
          <Box
            component={'div'}
            sx={{
              width: '10px',
              height: '10px',
              bgcolor: color,
              filter: 'saturate(150%) contrast(50%)',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
          <Typography
            variant="body2"
            color="black"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            filter: 'saturate(150%) contrast(50%)',
            fontSize: '15px',
            color: color,
            marginLeft: 1,
          }}
        >
          {consultingAppStates.length}
        </Typography>
      </Stack>

      <Stack component={'ul'} sx={{ listStyle: 'none', p: 0, m: 0 }} spacing={1}>
        {consultingAppStates.map((consultingState) => (
          <StateCard key={consultingState.serviceID} state={consultingState} />
        ))}
      </Stack>
    </Stack>
  );
};

export default StateCol;
