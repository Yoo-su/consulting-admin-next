import { useState, useCallback, useEffect } from 'react';

export const useHandleMajorFile = () => {
  const [majorFile, setMajorFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const handleMajorFileChange = useCallback((file: File | null) => {
    setMajorFile(file);
  }, []);

  useEffect(() => {
    if (majorFile) formData.set('files', majorFile);
    else formData.delete('files');
  }, [majorFile]);

  return { majorFile, handleMajorFileChange, formData };
};
