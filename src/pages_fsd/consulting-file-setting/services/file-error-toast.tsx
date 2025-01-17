import { Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';

export const fileTypeErrorToast = (fileName?: string) => {
  const component = fileName ? (
    <Stack direction="column">
      <Typography variant="body2">
        pdf/image 파일만 업로드 가능합니다
      </Typography>
      <Typography variant="caption" sx={{ backgroundColor: '#fafbeb' }}>
        {fileName}
      </Typography>
    </Stack>
  ) : (
    <Typography variant="body2">pdf/image 파일만 업로드 가능합니다</Typography>
  );
  toast.error(component);
};

export const fileUploadErrorToast = () => {
  toast.error(
    <Typography variant="body2">
      파일 처리 중 오류가 발생했습니다. 다시 시도해주세요.
    </Typography>
  );
};
