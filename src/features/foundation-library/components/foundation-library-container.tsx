'use client';

import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import Browser from '@/shared/components/ui/browser';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { BROWSER_PATH } from '@/shared/constants';
import { useUnivService } from '@/shared/hooks/context';

const FoundationLibraryContainer = () => {
  const { currentUniv, currentService } = useUnivService();
  const initialPath = useMemo(
    () => `${BROWSER_PATH.foundationLibrary}/${currentService?.serviceID}`,
    [currentService]
  );

  const title = `${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 자료실`;

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
        <Browser initialPath={initialPath} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default FoundationLibraryContainer;
