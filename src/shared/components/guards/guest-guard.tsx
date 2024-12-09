'use client';

import { useRouter } from 'next/navigation';
import { Fragment, ReactNode, useEffect, useState } from 'react';

import { PATHS } from '@/shared/constants';
import { useUser } from '@/shared/hooks';

import { AppBackdrop } from '../ui';

export type GuestGuardProps = {
  children: ReactNode;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkUser = () => {
    if (isLoading) return;

    if (user) {
      router.replace(PATHS.dashboard.overview, { scroll: false });
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkUser();
  }, [user, isLoading]);

  if (isChecking) return <AppBackdrop />;

  return <Fragment>{children}</Fragment>;
};
