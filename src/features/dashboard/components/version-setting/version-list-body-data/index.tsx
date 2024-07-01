import { MouseEvent } from 'react';

import { TableRow, TableCell, Stack, Typography, Tooltip, Box } from '@mui/material';
import { CurTBLVersion } from '@/features/dashboard/types/service-version.type';
import { ArrowUpButtonClass, TableCellClass } from '../version-list-table';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ButtonIcon from '@/shared/components/button-icon';

type VersionListDataProps = {
  editedList: CurTBLVersion[];
  versionList: CurTBLVersion[];
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
const VersionListBodyData = ({ editedList, versionList, handleClick }: VersionListDataProps) => {
  if (editedList.length === 0) {
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
  }
  return (
    <>
      {editedList?.map((version, index) => {
        return (
          <TableRow key={version.TableName} sx={{ height: editedList.length < 6 ? `${200 / editedList.length}px` : 0 }}>
            <TableCell sx={TableCellClass}>{version.TableName}</TableCell>
            <TableCell sx={TableCellClass} align="right">
              <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={1}>
                <Typography variant="caption">{version.Version}</Typography>
                <Tooltip title="버전을 1씩 추가합니다." placement="top">
                  <Box>
                    <ButtonIcon
                      props={{
                        onClick: handleClick,
                        id: version.TableName,
                        sx: ArrowUpButtonClass,
                        disabled: versionList[index].Version !== version.Version,
                      }}
                      Icon={ArrowDropUpIcon}
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
