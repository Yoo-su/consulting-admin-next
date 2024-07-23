import { useState, useCallback, useEffect } from 'react';

export const useHandleMajorFile = () => {
  const [majorFiles, setMajorFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const handleMajorFileAdd = useCallback((files: File[]) => {
    if (files.length > 1) setMajorFiles((prev) => [...prev, ...files]);
    else setMajorFiles((prev) => [...prev, files[0]]);
  }, []);

  const clearState = useCallback(() => {
    setMajorFiles([]);
    setFormData(new FormData());
  }, []);

  return { majorFiles, handleMajorFileAdd, formData, clearState };
};
