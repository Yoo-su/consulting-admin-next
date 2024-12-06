'use client';

import { Typography } from '@mui/material';

import { ContentWrapper } from '@/shared/components';
import { useUnivService } from '@/shared/hooks/context';

import { CalculationSettingDialog } from './calculation-setting-dialog';
import SettingsOverview from './settings-overview';

export const CalculationSettingContainer = () => {
  const { currentUniv, currentService } = useUnivService();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant={'h4'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 성적 계산 설정`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <SettingsOverview serviceID={currentService?.serviceID ?? ''} />
      </ContentWrapper.MainContent>
      <CalculationSettingDialog serviceID={currentService?.serviceID ?? ''} />
    </ContentWrapper>
  );
};
