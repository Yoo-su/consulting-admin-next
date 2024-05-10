'use client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction={'column'} mt={'8rem'} justifyContent={'center'} alignItems={'center'}>
        <HashLoader color={'#36D7B7'} size={120} />
        <Typography variant="h6" color="gray.500" marginTop={'1rem'}>
          페이지를 불러오는 중입니다 . .
        </Typography>
      </Stack>
    </Container>
  );
};

export default Loading;
