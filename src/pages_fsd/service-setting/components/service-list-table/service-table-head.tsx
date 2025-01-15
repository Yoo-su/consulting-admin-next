import { TableCell, TableHead, TableRow } from '@mui/material';
import { ServiceTableHeader } from '../../constants';

export const ServiceTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {ServiceTableHeader.map((header) => (
          <TableCell
            key={header.value}
            align={header.align ? header.align : 'left'}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
