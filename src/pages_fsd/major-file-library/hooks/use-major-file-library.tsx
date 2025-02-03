import { useEffect, useMemo, useState } from 'react';

import { BROWSER_PATH } from '@/features/browser/constants';
import { BrowserOptionOptional } from '@/features/browser/models';
import { useUser } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

export const useMajorFileLibrary = () => {
  const { user } = useUser();
  const currentUniv = useSharedStore((state) => state.currentUniv);
  const [formData] = useState<FormData>(new FormData());

  const initialPath = useMemo(() => `${BROWSER_PATH.subjectLibrary}/${currentUniv?.univID}`, [currentUniv]);

  const browserOption: BrowserOptionOptional = useMemo(
    () => ({
      isDropZone: true,
      showCurrentPath: true,
      appendDirectory: true,
      itemAppearance: 'card',
    }),
    []
  );

  const containerTitle = `${currentUniv?.univName} 학과 자료실`;

  useEffect(() => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', currentUniv?.univID ?? '');
  }, [user, currentUniv]);

  return {
    containerTitle,
    initialPath,
    browserOption,
    formData,
  };
};
