'use client';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import king from '@/shared/assets/images/king.jpg';
import king2 from '@/shared/assets/images/king2.jpg';

const AccountSettingBox = () => {
  return (
    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={4}>
      <Avatar
        sx={{
          width: '320px',
          height: '320px',
          objectFit: 'cover',
          mt: 8,
        }}
        src={king.src}
        alt="legendary child"
      />

      <Avatar
        sx={{
          width: '320px',
          height: '320px',
          objectFit: 'cover',
          mt: 8,
        }}
        src={king2.src}
        alt="legendary child"
      />
    </Stack>
  );
};

export default AccountSettingBox;
