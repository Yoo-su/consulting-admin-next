'use client';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { Gowun_Batang } from 'next/font/google';

const gowun_batang = Gowun_Batang({ subsets: ['latin'], weight: ['400'] });

const theme = extendTheme({
  typography: {
    fontFamily: gowun_batang.style.fontFamily,
  },
});

export default theme;
