'use client';

import { useRef, useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useUser } from '@/features/auth/hooks/use-user';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';

const AccountSettingBox = () => {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewPath, setImagePreviewPath] = useState<string>('');
  const { alertData, setAlertData } = useMuiAlert();

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setImageFile(selectedFile);
    if (selectedFile) {
      setImagePreviewPath(URL.createObjectURL(selectedFile));
      setAlertData({ message: `선택된 파일명: ${selectedFile?.name}`, color: 'info' });
    } else {
      setAlertData(null);
    }
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
      spacing={4}
    >
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={4}>
        <Box>
          <Avatar
            src={imageFile ? imagePreviewPath : user?.profileImage ?? ''}
            alt={user?.userName + 'profile'}
            sx={{ width: '10rem', height: '10rem', cursor: 'pointer' }}
            onClick={handleAvatarClick}
          />
        </Box>

        <Stack direction={'column'} spacing={2}>
          <Typography variant="body1">이름 | {user?.userName}님</Typography>
          <Typography variant="body1">사용자ID | {user?.sub}</Typography>
        </Stack>
      </Stack>
      {alertData && (
        <Alert
          sx={{ mx: 'auto', minWidth: '45%' }}
          variant="outlined"
          severity={alertData.color}
          color={alertData.color}
        >
          {alertData.message}
        </Alert>
      )}

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        accept=".jpg, .png"
        onChange={handleFileChange}
      />

      {imageFile && (
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            변경하기
          </Button>
          <Button color="inherit" variant="contained" sx={{ width: 'fit-content' }}>
            취소
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default AccountSettingBox;
