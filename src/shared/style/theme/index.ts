'use client';

import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { Gowun_Batang, Gowun_Dodum, Hahmlet, IBM_Plex_Sans_KR, Nanum_Gothic, Nanum_Myeongjo } from 'next/font/google';

const gowun_batang = Gowun_Batang({ subsets: ['latin'], weight: ['400'] });
const hahmlet = Hahmlet({ subsets: ['latin'], weight: ['400'] });
const ibm_kr = IBM_Plex_Sans_KR({ subsets: ['latin'], weight: ['200'] });
const gowun_dodum = Gowun_Dodum({ subsets: ['latin'], weight: ['400'] });
const nanum_gothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'] });
const nanum_myeongjo = Nanum_Myeongjo({ subsets: ['latin'], weight: ['400'] });

export const theme = extendTheme({
  typography: {
    h6: {
      fontFamily: ibm_kr.style.fontFamily,
      fontWeight: ibm_kr.style.fontWeight,
    },
    h5: {
      fontFamily: gowun_dodum.style.fontFamily,
      fontWeight: gowun_dodum.style.fontWeight,
    },
    h4: {
      fontFamily: ibm_kr.style.fontFamily,
      fontWeight: ibm_kr.style.fontWeight,
    },
    h3: {
      fontFamily: ibm_kr.style.fontFamily,
      fontWeight: ibm_kr.style.fontWeight,
    },
    h2: {
      fontFamily: ibm_kr.style.fontFamily,
      fontWeight: ibm_kr.style.fontWeight,
    },
    h1: {
      fontFamily: ibm_kr.style.fontFamily,
      fontWeight: ibm_kr.style.fontWeight,
    },
    body1: {
      fontFamily: gowun_dodum.style.fontFamily,
    },
    body2: {
      fontFamily: gowun_dodum.style.fontFamily,
    },
    caption: {
      fontFamily: nanum_gothic.style.fontFamily,
    },
    button: {
      fontFamily: ibm_kr.style.fontFamily,
    },
  },
});
