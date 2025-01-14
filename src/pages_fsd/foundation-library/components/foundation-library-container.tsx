'use client';

import { Stack, Typography } from '@mui/material';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useFoundationLibrary } from '../hooks';

export const FoundationLibraryContainer = () => {
  const { containerTitle, initialPath, browserOption } = useFoundationLibrary();

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
        <Browser initialPath={initialPath} browserOption={browserOption} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
