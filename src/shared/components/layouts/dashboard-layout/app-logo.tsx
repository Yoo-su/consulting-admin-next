import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import snail from '@/shared/assets/svgs/snail.svg';
import orangeSnail from '@/shared/assets/svgs/snail_orange.svg';
import snowman from '@/shared/assets/svgs/snowman.svg';
import snowmansnow from '@/shared/assets/svgs/snowman_snow.svg';

const AppLogo = () => {
  const router = useRouter();
  const [logoSvg, setLogoSvg] = useState<any>(snowman);

  const handleClickLogo = () => router.push('/dashboard/overview');

  const handleMouseDown = () => {
    setLogoSvg(snowmansnow);
  };

  const handleMouseUp = () => {
    setLogoSvg(snowman);
  };

  return (
    <Box
      component="div"
      gap={0.5}
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        cursor: 'pointer',
        bgcolor: '#7A899E',
        borderRadius: '1rem 0 50% 0',
        padding: '0.3rem 0.1rem',
        transition: 'transform 0.08s ease-in-out',
        ':active': {
          transform: 'scale(0.98)',
        },
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClickLogo}
    >
      <Typography variant="h5">입학상담앱</Typography>
      <Typography variant="h6">관리자</Typography>
      <Image
        src={logoSvg}
        width={36}
        height={36}
        alt={'logo-svg'}
        style={{
          animation: 'wiggle 1.5s infinite',
        }}
      />
    </Box>
  );
};

export default AppLogo;
