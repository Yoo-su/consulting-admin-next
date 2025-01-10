'use client';

import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { Browser } from '@/features/browser/components';
import { BROWSER_PATH } from '@/features/browser/constants';
import { BrowserOptionOptional } from '@/features/browser/models';
import { ContentWrapper } from '@/shared/components';
import { useUser } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useUploadEtcLibraryMutation } from '../hooks';

export const EtcLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useSharedStore();
  const { user } = useUser();
  const mutation = useUploadEtcLibraryMutation();

  const initialPath = useMemo(
    () => `${BROWSER_PATH.etcLibrary}/${currentService?.serviceID}`,
    [currentService]
  );
  const browserOption: BrowserOptionOptional = useMemo(() => {
    return { isDropZone: true };
  }, [currentService]);

  const [formData] = useState(new FormData());

  useEffect(() => {
    formData.set('userID', user?.sub ?? '');
    formData.set('serviceID', currentService?.serviceID ?? '');
  }, [user, currentService]);

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
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 기타 자료실`}</Typography>
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
