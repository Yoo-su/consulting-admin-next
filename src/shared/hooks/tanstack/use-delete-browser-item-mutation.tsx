import { useMutation } from '@tanstack/react-query';

import { deleteBrowserFile } from '@/shared/apis/delete-browser-file';

export const useDeleteBrowserFileMutation = () => {
  return useMutation({
    mutationFn: (path: string) => deleteBrowserFile(path),
  });
};
