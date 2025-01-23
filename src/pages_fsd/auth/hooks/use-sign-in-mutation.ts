'use client';

import { useMutation } from '@tanstack/react-query';

import { useTypographyToast } from '@/shared/hooks';

import { signin, SigninParams } from '../apis';
import { LOGIN_MESSAGE } from '../constants';

export const useSigninMutation = () => {
  const { showError, showSuccess } = useTypographyToast();
  return useMutation({
    mutationFn: (params: SigninParams) => signin(params),
    onSuccess: async (response) => {
      try {
        const { access_token, token_type, expires_in } = response.data;
        sessionStorage.setItem('token', access_token);
        showSuccess(LOGIN_MESSAGE.SUCCESS);

        // 토큰 만료로 로그아웃된 경우 이전 페이지로 리다이렉트
        if (typeof window !== 'undefined') {
          const redirectPath =
            sessionStorage.getItem('redirectPath') || '/dashboard';
          sessionStorage.removeItem('redirectPath');
          window.location.href = redirectPath; // Use window.location instead of router
        }
      } catch (error) {
        console.error('error', error);
        showError(LOGIN_MESSAGE.CATCH_ERROR);
      }
    },
    onError: (error) => {
      if (error.message.includes('401')) {
        showError(LOGIN_MESSAGE.ERROR_401);
      } else if (error.message.includes('429')) {
        showError(LOGIN_MESSAGE.ERROR_429);
      } else {
        showError(LOGIN_MESSAGE.CATCH_ERROR);
      }
    },
  });
};
