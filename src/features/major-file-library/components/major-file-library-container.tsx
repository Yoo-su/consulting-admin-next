'use client';

import { useState } from 'react';
import BrowsedListBox from '@/shared/components/ui/browsed-list-box';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';
import { Stack, Typography } from '@mui/material';

const MajorFileLibraryContainer = () => {
  const { currentUniv } = useUnivService();
  const [initialPath] = useState<string>(`subject-reflibrary/${currentUniv?.univID}`);

  const title = `${currentUniv?.univName} 학과 자료실`;

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
        <BrowsedListBox initialPath={initialPath} isDropZone={true} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileLibraryContainer;
