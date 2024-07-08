import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { use, useEffect } from 'react';

export default function useInterceptAppRouter<TMethod extends keyof AppRouterInstance>(
  original: TMethod,
  interceptFn: (original: () => void, args: Parameters<AppRouterInstance[TMethod]>) => void
): void {
  const appRouter = use(AppRouterContext);

  useEffect(() => {
    if (!appRouter) throw new Error('useInterceptAppRouter must be used within an App Router context');
    const originalMethod = appRouter[original];

    appRouter[original] = ((...args: Parameters<AppRouterInstance[TMethod]>) =>
      // @ts-expect-error args is not tuple?
      interceptFn(() => originalMethod(...args), args)) as AppRouterInstance[TMethod];

    return () => {
      appRouter[original] = originalMethod;
    };
  }, [appRouter, original, interceptFn]);
}
