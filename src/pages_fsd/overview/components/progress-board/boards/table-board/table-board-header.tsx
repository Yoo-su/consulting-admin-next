import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { memo } from 'react';

import { TABLE_HEADER_CELLS } from '@/pages_fsd/overview/constants';
import { TableBoardType } from '@/pages_fsd/overview/models';

type TableBoardHeaderProps = {
  order: 'asc' | 'desc';
  orderBy: keyof TableBoardType;
  handleRequestSort: (property: keyof TableBoardType) => void;
};
export const TableBoardHeader = memo(({ order, orderBy, handleRequestSort }: TableBoardHeaderProps) => {
  const createSortHandler = (property: keyof TableBoardType) => () => {
    handleRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER_CELLS.map((headerCell) => {
          return (
            <TableCell
              key={headerCell.id}
              align={headerCell.align}
              sortDirection={orderBy === headerCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headerCell.id}
                direction={orderBy === headerCell.id ? order : 'asc'}
                onClick={createSortHandler(headerCell.id)}
              >
                {headerCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
});
TableBoardHeader.displayName = 'TableBoardHeader';
