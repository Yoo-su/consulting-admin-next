import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import snail from '@/shared/assets/svgs/snail.svg';
import orangeSnail from '@/shared/assets/svgs/snail_orange.svg';

const AppLogo = () => {
  const router = useRouter();
  const [logoSvg, setLogoSvg] = useState<any>(snail);

  const handleClickLogo = () => router.push('/dashboard/overview');

  const handleMouseDown = () => {
    setLogoSvg(orangeSnail);
  };

  const handleMouseUp = () => {
    setLogoSvg(snail);
  };

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
        width={26}
        height={26}
        alt={'snail-logo'}
        style={{
          animation: 'wiggle 1.5s infinite',
        }}
      />
    </Box>
  );
};

export default AppLogo;
