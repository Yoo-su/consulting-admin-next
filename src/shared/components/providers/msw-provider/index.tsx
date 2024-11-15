'use client';

import { ReactNode, useEffect, useState } from 'react';

import { initMocking } from '@/shared/mocks';
import { isMocking } from '@/shared/mocks/constant';

import AppBackdrop from '../../ui/loadings/app-backdrop';

const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(!isMocking());

  useEffect(() => {
    if (!isReady) {
      (async () => {
        await initMocking();

        setIsReady(true);
      })();
    }
  }, [isReady]);

  if (!isReady) return <AppBackdrop />;

  return children;
};

export default MSWProvider;
