'use client';

import { useState, useEffect } from 'react';
import { AlertColor } from '@mui/material';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useDeployAppMutation } from './tanstack/use-deploy-app-mutation';

export const useHandleApp = () => {
  const { currentService } = useUnivService();
  const [appType, setAppType] = useState<'P' | 'A' | null>(null);
  const [appFile, setAppFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [helperText, setHelperText] = useState<{ text: string | null; color: AlertColor | null }>({
    text: null,
    color: null,
  });
  const { mutateAsync, isPending: isDeploying } = useDeployAppMutation();

  useEffect(() => {
    if (currentService) formData.set('serviceID', currentService?.serviceID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentService]);

  useEffect(() => {
    if (appType) formData.set('osType', appType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appType]);

  useEffect(() => {
    setHelperText({ text: null, color: null });
    if (appFile) formData.set('file', appFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appFile]);

  const deploy = async () => {
    mutateAsync(formData)
      .then((res) => {
        console.log(res.data);
        setHelperText({
          text: '앱이 성공적으로 배포되었습니다',
          color: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        setHelperText({
          text: '앱 배포 중 문제가 발생했습니다',
          color: 'error',
        });
      });
  };

  return { appType, setAppType, appFile, setAppFile, deploy, isDeploying, helperText };
};
