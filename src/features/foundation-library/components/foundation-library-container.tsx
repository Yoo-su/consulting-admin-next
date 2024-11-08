'use client';

import { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import Browser from '@/shared/components/ui/browser';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';
import { BROWSER_PATH } from '@/shared/constants';

const FoundationLibraryContainer = () => {
  const { currentUniv, currentService } = useUnivService();
  const [initialPath] = useState<string>(`${BROWSER_PATH.foundationLibrary}/${currentService?.serviceID}`);

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
