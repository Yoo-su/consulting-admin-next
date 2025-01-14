'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signin, SigninParams } from '../apis';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: (params: SigninParams) => signin(params),
    onSuccess: async (response) => {
      try {
        const { access_token, token_type, expires_in } = response.data;
        sessionStorage.setItem('token', access_token);
        toast.success('로그인에 성공했습니다');

        // 토큰 만료로 로그아웃된 경우 이전 페이지로 리다이렉트
        if (typeof window !== 'undefined') {
          const redirectPath =
            sessionStorage.getItem('redirectPath') || '/dashboard';
          sessionStorage.removeItem('redirectPath');
          window.location.href = redirectPath; // Use window.location instead of router
        }
      } catch (error) {
        console.error('error', error);
        toast.error('로그인 정보를 확인해주세요');
      }
    },
    onError: (error) => {
      if (error.message.includes('401')) {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다');
      } else if (error.message.includes('429')) {
        toast.error('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요');
      } else {
        toast.error('로그인 정보를 확인해주세요');
      }
    },
  });
};
