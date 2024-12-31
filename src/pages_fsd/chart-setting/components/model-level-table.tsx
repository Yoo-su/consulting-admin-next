'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

import { useModelLevelTable } from '../hooks';
import { useChartSettingStore } from '../models';

type ModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};

export const ModelLevelTable = memo(
  ({ modelNum, levelNum }: ModelLevelTableProps) => {
    const { isEditing } = useChartSettingStore();
    const {
      editMode,
      tempChartData,
      levelChartData,
      addNewModelLevel,
      enterEditMode,
      deleteModelLevel,
      handleClickAddLevelRowBtn,
      handleClickDeleteLevelRowBtn,
      handleFieldChange,
      cancelEdit,
      saveEdited,
    } = useModelLevelTable({
      modelNum,
      levelNum,
    });

    return (
      <StyledStack className={editMode ? 'editMode' : ''}>
        <HeaderStack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack direction={'row'} spacing={1} alignItems="center">
            <Typography
              variant="body2"
              fontSize={16}
            >{`단계 ${levelChartData[0].level}`}</Typography>
          </Stack>
          {editMode ? (
            <Stack direction={'row'} spacing={0.5}>
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={saveEdited}
                sx={{ color: 'white' }}
              >
                <Typography variant="body1" fontSize={12}>
                  완료
                </Typography>
              </Button>
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                onClick={cancelEdit}
              >
                <Typography variant="body1" fontSize={12}>
                  취소
                </Typography>
              </Button>
            </Stack>
          ) : (
            !isEditing && (
              <Stack direction={'row'} spacing={0.5}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={enterEditMode}
                >
                  <Typography variant="body1" fontSize={12}>
                    편집모드
                  </Typography>
                </Button>

                <Button size="small" variant="outlined" color="error">
                  <Typography
                    variant="body1"
                    fontSize={12}
                    onClick={deleteModelLevel}
                  >
                    단계삭제
                  </Typography>
                </Button>
              </Stack>
            )
          )}
        </HeaderStack>
        <TableContainer component={Paper} sx={{ mt: 0.1 }}>
          <Table size="small" aria-label="model-level-table">
            <TableHead>
              <TableRow>
                <TableCell>label</TableCell>
                <TableCell align="right">차트 label</TableCell>
                <TableCell align="right">비율(%)</TableCell>
                <TableCell align="right">삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempChartData.map((data, idx) => (
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
                      <DeleteIconStyled
                        fontSize="small"
                        onClick={() => handleClickDeleteLevelRowBtn(data.label)}
                      />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {editMode && (
              <TableFooter>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <AddRowBox onClick={handleClickAddLevelRowBtn}>
                      <AddRowStack direction={'row'}>
                        <AddCircleIcon
                          sx={{ color: '#0069A0', marginRight: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: '#0069A0' }}>
                          행추가
                        </Typography>
                      </AddRowStack>
                    </AddRowBox>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </StyledStack>
    );
  }
);
ModelLevelTable.displayName = 'ModelLevelTable';

const StyledStack = styled(Stack)(({ theme }) => ({
  margin: '1rem 0',
  transition: 'all 0.1s ease',
  '&.editMode': {
    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))',
    padding: '0.5rem',
  },
}));

const HeaderStack = styled(Stack)(({ theme }) => ({
  marginBottom: '0.5rem',
}));

const AddRowBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.1s ease',
  borderRadius: theme.shape.borderRadius,
}));

const AddRowStack = styled(Stack)(({ theme }) => ({
  padding: '0.5rem 0',
  justifyContent: 'center',
  alignItems: 'center',
}));

const DeleteIconStyled = styled(DeleteIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: 'rgba(0,0,0,0.6)',
  ':hover': { color: theme.palette.error.main },
}));
