'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';

export type StateCardProps = {
  state: ConsultingAppState;
};
const StateCard = ({ state }: StateCardProps) => {
  const { setConsultingAppStates, consultingAppStates } = useConsultingAppState();
  const cardTitle = state.serviceYear + (state.serviceType === 'susi' ? '수시' : '정시') + ' ' + state.univName;

  const handleClick = () => {
    const filtered = consultingAppStates.filter((item) => item.serviceID !== state.serviceID);
    setConsultingAppStates(filtered);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        p: 1,
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      <Stack direction={'column'} spacing={1.5}>
        <Typography variant="body2">{cardTitle}</Typography>
        <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', px: 1, py: 0.5, width: 'fit-content' }}>
          <Typography variant="caption">{state.developer}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default StateCard;
