'use client';

import { useState } from 'react';

import { ContentWrapper } from '@/shared/components';
import { useUnivService } from '@/shared/hooks/context/use-univ-service';

import { useGetAppVersionHistoryQuery } from '../hooks';
import { ConsultingAppType } from '../models';
import { AppProgContainer } from './app-prog-container';
import { AppPWAContainer } from './app-pwa-container';
import { HeaderSelectRadio } from './header-select-radio';

export const AppHistoryListContainer = () => {
  const { currentService } = useUnivService();
  const isNew = currentService?.isNew ?? false;

  const [appType, setAppType] = useState<ConsultingAppType>(isNew ? 'A' : 'O');
  const { data: histories } = useGetAppVersionHistoryQuery(
    currentService?.serviceID,
    appType === 'O' ? null : appType
  );

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <HeaderSelectRadio
          appType={appType}
          setAppType={setAppType}
          isNew={isNew}
        />
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        {appType == 'O' ? (
          <AppPWAContainer />
        ) : (
          <AppProgContainer histories={histories} />
        )}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
