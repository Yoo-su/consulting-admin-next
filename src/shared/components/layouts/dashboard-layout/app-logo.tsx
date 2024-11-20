import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import snail from '@/shared/assets/svgs/snail.svg';

const AppLogo = () => {
  const router = useRouter();

  const handleClickLogo = () => router.push('/dashboard/overview');

  return (
    <Box
      component="div"
      gap={0.5}
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        alignItems: 'flex-end',
        cursor: 'pointer',
      }}
      onClick={handleClickLogo}
    >
      <Typography variant="h5">입학상담앱</Typography>
      <Typography variant="h6">관리자</Typography>
      <Image src={snail} width={26} height={26} alt={'snail-logo'} />
    </Box>
  );
};

export default AppLogo;
