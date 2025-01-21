import { TableCell, TableHead, TableRow } from '@mui/material';
import { memo } from 'react';

export const LevelTableHeader = memo(() => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>label</TableCell>
        <TableCell align="right">차트 label</TableCell>
        <TableCell align="right">비율(%)</TableCell>
        <TableCell align="right">삭제</TableCell>
      </TableRow>
    </TableHead>
  );
});
LevelTableHeader.displayName = 'LevelTableHeader';
