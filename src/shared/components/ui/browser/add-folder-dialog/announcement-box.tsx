import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

const AnnouncementBox = () => {
  return (
    <Stack
      width="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="#808080"
    >
      <AnnouncementOutlinedIcon
        color="inherit"
        sx={{ width: '50px', height: '50px' }}
      />
      <Typography variant="body2" color="inherit">
        최소 한 개 이상의 파일을 등록해주세요
      </Typography>
    </Stack>
  );
};

export default memo(AnnouncementBox);
