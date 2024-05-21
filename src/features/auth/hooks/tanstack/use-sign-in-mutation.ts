import { useMutation } from '@tanstack/react-query';
import { signin, SigninParams } from '../../apis/sign-in';
import { useUser } from '../use-user';
import toast from 'react-hot-toast';
import { User } from '../../types/user.type';

export const useSigninMutation = () => {
  const { setUser } = useUser();

  return useMutation({
    mutationFn: (params: SigninParams) => signin(params),
    onSuccess: async (response) => {
      const { access_token, token_type, expires_in } = response.data;
      const user: User = { name: '유수현', userID: 'suhyun0871', role: 'developer' };
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', access_token);
      toast.success('로그인에 성공했습니다');
    },
    onError: (error) => {
      toast.error('로그인 정보를 확인해주세요');
    },
  });
};
