import { useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { uploadMajorFile } from '../api';
import toast from 'react-hot-toast';

export const useUploadMajorFileMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadMajorFile(formData),
    onSuccess: () => {
      toast.success(<Typography variant="body2">학과자료가 업로드되었습니다</Typography>);
    },
  });
};
