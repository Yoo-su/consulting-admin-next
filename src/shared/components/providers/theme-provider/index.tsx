'use client';

import { ReactNode, Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from '@/shared/style/theme';

type Props = {
  children: ReactNode;
};
const AppThemeProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
      <Toaster />
    </Fragment>
  );
};

export default AppThemeProvider;
