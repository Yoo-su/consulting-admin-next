'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Box)({
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '1rem 2rem',
});

const DataDeployBox = () => {
  return (
    <Stack
      direction={'column'}
      spacing={3}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        p: 6,
        borderRadius: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledButton>
        <Typography>테스트 배포</Typography>
      </StyledButton>

      <StyledButton>
        <Typography>리얼 배포</Typography>
      </StyledButton>
    </Stack>
  );
};

export default DataDeployBox;
