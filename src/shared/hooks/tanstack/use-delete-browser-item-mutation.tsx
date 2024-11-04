import { Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBrowserFile } from '@/shared/apis/delete-browser-file';

export const useDeleteBrowserFileMutation = (path: string) => {
  return useMutation({
    mutationFn: () => deleteBrowserFile(path),
    onSuccess(data, variables, context) {
      toast.success(<Typography variant={'caption'}>파일 삭제가 완료되었습니다.</Typography>);
      return;
    },
  });
};
