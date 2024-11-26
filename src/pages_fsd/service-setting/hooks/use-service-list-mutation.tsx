'use client';

import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';

import { createNewService, CreateNewServiceParams } from '../apis';

type UseServiceListMutationReturn = {
  isAddServiceLoading: boolean;
  addService: (params: CreateNewServiceParams) => void;
};

export const useServiceListMutation = () => {
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
          queryKey: QUERY_KEYS.service['service-list'](variables.univID)
            .queryKey,
        })
        .then(() => {
          toast.success(
            <Typography variant="body2">서비스가 추가되었습니다</Typography>
          );
        });
    },
    onError: (err: AxiosError) => {
      console.error(err);
      type ErrorResponse = {
        message?: string;
      };
      const errorResponse = err.response?.data as ErrorResponse;
      const errorMessage =
        errorResponse.message ?? '서비스 추가 중 에러가 발생했습니다';

      toast.error(<Typography variant="body2">{errorMessage}</Typography>);
    },
  });

  _return.current.isAddServiceLoading = isAddServiceLoading;
  _return.current.addService = addService;

  return _return.current;
};
