'use client';

import { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

export const useDownloadFile = () => {
  const downloadFile = useCallback(async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // 파일 다운로드 트리거
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error(<Typography variant="body2">파일 다운로드 중 오류가 발생했습니다</Typography>);
    }
  }, []);

  return { downloadFile };
};
