import { useMutation } from '@tanstack/react-query';

import { uploadMajorFile } from '../../apis';

export const useUploadMajorFileMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadMajorFile(formData),
  });
};
