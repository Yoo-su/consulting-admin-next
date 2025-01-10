'use client';

import { useState } from 'react';

import { ContentWrapper } from '@/shared/components';
import { useSharedStore } from '@/shared/models';

import { OsType } from '../constants';
import { useGetAppVersionHistoryQuery } from '../hooks';
import { ConsultingAppType } from '../models';
import { AppProgContainer } from './app-prog-container';
import { AppPWAContainer } from './app-pwa-container';
import { HeaderSelectRadio } from './header-select-radio';

export const AppHistoryListContainer = () => {
  const { currentService } = useSharedStore();
  const isNew = currentService?.isNew ?? false;

  const [appType, setAppType] = useState<ConsultingAppType>(
    isNew ? OsType.APK : OsType.PWA
  );
  const { data: histories } = useGetAppVersionHistoryQuery(
    currentService?.serviceID,
    appType === OsType.PWA ? null : appType
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
        {appType == OsType.PWA ? (
          <AppPWAContainer />
        ) : (
          <AppProgContainer histories={histories} />
        )}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};
