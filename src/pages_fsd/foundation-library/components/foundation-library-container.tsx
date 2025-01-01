'use client';

import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Browser } from '@/features/browser/components';
import { BROWSER_PATH } from '@/features/browser/constants';
import { ContentWrapper } from '@/shared/components';
import { useSharedStore } from '@/shared/models';

export const FoundationLibraryContainer = () => {
  const { currentUniv, currentService } = useSharedStore();
  const initialPath = useMemo(
    () => `${BROWSER_PATH.foundationLibrary}/${currentService?.serviceID}`,
    [currentService]
  );

  const title = `${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 자료실`;

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
        <Browser initialPath={initialPath} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
