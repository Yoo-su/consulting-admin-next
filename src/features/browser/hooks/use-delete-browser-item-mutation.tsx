import { useMutation } from '@tanstack/react-query';

import { deleteBrowserFile } from '../apis';

export const useDeleteBrowserFileMutation = () => {
  return useMutation({
    mutationFn: (path: string) => deleteBrowserFile(path),
  });
};
