'use client';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useMajorFileLibrary, useUploadMajorFileMutation } from '../hooks';

export const MajorFileLibraryContainer = () => {
  const { containerTitle, initialPath, browserOption, formData } = useMajorFileLibrary();
  const mutation = useUploadMajorFileMutation();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <ContentWrapper.Title title={containerTitle} />
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
