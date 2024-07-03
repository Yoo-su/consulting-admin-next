'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';

const EmptyConditionBox = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
      <Stack
        direction={'column'}
        spacing={1}
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1rem',
          bgcolor: 'rgba(0,0,0,0.03)',
        }}
      >
        <SdCardAlertIcon sx={{ fontSize: '80px', color: 'rgba(0,0,0,0.65)' }} />
        <Typography variant="body2" color="grey.700">
          등록된 표시조건이 없습니다
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyConditionBox;
