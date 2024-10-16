'use client';

import { useMutation } from '@tanstack/react-query';

import { signin, SigninParams } from '../apis';
import toast from 'react-hot-toast';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: (params: SigninParams) => signin(params),
    onSuccess: async (response) => {
      const { access_token, token_type, expires_in } = response.data;
      sessionStorage.setItem('token', access_token);
      toast.success('로그인에 성공했습니다');
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      toast.error('로그인 정보를 확인해주세요');
    },
  });
};
