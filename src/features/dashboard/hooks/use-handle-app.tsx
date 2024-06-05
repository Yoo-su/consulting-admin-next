'use client';

import { useState, useEffect } from 'react';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useDeployAppMutation } from './tanstack/use-deploy-app-mutation';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';

export const useHandleApp = () => {
  const { currentService } = useUnivService();
  const [appType, setAppType] = useState<'P' | 'A'>('A');
  const [appFile, setAppFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const { alertData, setAlertData } = useMuiAlert();
  const { mutateAsync, isPending: isDeploying, isSuccess: deploySuccess, reset } = useDeployAppMutation();

  useEffect(() => {
    if (currentService) formData.set('serviceID', currentService?.serviceID);
  }, [currentService]);

  useEffect(() => {
    if (appType) formData.set('osType', appType);
  }, [appType]);

  useEffect(() => {
    setAlertData(null);
    reset();
    if (appFile) formData.set('file', appFile);
  }, [appFile]);

  const deploy = async () => {
    mutateAsync(formData)
      .then((res) => {
        setAlertData({
          message: '앱이 성공적으로 배포되었습니다',
          color: 'success',
        });
      })
      .catch((err) => {
        setAlertData({
          message: '앱 배포 중 문제가 발생했습니다',
          color: 'error',
        });
      });
  };

  return { appType, setAppType, appFile, setAppFile, deploy, isDeploying, alertData, deploySuccess };
};
