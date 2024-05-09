import { useMutation } from '@tanstack/react-query';
import { uploadExcel } from '../../apis/upload-excel';

export const useUploadExcelMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadExcel(formData),
  });
};
