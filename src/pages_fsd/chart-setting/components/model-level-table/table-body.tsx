import { TableBody, TableCell, TableRow, TextField } from '@mui/material';
import { ChangeEvent, memo } from 'react';

import { ChartData } from '../../models';
import { DeleteLevelRowButton } from './delete-level-row-button';

type TableBodyProps = {
  editMode: boolean;
  tableChartDatas: ChartData[];
  handleFieldChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleDeleteLevelRow: (deleteRowLabel: string) => void;
};
export const LevelTableBody = memo(
  ({
    editMode,
    tableChartDatas,
    handleFieldChange,
    handleDeleteLevelRow,
  }: TableBodyProps) => {
    return (
      <TableBody>
        {tableChartDatas.map((data, idx) => (
          <TableRow
            key={`model-${data.modelNum}-level-${data.level}-row-${idx}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {editMode ? (
                <TextField
                  name="label"
                  defaultValue={data.label}
                  size="small"
                  variant="standard"
                  onChange={(e) => handleFieldChange(e, idx)}
                />
              ) : (
                data.label
              )}
            </TableCell>
            <TableCell align="right">
              {editMode ? (
                <TextField
                  defaultValue={data.chartLabel}
                  size="small"
                  variant="standard"
                  name="chartLabel"
                  onChange={(e) => handleFieldChange(e, idx)}
                />
              ) : (
                data.chartLabel
              )}
            </TableCell>
            <TableCell align="right">
              {editMode ? (
                <TextField
                  name="percentage"
                  type="number"
                  defaultValue={data.percentage}
                  size="small"
                  variant="standard"
                  onChange={(e) => handleFieldChange(e, idx)}
                />
              ) : (
                data.percentage
              )}
            </TableCell>
            <TableCell align="right">
              {!editMode ? (
                <DeleteLevelRowButton
                  label={data.label}
                  handleDeleteLevelRow={handleDeleteLevelRow}
                />
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
);
LevelTableBody.displayName = 'LevelTableBody';
