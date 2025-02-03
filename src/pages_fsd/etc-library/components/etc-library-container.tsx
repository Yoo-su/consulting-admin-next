'use client';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useEtcLibrary, useUploadEtcLibraryMutation } from '../hooks';

export const EtcLibraryContainer = () => {
  const { initialPath, browserOption, containerTitle, formData } = useEtcLibrary();
  const mutation = useUploadEtcLibraryMutation();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <ContentWrapper.Title title={containerTitle} />
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Browser
          initialPath={initialPath}
          browserOption={browserOption}
          uploadMutation={mutation}
          formData={formData}
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
