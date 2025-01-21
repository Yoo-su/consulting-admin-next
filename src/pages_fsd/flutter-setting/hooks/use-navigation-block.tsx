import { useConfirmToast } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type UseNavigationBlockProps = {
  isBlocked: boolean;
};

export const useNavigationBlock = ({ isBlocked }: UseNavigationBlockProps) => {
  const { openConfirmToast } = useConfirmToast();
  const router = useRouter();
  useEffect(() => {
    if (isBlocked) {
      window.history.pushState(null, '', window.location.href); // preventing forward button
      const listener = () => {
        openConfirmToast({
          message: '저장되지 않은 데이터가 있습니다.\n이동하시겠습니까?',
          callbackConfirm: () => router.back(),
          callbackCancel: () =>
            window.history.pushState(null, '', window.location.href),
        });
      };

      window.addEventListener('popstate', listener);
      return () => {
        window.removeEventListener('popstate', listener);
      };
    }
  }, [isBlocked]);

  const handleViewTransition = useCallback(
    (originalMethod: () => void) => {
      if (isBlocked) {
        openConfirmToast({
          message: '저장되지 않은 데이터가 있습니다.\n이동하시겠습니까?',
          callbackConfirm: originalMethod,
        });
      } else {
        originalMethod();
      }
    },
    [isBlocked]
  );

  return handleViewTransition;
};
