'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Fragment, PropsWithChildren } from 'react';

import AppHeader from './app-header';
import AppSidebar from './app-sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--AppHeader-height': '56px',
            '--AppHeader-zIndex': 1000,
            '--AppSidebar-width': '280px',
            '--AppSidebar-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <AppSidebar />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: 'var(--AppSidebar-width)' },
          }}
        >
          <AppHeader />
          <main>
            <Container maxWidth="lg" sx={{ py: '32px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </Fragment>
  );
};

export default DashboardLayout;
