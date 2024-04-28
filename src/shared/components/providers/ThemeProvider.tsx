import { ReactNode } from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from '../../style/theme';

type Props = {
  children: ReactNode;
};
const AppThemeProvider = ({ children }: Props) => {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

export default AppThemeProvider;
