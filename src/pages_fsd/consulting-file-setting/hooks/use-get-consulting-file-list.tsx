'use client';

import { useCallback, useEffect, useState } from 'react';

import { getConsultingFileList } from '../apis/get-consulting-file-list';
import { ConsultingFile } from '../models';

export const useGetConsultingFileList = (serviceID: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<ConsultingFile[]>([]);

  const execute = () => {
    getConsultingFileList(serviceID)
      .then((response) => {
        setFiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setFiles([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, [serviceID]);

  return {
    loading,
    files,
    setFiles,
    execute: useCallback(execute, [serviceID]),
  };
};
