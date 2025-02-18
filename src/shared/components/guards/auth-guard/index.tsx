'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { PATHS } from '@/shared/constants';
import { useUser } from '@/shared/hooks';

import { AppBackdrop } from '../../ui';

export type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkUser = () => {
    if (isLoading) return;
    if (!user) {
      router.replace(PATHS.auth.signIn, { scroll: false });
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkUser();
  }, [user, isLoading]);

  if (isChecking) return <AppBackdrop />;
  return children;
};
