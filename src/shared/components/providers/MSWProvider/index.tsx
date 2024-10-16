'use client';

import { useEffect, useState, ReactNode } from 'react';

import AppBackdrop from '@/shared/components/ui/loadings/app-backrdrop';
import { isMocking } from '@/shared/mocks/constant';
import { initMocking } from '@/shared/mocks';

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
