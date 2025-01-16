'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Dispatch, MouseEvent } from 'react';

import { ButtonIcon } from '@/shared/components/ui/button-icon';

import { ArrowButtonClass, TableBodyClass, TableCellClass } from '../constants';
import { MIN_LIST_LENGTH } from '../constants';
import { CurTBLVersion } from '../models';
import { ActionType } from '../services';

type VersionListDataProps = {
  editedList: CurTBLVersion[];
  dispatch: Dispatch<ActionType>;
};
export const VersionListBodyData = ({
  editedList,
  dispatch,
}: VersionListDataProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const [tableName, arrowDirection] = event.currentTarget.id.split('-');
    const targetIndex = editedList.findIndex(
      (version) => version.TableName === tableName
    );
    const type = arrowDirection === 'up' ? 'ADD_VERSION' : 'SUB_VERSION';
    dispatch({ type, payload: targetIndex });
  };

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
    <TableBody sx={TableBodyClass}>
      {editedList?.map((version) => {
        return (
          <TableRow
            key={version.TableName}
            sx={{
              height:
                editedList.length < MIN_LIST_LENGTH
                  ? `${200 / editedList.length}px`
                  : 0,
            }}
          >
            <TableCell sx={TableCellClass}>{version.TableName}</TableCell>
            <TableCell sx={TableCellClass} align="right">
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'end'}
                spacing={1}
              >
                <Tooltip
                  title="버전을 1씩 내립니다."
                  placement="top"
                  followCursor
                >
                  <Box>
                    <ButtonIcon
                      onClick={handleClick}
                      id={`${version.TableName}-down`}
                      disabled={version.Version < 1}
                      sx={ArrowButtonClass}
                      Icon={ArrowDropDownIcon}
                    />
                  </Box>
                </Tooltip>
                <Typography variant="caption">{version.Version}</Typography>
                <Tooltip
                  title="버전을 1씩 추가합니다."
                  placement="top"
                  followCursor
                >
                  <Box>
                    <ButtonIcon
                      onClick={handleClick}
                      id={`${version.TableName}-up`}
                      sx={ArrowButtonClass}
                      Icon={ArrowDropUpIcon}
                    />
                  </Box>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
