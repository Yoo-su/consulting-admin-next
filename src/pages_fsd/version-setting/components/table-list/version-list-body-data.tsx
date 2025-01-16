'use client';

import {
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Dispatch, MouseEvent } from 'react';

import {
  arrowButtonList,
  TableBodyClass,
  TableCellClass,
  TableRowClass,
} from '../../constants';
import { CurTBLVersion } from '../../models';
import { ActionType } from '../../services';
import { ArrowIconButton, EmptyList } from '../misc';

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

  if (editedList.length === 0) return <EmptyList />;

  return (
    <TableBody sx={TableBodyClass}>
      {editedList?.map((version) => {
        return (
          <TableRow
            key={version.TableName}
            sx={TableRowClass(editedList.length)}
          >
            <TableCell sx={TableCellClass}>{version.TableName}</TableCell>
            <TableCell sx={TableCellClass} align="right">
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'end'}
                spacing={1}
              >
                <ArrowIconButton
                  handleClick={handleClick}
                  {...arrowButtonList['down']}
                  id={`${version.TableName}-down`}
                />
                <Typography variant="caption">{version.Version}</Typography>
                <ArrowIconButton
                  handleClick={handleClick}
                  {...arrowButtonList['up']}
                  id={`${version.TableName}-up`}
                />
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
