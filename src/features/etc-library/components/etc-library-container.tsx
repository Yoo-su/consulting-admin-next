'use client';

import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import Browser from '@/shared/components/ui/browser';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { BROWSER_PATH } from '@/shared/constants';
import { useUnivService, useUser } from '@/shared/hooks/context';

import { useUploadEtcLibraryMutation } from '../hooks';

const EtcLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { user } = useUser();
  const mutation = useUploadEtcLibraryMutation();

  const initialPath = useMemo(
    () => `${BROWSER_PATH.etcLibrary}/${currentService?.serviceID}`,
    [currentService]
  );
  const [formData] = useState(new FormData());

  useEffect(() => {
    formData.set('userID', user?.sub ?? '');
    formData.set('serviceID', currentService?.serviceID ?? '');
  }, [user, currentService]);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant="h6"
          sx={{
            ...(downmd && {
              width: '75%',
              fontSize: '16px',
            }),
          }}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 기타 자료 목록`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Browser
          initialPath={initialPath}
          isDropZone
          uploadMutation={mutation}
          formData={formData}
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default EtcLibraryContainer;
