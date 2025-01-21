import { Stack, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

type BannerUtilBoxProps = {
  children: ReactNode;
};
const Utils = ({ children }: BannerUtilBoxProps) => {
  return (
    <Stack direction={'row'} spacing={0.5}>
      {children}
    </Stack>
  );
};

type LevelTableTopBannerProps = {
  level: number;
  children: ReactNode;
};
export const LevelTableTopBanner = ({
  level,
  children,
}: LevelTableTopBannerProps) => {
  const levelTitle = `단계 ${level}`;
  return (
    <Wrapper>
      <Stack direction={'row'} spacing={1} alignItems="center">
        <Typography variant="body2" fontSize={16}>
          {levelTitle}
        </Typography>
      </Stack>
      {children}
    </Wrapper>
  );
};
LevelTableTopBanner.Utils = Utils;

const Wrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
}));
