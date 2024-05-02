'use client';

import { useEffect, useState, Fragment, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '../../hooks/use-user';
import { paths } from '@/shared/constants/paths';

export type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkUser = () => {
    if (isLoading) return;
    if (!user) {
      router.replace(paths.auth.signIn);
      return;
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isChecking) return;
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
