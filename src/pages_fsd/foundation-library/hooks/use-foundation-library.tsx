import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { BROWSER_PATH } from '@/features/browser/constants';
import { BrowserOptionOptional } from '@/features/browser/models';
import { useSharedStore } from '@/shared/models';

export const useFoundationLibrary = () => {
  const { currentUniv, currentService } = useSharedStore(
    useShallow((state) => ({
      currentService: state.currentService,
      currentUniv: state.currentUniv,
    }))
  );
  const initialPath = useMemo(
    () => `${BROWSER_PATH.foundationLibrary}/${currentService?.serviceID}`,
    [currentService]
  );

  const containerTitle = `${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 자료실`;

  const browserOption: BrowserOptionOptional = useMemo(() => {
    return {
      itemAppearance: 'card',
    };
  }, []);

  return {
    initialPath,
    containerTitle,
    browserOption,
  };
};
