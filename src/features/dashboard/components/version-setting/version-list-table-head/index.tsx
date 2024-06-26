import { TableRow, TableCell, Stack, Typography, Tooltip, Box } from '@mui/material';
import { ArrowUpButtonClass, TableCellClass } from '../version-list-table';
import { MouseEvent } from 'react';
import ArrowUpIconButton from '@/shared/components/arrow-up-icon-button';

type VersionListTableHeadProps = {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
const VersionListTableHead = ({ handleClick }: VersionListTableHeadProps) => {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold', ...TableCellClass }}>서비스 테이블</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold', ...TableCellClass }}>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'end'}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            버전 일괄 추가
          </Typography>
          <Tooltip title="전체 버전을 1씩 추가합니다." placement="top">
            <Box>
              <ArrowUpIconButton
                props={{
                  onClick: handleClick,
                  id: 'all',
                  sx: { ...ArrowUpButtonClass, backgroundColor: '#FAFAFA' },
                }}
              />
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default VersionListTableHead;
