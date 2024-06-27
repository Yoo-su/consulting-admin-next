import { MouseEvent } from 'react';
import { TableRow, TableCell, Stack, Typography, Tooltip, Box } from '@mui/material';
import { ArrowUpButtonClass, TableCellClass } from '../version-list-table';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ButtonIcon from '@/shared/components/button-icon';
import { CurTBLVersion } from '@/features/dashboard/types/service-version.type';

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
              <ButtonIcon
                props={{
                  onClick: handleClick,
                  id: 'all',
                  sx: { ...ArrowUpButtonClass, backgroundColor: '#FAFAFA' },
                }}
                Icon={ArrowDropUpIcon}
              />
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default VersionListTableHead;
