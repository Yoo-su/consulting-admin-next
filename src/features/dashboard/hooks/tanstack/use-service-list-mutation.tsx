'use client';

import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewService, CreateNewServiceParams } from '../../apis/create-new-service';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

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
          queryKey: ['service-list', variables.univID],
        })
        .then(() => {
          toast.success(<Typography variant="body2">서비스가 추가되었습니다</Typography>);
        });
    },
    onError: (err: AxiosError) => {
      console.error(err);
      type ErrorResponse = {
        message?: string;
      };
      const errorResponse = err.response?.data as ErrorResponse;
      const errorMessage = errorResponse.message ?? '서비스 추가 중 에러가 발생했습니다';

      toast.error(<Typography variant="body2">{errorMessage}</Typography>);
    },
  });

  _return.current.isAddServiceLoading = isAddServiceLoading;
  _return.current.addService = addService;

  return _return.current;
};
