'use client';

import { Typography } from '@mui/material';

import { Browser } from '@/features/browser/components';
import { ContentWrapper } from '@/shared/components';

import { useEtcLibrary,useUploadEtcLibraryMutation } from '../hooks';

export const EtcLibraryContainer = () => {
  const { downmd, initialPath, browserOption, containerTitle, formData } =
    useEtcLibrary();
  const mutation = useUploadEtcLibraryMutation();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant="h4"
          sx={{
            ...(downmd && {
              width: '75%',
              fontSize: '16px',
            }),
          }}
        >
          {containerTitle}
        </Typography>
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
