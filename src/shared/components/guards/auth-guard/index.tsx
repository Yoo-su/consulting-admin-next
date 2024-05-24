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

    /**
     * user 존재 시 token 값에 대한 verify를 수행해야 한다.
     * token verify
     */

    setIsChecking(false);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isChecking) return <AppBackdrop />;
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
