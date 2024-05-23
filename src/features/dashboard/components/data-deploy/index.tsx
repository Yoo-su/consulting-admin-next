'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BounceLoader from 'react-spinners/BounceLoader';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useUnivService } from '../../hooks/use-univ-service';

const StyledButton = styled(Box)({
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3rem 2rem',
  cursor: 'pointer',
  '&:active': {
    transform: 'scale(1.05)',
  },
  width: '100%',
  transition: 'transform 0.1s ease-in-out',
});

const DataDeployBox = () => {
  const { currentService, currentUniv } = useUnivService();

  const [isTestDeploying, setIsTestDeploying] = useState(false);
  const [isRealDeploying, setIsRealDeploying] = useState(false);
  const theme = useTheme();
  const upmd = useMediaQuery(theme.breakpoints.up('md'));

  const handleTestClick = () => {
    setIsTestDeploying(true);
    setTimeout(() => {
      setIsTestDeploying(false);
    }, 3000);
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        p: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
      }}
    >
      <Typography variant="h6">{`${currentUniv?.univName}(${currentService?.serviceID}) 데이터 배포`}</Typography>
      <Stack
        direction={upmd ? 'row' : 'column'}
        spacing={3}
        sx={{
          mt: 4,
          p: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledButton onClick={handleTestClick}>
          {isTestDeploying ? <BounceLoader /> : <Typography variant="h6">테스트 배포</Typography>}
        </StyledButton>

        <StyledButton>
          <Typography variant="h6">리얼 배포</Typography>
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default DataDeployBox;
