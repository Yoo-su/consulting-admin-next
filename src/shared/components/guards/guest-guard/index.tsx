'use client';

import { useState, useEffect, Fragment, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import AppBackdrop from '@/shared/components/loadings/app-backrdrop';
import { paths } from '@/shared/constants/paths';
import { useUser } from '../../../../features/auth/hooks/use-user';

export type GuestGuardProps = {
  children: ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkUser = () => {
    if (isLoading) return;

    if (user) {
      router.replace(paths.dashboard.overview, { scroll: false });
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, isLoading]);

  if (isChecking) return <AppBackdrop />;

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
