import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

import { BROWSER_PATH } from '@/features/browser/constants';
import { QUERY_KEYS } from '@/shared/constants';

import { uploadFoundationLibrary, uploadFoundationLibraryFileOnly } from '../../apis';
import { useOptionStore, useUiStore } from '../../models';

type UseFoundationUploadMutionReturn = {
  isUploading: boolean;
  isSuccess: boolean;
  postFoundation: (formData: FormData) => Promise<any>;
  resetBasic: () => void;
  resetFileOnly: () => void;
};
type UseFoundationUploadMutation = () => UseFoundationUploadMutionReturn;

export const useFoundationUploadMutation: UseFoundationUploadMutation = () => {
  const _return = useRef({} as UseFoundationUploadMutionReturn);
  const queryClient = useQueryClient();
  const isFileOnly = useOptionStore((state) => state.isFileOnly);
  const setAlertOption = useUiStore(useShallow((state) => state.setAlertOption));

  const handleMutationSuccess = useCallback(async (serviceID: string) => {
    await queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.browser.data(`${BROWSER_PATH.foundationLibrary}/${serviceID}`).queryKey,
    });
    setAlertOption({
      message: '파일 업로드를 성공적으로 마쳤습니다',
      color: 'success',
    });
  }, []);

  const handleMutationError = useCallback((error: AxiosError) => {
    console.error(error);
    const message =
      error.response?.data && typeof error.response.data === 'object'
        ? (error.response.data as { message?: [string] }).message?.join(', ')
        : undefined;

    setAlertOption({
      message: message ?? '엑셀 업로드 중 문제가 발생했습니다',
      color: 'error',
    });
  }, []);

  const {
    mutateAsync: uploadFoundation,
    isPending: isUploadingBasic,
    isSuccess: isUploadBasicSuccess,
    reset: resetBasic,
  } = useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibrary(formData);
    },
    onSuccess: async (data, variables) => {
      const serviceID = variables.get('serviceID') as string;
      await handleMutationSuccess(serviceID);
      return;
    },
    onError(error, variables, context) {
      handleMutationError(error as AxiosError);
      return;
    },
  });

  const {
    mutateAsync: uploadFoundationFileOnly,
    isPending: isUploadingFileOnly,
    isSuccess: isUploadFileOnlySuccess,
    reset: resetFileOnly,
  } = useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibraryFileOnly(formData);
    },
    onSuccess: async (data, variables) => {
      const serviceID = variables.get('serviceID') as string;
      await handleMutationSuccess(serviceID);
      return;
    },
    onError(error) {
      handleMutationError(error as AxiosError);
      return;
    },
  });

  _return.current = {
    isUploading: isFileOnly ? isUploadingFileOnly : isUploadingBasic,
    isSuccess: isFileOnly ? isUploadFileOnlySuccess : isUploadBasicSuccess,
    postFoundation: isFileOnly ? uploadFoundationFileOnly : uploadFoundation,
    resetBasic: resetBasic,
    resetFileOnly: resetFileOnly,
  };

  return _return.current;
};
