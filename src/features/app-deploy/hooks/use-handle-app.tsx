'use client';

import { useState, useEffect } from 'react';

import { useDeployAppMutation } from './use-deploy-app-mutation';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';
import { useStepper } from '@/shared/hooks/use-stepper';

export const useHandleApp = () => {
  const [appType, setAppType] = useState<'P' | 'A'>('A');
  const [appFile, setAppFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const { mutateAsync, isPending: isDeploying, isSuccess: deploySuccess, reset } = useDeployAppMutation();
  const { alertData, setAlertData } = useMuiAlert();
  const { activeStep, goToStep, handleNext, handleReset: resetStep } = useStepper();

  // 앱 유형 변경 처리
  useEffect(() => {
    formData.set('osType', appType);
    if (appFile) {
      setAppFile(null);
      resetStep();
    }
  }, [appType]);

  // 등록된 파일 변경 처리
  useEffect(() => {
    if (deploySuccess) reset();
    if (appFile) {
      formData.set('file', appFile);
      goToStep(1);
    } else {
      formData.delete('file');
      resetStep();
    }
    setAlertData(null);
  }, [appFile]);

  const deploy = async (serviceID: string) => {
    formData.set('serviceID', serviceID);
    mutateAsync(formData)
      .then((res) => {
        setAlertData({
          message: '앱이 성공적으로 배포되었습니다',
          color: 'success',
        });
        handleNext();
      })
      .catch((err) => {
        setAlertData({
          message: '앱 배포 중 문제가 발생했습니다',
          color: 'error',
        });
      });
  };

  return { appType, setAppType, activeStep, appFile, setAppFile, deploy, isDeploying, alertData, deploySuccess };
};
