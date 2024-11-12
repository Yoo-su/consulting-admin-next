import { MouseEvent, memo } from 'react';
import { TableRow, TableCell, Stack, Typography, Tooltip, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ArrowButtonClass, TableCellClass } from './version-list-table';
import ButtonIcon from '@/shared/components/ui/button-icon';

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
            전체 버전 관리
          </Typography>
          <Tooltip title="전체 버전을 1씩 내립니다." placement="top">
            <Box>
              <ButtonIcon
                onClick={handleClick}
                id={'all-down'}
                sx={{ ...ArrowButtonClass, backgroundColor: '#FAFAFA' }}
                Icon={ArrowDropDownIcon}
              />
            </Box>
          </Tooltip>
          <Tooltip title="전체 버전을 1씩 추가합니다." placement="top">
            <Box>
              <ButtonIcon
                onClick={handleClick}
                id={'all-up'}
                sx={{ ...ArrowButtonClass, backgroundColor: '#FAFAFA' }}
                Icon={ArrowDropUpIcon}
              />
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default memo(VersionListTableHead);
