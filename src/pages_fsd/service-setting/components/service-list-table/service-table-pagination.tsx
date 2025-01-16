import { TablePagination } from '@mui/material';
import { ChangeEvent,Dispatch, MouseEvent, SetStateAction } from 'react';

type ServiceTablePaginationProps = {
  count: number | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
};

export const ServiceTablePagination = ({
  count = 0,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: ServiceTablePaginationProps) => {
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={'페이지 당 아이템 수'}
    />
  );
};
