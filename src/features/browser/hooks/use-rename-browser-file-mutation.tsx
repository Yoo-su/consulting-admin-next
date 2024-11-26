import { useMutation } from '@tanstack/react-query';

import { renameBrowserFile, RenameBrowserFileProps } from '../apis';

export const useRenameBrowserFileMutation = () => {
  return useMutation({
    mutationFn: ({ oldName, newName }: RenameBrowserFileProps) =>
      renameBrowserFile({ oldName, newName }),
    onSuccess(data, variables, context) {
      console.log(variables);
    },
  });
};
