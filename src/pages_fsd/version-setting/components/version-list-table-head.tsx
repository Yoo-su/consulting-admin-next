'use client';

import {
  Stack,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Dispatch, memo, MouseEvent } from 'react';

import { allArrowButtonList, TableCellClass } from '../constants';
import { ActionType } from '../services';
import { ArrowIconButton } from './arrow-icon-button';

type VersionListTableHeadProps = {
  dispatch: Dispatch<ActionType>;
};
export const VersionListTableHead = memo(
  ({ dispatch }: VersionListTableHeadProps) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const [_, arrowDirection] = event.currentTarget.id.split('-');
      const type =
        arrowDirection === 'up' ? 'ADD_ALL_VERSION' : 'SUB_ALL_VERSION';
      dispatch({ type });
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold', ...TableCellClass }}>
            서비스 테이블
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: 'bold', ...TableCellClass }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              justifyContent={'end'}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                전체 버전 관리
              </Typography>
              {allArrowButtonList.map((button, index) => (
                <ArrowIconButton
                  key={index}
                  handleClick={handleClick}
                  {...button}
                />
              ))}
            </Stack>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
);

VersionListTableHead.displayName = 'VersionListTableHead';
