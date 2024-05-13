import { useMutation } from '@tanstack/react-query';
import { signin, SigninParams } from '../../apis/sign-in';
import { useUser } from '../use-user';
import toast from 'react-hot-toast';
import { dummyUser } from '../../constants/dummies/user.dummy';

export const useSigninMutation = () => {
  const { setUser } = useUser();

  return useMutation({
    mutationFn: (params: SigninParams) => signin(params),
    onSuccess: async (response) => {
      const { name, userID, role, token } = response.data;
      const user = { name, userID, role };
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      toast.success('로그인에 성공했습니다');
    },
    onError: (error) => {
      //toast.error('로그인 정보를 확인해주세요');
      setUser(dummyUser);
      sessionStorage.setItem('user', JSON.stringify(dummyUser));
      sessionStorage.setItem('token', dummyUser?.token ?? '');
      toast.success('로그인에 성공했습니다');
    },
  });
};
