'use client';

import { useEffect, useState, Fragment, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import AppBackdrop from '@/shared/components/loadings/app-backrdrop';
import { useUser } from '../../../../features/auth/hooks/use-user';
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
      router.replace(paths.auth.signIn, { scroll: false });
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

export default AuthGuard;
