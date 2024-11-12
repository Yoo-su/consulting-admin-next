'use client';

import { useEffect, useState, useMemo } from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import Browser from '@/shared/components/ui/browser';
import { useUnivService, useUser } from '@/shared/hooks/context';
import { useUploadEtcLibraryMutation } from '../hooks';
import { BROWSER_PATH } from '@/shared/constants';

const EtcLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { user } = useUser();
  const mutation = useUploadEtcLibraryMutation();

  const initialPath = useMemo(() => `${BROWSER_PATH.etcLibrary}/${currentService?.serviceID}`, [currentService]);
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
        <Browser initialPath={initialPath} isDropZone uploadMutation={mutation} formData={formData} />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default EtcLibraryContainer;
