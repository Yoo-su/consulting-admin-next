'use client';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Fragment, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import theme from '@/shared/style/theme';

type Props = {
  children: ReactNode;
};
export const AppThemeProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
      <Toaster />
    </Fragment>
  );
};
