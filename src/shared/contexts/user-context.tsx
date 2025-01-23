'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

import { authInstance } from '@/shared/plugin/axios';

import { getUserProfile, syncMoaNesinService } from '../apis';
import { AuthEvents } from '../components/guards/auth-guard/auth-event-listener';
import { useTypographyToast } from '../hooks';
import { AdminGroup, User } from '../models';

export type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  handleLogout?: () => void;
};
const UserContext = createContext<UserContextValue | undefined>(undefined);

export type UserProviderProps = {
  children: React.ReactNode;
};
export const UserProvider = ({ children }: UserProviderProps) => {
  const { showError } = useTypographyToast();
  const [state, setState] = useState<
    Pick<UserContextValue, 'user' | 'isLoading'>
  >({
    user: null,
    isLoading: true,
  });

  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user: user, isLoading: false }));
  };

  const isAdmin =
    state.user?.groupIdList.includes(AdminGroup['ConsultingAdminDeveloper']) ??
    false;

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('token');
    setUser(null);
    window.location.href = '/auth/sign-in';
  }, []);

  useEffect(() => {
    const unsubscribe = AuthEvents.subscribe((event) => {
      if (event.type === 'UNAUTHORIZED') {
        handleLogout();
      }
    });

    return () => unsubscribe();
  }, [handleLogout]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      getUserProfile()
        .then((res) => {
          setUser(res.data);
          // moa 정보 업데이트
          syncMoaNesinService({
            userID: res.data.sub,
            departmentID: res.data.departmentID,
          }).then((res) => {
            console.info('sync with Moa :\n', res.data.message);
          });
        })
        .catch((err) => {
          delete authInstance.defaults.headers.common['Authorization'];
          sessionStorage.removeItem('token');
          setUser(null);
          showError('인증되지 않은 사용자입니다', 'caption');
        });
    } else setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser, isAdmin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;
export { UserConsumer, UserContext };
