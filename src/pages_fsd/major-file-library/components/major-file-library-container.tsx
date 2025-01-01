'use client';

import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { Browser } from '@/features/browser/components';
import { BROWSER_PATH } from '@/features/browser/constants';
import { ContentWrapper } from '@/shared/components';
import { useUser } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useUploadMajorFileMutation } from '../hooks';

export const MajorFileLibraryContainer = () => {
  const { user } = useUser();
  const { currentUniv } = useSharedStore();
  const mutation = useUploadMajorFileMutation();
  const [formData] = useState<FormData>(new FormData());

  const initialPath = useMemo(
    () => `${BROWSER_PATH.subjectLibrary}/${currentUniv?.univID}`,
    [currentUniv]
  );

  const title = `${currentUniv?.univName} 학과 자료실`;

  useEffect(() => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', currentUniv?.univID ?? '');
  }, [user, currentUniv]);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="h4" textAlign={'left'} flexGrow={1}>
            {title}
          </Typography>
        </Stack>
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Browser
          initialPath={initialPath}
          showCurrentPath
          isDropZone={true}
          formData={formData}
          uploadMutation={mutation}
          appendDirectory
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
