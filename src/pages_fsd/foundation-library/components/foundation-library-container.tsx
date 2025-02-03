'use client';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useFoundationLibrary } from '../hooks';

export const FoundationLibraryContainer = () => {
  const { containerTitle, initialPath, browserOption } = useFoundationLibrary();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <ContentWrapper.Title title={containerTitle} />
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Browser initialPath={initialPath} browserOption={browserOption} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
