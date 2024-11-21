'use client';

import { Typography } from '@mui/material';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';

import CalculationSettingDialog from './calculation-setting-dialog';
import CurrentSettingOverview from './current-setting-overview';

const CalculationSettingContainer = () => {
  const { currentUniv, currentService } = useUnivService();

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant={'h4'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 성적 계산 설정`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <CurrentSettingOverview serviceID={currentService?.serviceID ?? ''} />
      </ContentWrapper.MainContent>
      <CalculationSettingDialog />
    </ContentWrapper>
  );
};

export default CalculationSettingContainer;
