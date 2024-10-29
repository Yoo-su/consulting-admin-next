'use client';

import { Fragment, useState } from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';

import EmptyBox from '@/shared/components/ui/empty-box';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import ContentLoadingSkeleton from '@/shared/components/ui/loadings/loading-skeleton';

import { useUnivService } from '@/shared/hooks/context';
import { useGetEtcLibrariesQuery, useHandleEtcLibrary } from '../hooks';

import Browser from '@/shared/components/ui/browser';

const EtcLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { data: etcLibraries, isLoading } = useGetEtcLibrariesQuery(currentService?.serviceID);

  const [initialPath, setInitialPath] = useState(`etc-library/${currentService?.serviceID}`);

  return (
    <ContentWrapper>
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
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
            <Browser initialPath={initialPath} />
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default EtcLibraryContainer;
