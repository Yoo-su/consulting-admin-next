import { useMutation } from '@tanstack/react-query';

import { uploadMajorFile } from '../api';

export const useUploadMajorFileMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadMajorFile(formData),
  });
};
