'use client';

import { useState } from 'react';
import BrowsedListBox from '@/shared/components/ui/browsed-list-box';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';
import { Stack, Typography } from '@mui/material';

const MajorFileLibraryContainer2 = () => {
  const { currentUniv, currentService } = useUnivService();
  const [initialPath] = useState<string>(`foundation-library/${currentService?.serviceID}`);

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
        <BrowsedListBox initialPath={initialPath} showCurrentPath={false} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileLibraryContainer2;
