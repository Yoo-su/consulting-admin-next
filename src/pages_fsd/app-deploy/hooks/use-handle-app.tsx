'use client';

import { useEffect, useState } from 'react';

import { OS_TYPE } from '@/pages_fsd/app-version-history/constants';
import { OsTypeValues } from '@/pages_fsd/app-version-history/models';
import { useMuiAlert, useStepper } from '@/shared/hooks';

import { useDeployAppMutation } from './use-deploy-app-mutation';

export const useHandleApp = () => {
  const [appType, setAppType] = useState<Exclude<OsTypeValues, 'O'>>(
    OS_TYPE.APK
  );
  const [appFile, setAppFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const {
    mutateAsync,
    isPending: isDeploying,
    isSuccess: deploySuccess,
    reset,
  } = useDeployAppMutation();
  const { alertData, setAlertData } = useMuiAlert();
  const {
    activeStep,
    goToStep,
    handleNext,
    handleReset: resetStep,
  } = useStepper();

  // 앱 유형 변경 처리
  useEffect(() => {
    formData.set('OS_TYPE', appType);
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

  return {
    appType,
    setAppType,
    activeStep,
    appFile,
    setAppFile,
    deploy,
    isDeploying,
    alertData,
    deploySuccess,
  };
};
