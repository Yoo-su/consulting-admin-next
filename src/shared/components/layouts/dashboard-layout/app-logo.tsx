import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import snail from '@/shared/assets/svgs/snail.svg';

const AppLogo = () => {
  return (
    <Box
      component="div"
      gap={0.5}
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        alignItems: 'flex-end',
      }}
    >
      <Typography variant="h5">입학상담앱</Typography>
      <Typography variant="h6">관리자</Typography>
      <Image src={snail} width={26} height={26} alt={'snail-logo'} />
    </Box>
  );
};

export default AppLogo;
