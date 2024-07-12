'use client';

import { useState } from 'react';

import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useGetAppVersionHistoryQuery } from '../../hooks/tanstack/use-get-app-version-history-query';
import AppPWAContainer from './app-pwa-container';
import AppProgContainer from './app-prog-container';
import HeaderSelectRadio from './header-select-radio';

export type ConsultingAppType = 'O' | 'A' | 'P';

const AppHistoryListBox = () => {
  const { currentService } = useUnivService();
  const isNew = currentService?.isNew ?? false;

  const [appType, setAppType] = useState<ConsultingAppType>(isNew ? 'A' : 'O');
  const { data: histories } = useGetAppVersionHistoryQuery(currentService?.serviceID, appType === 'O' ? null : appType);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <HeaderSelectRadio appType={appType} setAppType={setAppType} isNew={isNew} />
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        {appType == 'O' ? <AppPWAContainer /> : <AppProgContainer histories={histories} />}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default AppHistoryListBox;
