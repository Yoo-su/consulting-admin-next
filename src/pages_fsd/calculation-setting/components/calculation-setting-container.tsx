'use client';

import { Typography } from '@mui/material';

import { ContentWrapper } from '@/shared/components';
import { useSharedStore } from '@/shared/models';

import { CalculationSettingDialog } from './calculation-setting-dialog';
import { SettingsOverview } from './settings-overview';

export const CalculationSettingContainer = () => {
  const currentUniv = useSharedStore((state) => state.currentUniv);
  const currentService = useSharedStore((state) => state.currentService);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant={'h4'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 성적 계산 설정`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <SettingsOverview />
      </ContentWrapper.MainContent>
      <CalculationSettingDialog serviceID={currentService?.serviceID ?? ''} />
    </ContentWrapper>
  );
};
