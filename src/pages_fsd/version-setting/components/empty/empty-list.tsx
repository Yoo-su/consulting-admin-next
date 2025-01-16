import { TableCell, TableRow, Typography } from '@mui/material';

export const EmptyList = () => {
  return (
    <TableRow sx={{ height: '200px' }}>
      <TableCell colSpan={2}>
        <Typography align="center">
          데이터가 없습니다.
          <br />
          (기초를 업로드 해주세요.)
        </Typography>
      </TableCell>
    </TableRow>
  );
};
