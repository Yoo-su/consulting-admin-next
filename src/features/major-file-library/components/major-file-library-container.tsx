'use client';

import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import Browser from '@/shared/components/ui/browser';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService, useUser } from '@/shared/hooks/context';
import { useUploadMajorFileMutation } from '@/features/major-file-upload/hooks';

const MajorFileLibraryContainer = () => {
  const { user } = useUser();
  const { currentUniv } = useUnivService();
  const mutation = useUploadMajorFileMutation();
  const [initialPath] = useState<string>(`subject-reflibrary/${currentUniv?.univID}`);
  const [formData] = useState<FormData>(new FormData());

  const title = `${currentUniv?.univName} 학과 자료실`;

  useEffect(() => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', currentUniv?.univID ?? '');
  }, [user, currentUniv]);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="h6" textAlign={'left'} flexGrow={1}>
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
          uploadDirectory
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileLibraryContainer;
