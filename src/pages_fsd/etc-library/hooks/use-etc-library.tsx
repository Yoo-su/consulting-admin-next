import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { BROWSER_PATH } from '@/features/browser/constants';
import { BrowserOptionOptional } from '@/features/browser/models';
import { useUser } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

export const useEtcLibrary = () => {
  const { currentUniv, currentService } = useSharedStore(
    useShallow((state) => ({
      currentService: state.currentService,
      currentUniv: state.currentUniv,
    }))
  );
  const { user } = useUser();

  const containerTitle = `${currentUniv?.univName}(${currentService?.serviceID}) 기타 자료실`;

  const initialPath = useMemo(() => `${BROWSER_PATH.etcLibrary}/${currentService?.serviceID}`, [currentService]);
  const browserOption: BrowserOptionOptional = useMemo(() => {
    return { isDropZone: true };
  }, [currentService]);

  const [formData] = useState(new FormData());

  useEffect(() => {
    formData.set('userID', user?.sub ?? '');
    formData.set('serviceID', currentService?.serviceID ?? '');
  }, [user, currentService]);

  return {
    containerTitle,
    initialPath,
    browserOption,
    formData,
  };
};
