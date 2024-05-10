'use client';

import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useUnivService } from '@/shared/hooks/use-univ-service';

type ServiceCheckGuardProps = {
  children: ReactNode;
};
const UnivServiceCheckGuard = ({ children }: ServiceCheckGuardProps) => {
  const { currentService } = useUnivService();

  if (!currentService)
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alert color="info" icon={<InfoOutlinedIcon />}>
          대학 및 서비스가 선택되지 않았습니다. 사이드바에서 값을 선택해주세요
        </Alert>
      </Container>
    );

  return children;
};

export default UnivServiceCheckGuard;
