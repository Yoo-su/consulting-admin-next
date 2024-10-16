import { useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import toast from 'react-hot-toast';

import { uploadMajorFile } from '../api';

export const useUploadMajorFileMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadMajorFile(formData),
    onSuccess: () => {
      toast.success(<Typography variant="body2">학과자료가 업로드되었습니다</Typography>);
    },
  });
};
