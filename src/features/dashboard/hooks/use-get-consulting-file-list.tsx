'use client';

import { useState, useCallback, useEffect } from 'react';
import { getConsultingFileList } from '../apis/get-consulting-file-list';

import { dummyConsultingFileList } from '../constants/dummies/consulting-file-list.dummy';
import { ConsultingFile } from '../types/consulting-file';

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
        setFiles(dummyConsultingFileList);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, [serviceID]);

  return { loading, files, setFiles, execute: useCallback(execute, [serviceID]) };
};
