'use client';

import { useState } from 'react';

import { ContentWrapper } from '@/shared/components';
import { useSharedStore } from '@/shared/models';

import { OS_TYPE } from '../constants';
import { useGetAppVersionHistoryQuery } from '../hooks';
import { ConsultingAppType } from '../models';
import { HeaderSelectRadio } from './app-header';
import { AppProgContainer } from './app-prog-containers';
import { AppPWAContainer } from './app-pwa-containers';

export const AppHistoryListContainer = () => {
  const { currentService } = useSharedStore();
  const isNew = currentService?.isNew ?? false;

  const [appType, setAppType] = useState<ConsultingAppType>(
    isNew ? OS_TYPE.APK : OS_TYPE.PWA
  );
  const { data: histories } = useGetAppVersionHistoryQuery(
    currentService?.serviceID,
    appType === OS_TYPE.PWA ? null : appType
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
        {appType == OS_TYPE.PWA ? (
          <AppPWAContainer />
        ) : (
          <AppProgContainer histories={histories} />
        )}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
