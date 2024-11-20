'use client';

import { Typography } from '@mui/material';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import { useUnivService } from '@/shared/hooks/context';

import {
  useGetCalcConfigQuery,
  useGetCalcConversionTableQuery,
  useGetCalcMethodQuery,
} from '../hooks';

const CalculationSettingContainer = () => {
  const { currentUniv, currentService } = useUnivService();
  const { data: calcConfig } = useGetCalcConfigQuery(
    currentService?.serviceID ?? ''
  );
  const { data: calcMethod } = useGetCalcMethodQuery(
    currentService?.serviceID ?? ''
  );
  const { data: conversionTable } = useGetCalcConversionTableQuery(
    currentService?.serviceID ?? ''
  );

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Typography
          variant={'h6'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 성적 계산 설정`}</Typography>
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>main</ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default CalculationSettingContainer;
