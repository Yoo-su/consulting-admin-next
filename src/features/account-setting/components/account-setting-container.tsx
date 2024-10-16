'use client';

import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import toast from 'react-hot-toast';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUser } from '@/shared/hooks/context/use-user';
import { useUpdateProfileImageMutation } from '../hooks';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';

const AccountSettingContainer = () => {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewPath, setImagePreviewPath] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(new FormData());
  const { isPending, isSuccess, mutateAsync } = useUpdateProfileImageMutation();
  const { alertData, setAlertData } = useMuiAlert();

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setImageFile(selectedFile);
  };

  const handleClickSaveBtn = () => {
    formData.set('userID', user?.sub ?? '');
    mutateAsync(formData)
      .then((res) => {
        setImageFile(null);
        toast.success(<Typography variant="body2">성공적으로 반영되었습니다</Typography>);
      })
      .catch((err) => {
        toast.error(<Typography variant="body2">오류가 발생했습니다</Typography>);
      });
  };

  useEffect(() => {
    if (imageFile) {
      formData.set('file', imageFile);
      setImagePreviewPath(URL.createObjectURL(imageFile));
      setAlertData({ message: `선택된 파일명: ${imageFile?.name}`, color: 'info' });
    } else {
      formData.delete('file');
      setAlertData(null);
    }
  }, [imageFile]);

  return (
    <ContentWrapper sxProps={{ mt: 0 }}>
      <ContentWrapper.Header bottomDivider>
        <Typography variant="h6">{`${user?.userName}님 계정 관리`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={4} sx={{ my: 4 }}>
          <Box>
            <Tooltip title={<Typography variant="body1">사진 변경</Typography>} followCursor>
              <Avatar
                src={imageFile ? imagePreviewPath : user?.profileImage ?? ''}
                alt={user?.userName + 'profile'}
                sx={{ width: '10rem', height: '10rem', cursor: 'pointer' }}
                onClick={handleAvatarClick}
              />
            </Tooltip>
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

        {imageFile && !isSuccess && (
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" sx={{ width: 'fit-content' }} disabled={isPending} onClick={handleClickSaveBtn}>
              변경하기
            </Button>
            <Button color="inherit" variant="contained" sx={{ width: 'fit-content' }} disabled={isPending}>
              취소
            </Button>
          </Stack>
        )}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default AccountSettingContainer;
