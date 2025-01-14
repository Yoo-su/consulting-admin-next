'use client';

import { Stack, Typography } from '@mui/material';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useMajorFileLibrary, useUploadMajorFileMutation } from '../hooks';

export const MajorFileLibraryContainer = () => {
  const { containerTitle, initialPath, browserOption, formData } =
    useMajorFileLibrary();
  const mutation = useUploadMajorFileMutation();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="h4" textAlign={'left'} flexGrow={1}>
            {containerTitle}
          </Typography>
        </Stack>
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Browser
          initialPath={initialPath}
          browserOption={browserOption}
          formData={formData}
          uploadMutation={mutation}
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
