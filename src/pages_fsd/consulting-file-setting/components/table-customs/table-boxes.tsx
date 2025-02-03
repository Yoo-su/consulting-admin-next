'use client';

import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

import { TableBoxStyle, TableContainerBoxStyle } from '../../constants';

export const TableContainerBox = ({ children }: PropsWithChildren) => {
  return <Box sx={TableContainerBoxStyle}>{children}</Box>;
};

export const TableBox = ({ children }: PropsWithChildren) => {
  return <Box sx={TableBoxStyle}>{children}</Box>;
};
