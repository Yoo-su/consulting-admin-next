'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useTypographyToast } from '@/shared/hooks';

import { createNewService, CreateNewServiceParams } from '../apis';

type UseServiceListMutationReturn = {
  isAddServiceLoading: boolean;
  addService: (params: CreateNewServiceParams) => void;
};

export const useServiceListMutation = () => {
  const { showSuccess, showError } = useTypographyToast();
  const queryClient = useQueryClient();

  const _return = useRef({} as UseServiceListMutationReturn);

  type AddServiceMutationProps = {
    schoolYear: number;
    isSusi: string;
    univID: string;
  };
  const { mutate: addService, isPending: isAddServiceLoading } = useMutation({
    mutationFn: (params: AddServiceMutationProps) => createNewService(params),
    onSuccess: (data, variables, context) => {
      queryClient
        .invalidateQueries({
          queryKey: QUERY_KEYS.service['list'](variables.univID).queryKey,
        })
        .then(() => {
          showSuccess('서비스가 추가되었습니다');
        });
    },
    onError: (err: AxiosError) => {
      console.error(err);
      type ErrorResponse = {
        message?: string;
      };
      const errorResponse = err.response?.data as ErrorResponse;
      const errorMessage = errorResponse.message ?? '서비스 추가 중 에러가 발생했습니다';

      showError(errorMessage);
    },
  });

  _return.current.isAddServiceLoading = isAddServiceLoading;
  _return.current.addService = addService;

  return _return.current;
};
