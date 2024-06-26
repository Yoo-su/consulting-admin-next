import { MouseEvent } from 'react';

import { TableRow, TableCell, Stack, Typography, Tooltip, Box } from '@mui/material';
import { CurTBLVersion } from '@/features/dashboard/types/service-version.type';
import { ArrowUpButtonClass, TableCellClass } from '../version-list-table';
import ArrowUpIconButton from '@/shared/components/arrow-up-icon-button';

type VersionListDataProps = {
  editedList: CurTBLVersion[];
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
const VersionListBodyData = ({ editedList, handleClick }: VersionListDataProps) => {
  return (
    <>
      {editedList?.map((version) => {
        return (
          <TableRow key={version.TableName}>
            <TableCell sx={TableCellClass}>{version.TableName}</TableCell>
            <TableCell sx={TableCellClass} align="right">
              <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={1}>
                <Typography variant="caption">{version.Version}</Typography>
                <Tooltip title="버전을 1씩 추가합니다." placement="top">
                  <Box>
                    <ArrowUpIconButton
                      props={{
                        onClick: handleClick,
                        id: version.TableName,
                        sx: ArrowUpButtonClass,
                      }}
                    />
                  </Box>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default VersionListBodyData;

const TableBodyClass = {
  '& .MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      backgroundColor: '#FDFDFD',
    },
  },
};
