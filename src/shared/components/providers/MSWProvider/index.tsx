"use client";

import { useEffect, useState } from "react";
import { isMocking } from "@/shared/mocks/constant";
import { initMocking } from "@/shared/mocks";

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(!isMocking());

  useEffect(() => {
    if (!isReady) {
      (async () => {
        await initMocking();

        setIsReady(true);
      })();
    }
  }, [isReady]);

  if (!isReady) return null;

  return children;
};

export default MSWProvider;
