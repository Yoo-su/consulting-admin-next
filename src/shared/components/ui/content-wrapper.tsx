import { Box, Divider, Stack, SxProps, Typography, TypographyVariant, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
  bottomDivider?: boolean;
  sxProps?: SxProps;
};
export const Header = ({ children, bottomDivider, sxProps }: HeaderProps) => {
  return (
    <>
      <Stack width={'100%'} sx={{ ...sxProps }}>
        {children}
      </Stack>
      {bottomDivider && <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.05)' }} />}
    </>
  );
};

type TitleProps = {
  title: string;
  variant?: TypographyVariant;
};
export const Title = ({ title, variant = 'h4' }: TitleProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Typography
      variant={variant}
      sx={{
        ...(downmd && {
          width: '75%',
          fontSize: '16px',
        }),
      }}
    >
      {title}
    </Typography>
  );
};

type MainContentProps = {
  children: ReactNode;
  sxProps?: SxProps;
};
const MainContent = ({ children, sxProps }: MainContentProps) => {
  return <Box sx={{ ...sxProps }}>{children}</Box>;
};

type ContentWrapperProps = {
  children: ReactNode;
  sxProps?: SxProps;
};
export const ContentWrapper = ({ children, sxProps }: ContentWrapperProps) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        p: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        ...sxProps,
      }}
    >
      <Box width={'100%'}>{children}</Box>
    </Stack>
  );
};

ContentWrapper.Header = Header;
ContentWrapper.Title = Title;
ContentWrapper.MainContent = MainContent;
