'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMuiAlert,useUnivService, useUser } from '@/shared/hooks';

import { useUploadEtcLibraryMutation } from './use-upload-etc-library-mutation';

export const useHandleEtcLibrary = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useUser();
  const { currentService } = useUnivService();
  const { alertData, setAlertData } = useMuiAlert();

  const formData = useMemo(() => {
    const data = new FormData();
    if (currentService) data.set('serviceID', currentService.serviceID);
    if (user) data.set('userID', user.sub);
    if (file) data.set('file', file);
    return data;
  }, [currentService, user, file]);

  const {
    mutateAsync: uploadEtcLibrary,
    isPending: isUploading,
    isSuccess: uploadSuccess,
    reset,
  } = useUploadEtcLibraryMutation();

  useEffect(() => {
    const upload = async () => {
      if (!file) return;
      try {
        const res = await uploadEtcLibrary(formData);
        const { statusCode, message } = res.data;
        if (statusCode == 201) {
          setAlertData({
            message: message ?? '파일 업로드를 성공적으로 마쳤습니다',
            color: 'success',
          });
        } else {
          setAlertData({
            message: message ?? '엑셀 업로드 중 문제가 발생했습니다',
            color: 'error',
          });
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };

    if (file) {
      upload();
    }
  }, [file, formData, uploadEtcLibrary]);

  return {
    file,
    formData,
    setFile,

    alertData,
  };
};
