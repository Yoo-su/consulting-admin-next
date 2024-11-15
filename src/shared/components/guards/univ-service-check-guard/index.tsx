'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ReactNode, useMemo } from 'react';

import { useUnivService } from '@/shared/hooks/context';

type ServiceCheckGuardProps = {
  children: ReactNode;
  checkService?: boolean;
};
const UnivServiceCheckGuard = ({
  children,
  checkService = true,
}: ServiceCheckGuardProps) => {
  const { currentUniv, currentService } = useUnivService();

  const checkFlag = useMemo(() => {
    return checkService ? currentUniv && currentService : currentUniv;
  }, [currentUniv, currentService]);

  if (!checkFlag)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Alert color="info" icon={<InfoOutlinedIcon />}>
          대학 및 서비스가 선택되지 않았습니다. 사이드바에서 값을 선택해주세요
        </Alert>
      </Box>
    );

  return children;
};

export default UnivServiceCheckGuard;
