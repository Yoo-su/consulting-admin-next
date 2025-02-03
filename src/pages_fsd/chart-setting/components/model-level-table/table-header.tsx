import { TableCell, TableHead, TableRow } from '@mui/material';
import { memo } from 'react';

import { TABLE_HEADER_CELLS } from '../../constants';

export const LevelTableHeader = memo(() => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER_CELLS.map((cell, idx) => (
          <TableCell key={cell} align={idx === 0 ? 'left' : 'right'}>
            {cell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});
LevelTableHeader.displayName = 'LevelTableHeader';
