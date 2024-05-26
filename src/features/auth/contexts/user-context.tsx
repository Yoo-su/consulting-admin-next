'use client';

import { useEffect, useState, createContext } from 'react';
import { getUserProfile } from '../apis/get-user-profile';
import { apiInstance } from '@/shared/plugin/axios';
import { User } from '../types/user.type';
import toast from 'react-hot-toast';

export type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};
const UserContext = createContext<UserContextValue | undefined>(undefined);

export type UserProviderProps = {
  children: React.ReactNode;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<Pick<UserContextValue, 'user' | 'isLoading'>>({
    user: null,
    isLoading: true,
  });

  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user: user, isLoading: false }));
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      apiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      getUserProfile()
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          delete apiInstance.defaults.headers.common['Authorization'];
          sessionStorage.removeItem('token');
          setUser(null);
          toast.error('인증되지 않은 사용자입니다');
        });
    } else setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={{ ...state, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
const UserConsumer = UserContext.Consumer;
export { UserContext, UserConsumer };
