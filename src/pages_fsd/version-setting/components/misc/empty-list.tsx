import { TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { TableBodyClass } from '../../constants';

export const EmptyList = () => {
  return (
    <TableBody sx={TableBodyClass}>
      <TableRow sx={{ height: '200px' }}>
        <TableCell colSpan={2}>
          <Typography align="center">
            데이터가 없습니다.
            <br />
            (기초를 업로드 해주세요.)
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
