'use client';

import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getConvertedValue } from '@/shared/services/get-converted-value';

import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { getArrayToObjectForm } from '../../services';

type RowType = {
  item: string;
  value: string;
};

export const MapForm = ({
  item: originalItem,
  path,
  handleEdit: onEdit,
  isDisabled,
}: Partial<Pick<FormItemProps, 'item'>> & Omit<FormItemProps, 'item'>) => {
  const {
    transferDefaultValue,
    RowIdx = null,
    RowValue = null,
    OriginalRowValue = null,
  } = originalItem ?? {};
  const dataObj = getConvertedValue(RowValue ?? transferDefaultValue ?? '{}');
  const { addToEditedList } = useFlutterSetting();
  // TODO: 취소 했음에도 변경으로 처리되는 거 수정
  const [isAdd, setIsAdd] = useState(originalItem ? false : true);
  const [isEditObj, setIsEditObj] = useState<boolean[]>(
    Array(Object.keys(dataObj).length).fill(false)
  );
  const [objValue, setObjValue] = useState({ item: '', value: '' });
  const [rows, setRows] = useState<RowType[]>(
    Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
  );
  const initialValue = OriginalRowValue
    ? OriginalRowValue
    : transferDefaultValue;

  //#region utilities
  /** 입력값 초기화  */
  const resetValues = () => {
    setObjValue({ item: '', value: '' });
    setIsAdd(false);
  };
  /** 수정모드 설정  */
  const setEditValue = (index: number, value: boolean) => {
    setIsEditObj((prev) => {
      const newEdit = [...prev];
      newEdit[index] = value;
      return newEdit;
    });
  };
  /** 중복키 검사  */
  const isDuplicateKey = (key: string, index: number) => {
    let i = -1;
    for (const row of rows) {
      ++i;
      if (!isNaN(index) && i === index) continue;
      if (row.item === key) {
        toast.error(
          <Typography variant="body2">item명 중복 불가합니다</Typography>
        );
        return true;
      }
    }
    return false;
  };
  /** 입력값 validation  */
  const validateInput = (index: number) => {
    // 수정한 값이 원래 값과 같은 경우
    if (
      !isNaN(index) &&
      rows[index].item === objValue.item &&
      rows[index].value === objValue.value
    ) {
      setEditValue(index, false);
      resetValues();
      return false;
    }
    // 빈 값이 있는 경우
    if (!objValue.item || !objValue.value) {
      toast.error(<Typography variant="body2">빈 값이 있습니다</Typography>);
      return false;
    }
    // 중복된 key가 있는 경우
    if (isDuplicateKey(objValue.item, index)) return false;
    return true;
  };
  /** 수정한 값 저장  */
  const saveEditedValue = (newRows: RowType[]) => {
    if (RowIdx === null) return;
    const rowObject = getArrayToObjectForm(newRows);
    onEdit(path, rowObject);
    addToEditedList({
      RowIdx,
      RowValue: rowObject,
      InitialValue: initialValue,
    });
    setRows(newRows);
  };
  //#endregion utilities
  //#region handle functions
  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleCancel = () => {
    resetValues();
  };
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const index = parseInt(event.currentTarget.id.split('-')[1]);

    if (validateInput(index) == false) return;
    const newRows = [...rows];
    const rowIndex = isNaN(index) ? rows.length : index;
    setEditValue(rowIndex, false);
    newRows[rowIndex] = { item: objValue.item, value: objValue.value };

    // 수정 리스트에 추가
    saveEditedValue(newRows);
    resetValues();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [type, _] = name.split('-');
    setObjValue((prev) => ({ ...prev, [type]: value }));
  };
  const handleEditInput = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    setEditValue(index, true);
    setIsAdd(false);
    setObjValue({ item: rows[index].item, value: rows[index].value });
  };
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    const newList = rows.filter((_, i) => i !== index);
    // list가 비어있는 경우 추가 모드 활성화
    setIsAdd(newList.length < 1);
    // 수정 리스트에 추가
    saveEditedValue(newList);
  };
  //#endregion handle functions

  useEffect(() => {
    setRows(
      Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
    );
  }, [RowValue]);
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: '100%' }} size="small" aria-label="map table">
          <TableHead>
            <TableRow sx={{ ...headerBorderClass }}>
              <TableCell sx={{ fontWeight: 'bolder', width: '35%' }}>
                Item
              </TableCell>
              <TableCell sx={{ fontWeight: 'bolder', width: '35%' }}>
                Value
              </TableCell>
              <TableCell sx={{ width: '30%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {rows.map((row, index) => (
              <TableRow key={row.item} sx={{ ...rowBorderClass }}>
                {isEditObj[index] == false || isDisabled ? (
                  <>
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </>
                ) : (
                  <InputCells
                    index={`${index}`}
                    objValue={objValue}
                    handleChange={handleChange}
                  />
                )}
                <TableCell>
                  {!isDisabled && (
                    <Stack direction={'row'}>
                      {getEditSaveButton(
                        !isEditObj[index],
                        index,
                        handleEditInput,
                        handleConfirm
                      )}
                      <Tooltip title="삭제" placement="top">
                        <IconButton
                          size="small"
                          id={`deleteID-${index}`}
                          onClick={handleDelete}
                          disableRipple
                        >
                          <DeleteIcon sx={{ width: '.7em', height: '.7em' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {isAdd && !isDisabled && (
              <TableRow sx={{ ...rowBorderClass }}>
                <InputCells
                  index="new"
                  objValue={objValue}
                  handleChange={handleChange}
                />
                <TableCell>
                  <Stack direction={'row'} spacing={1}>
                    <Button
                      onClick={handleConfirm}
                      variant="contained"
                      size="small"
                      id={`confirmID-new`}
                      disableElevation
                      disabled={!(objValue.value && objValue.item)}
                    >
                      <Typography variant="caption">등록</Typography>
                    </Button>
                    <Button
                      onClick={handleCancel}
                      color="error"
                      variant="outlined"
                      size="small"
                    >
                      <Typography variant="caption">취소</Typography>
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!isAdd && !isDisabled && <CreateNewButton handleAdd={handleAdd} />}
    </>
  );
};

type InputCellsProps = {
  index: string;
  objValue: { item: string; value: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const InputCells = ({ index, objValue, handleChange }: InputCellsProps) => {
  return (
    <>
      <TableCell>
        <TextField
          fullWidth
          placeholder="item"
          name={`item-${index}`}
          size="small"
          sx={{ ...textFieldClass }}
          value={objValue.item}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          placeholder="value"
          name={`value-${index}`}
          size="small"
          sx={{ ...textFieldClass }}
          value={objValue.value}
          onChange={handleChange}
        />
      </TableCell>
    </>
  );
};

const getEditSaveButton = (
  isEdit: boolean,
  index: number,
  handleEditInput: (event: MouseEvent<HTMLButtonElement>) => void,
  handleConfirm: (event: MouseEvent<HTMLButtonElement>) => void
) => {
  if (isEdit) {
    return (
      <Tooltip title="수정" placement="top">
        <IconButton
          size="small"
          id={`editID-${index}`}
          onClick={handleEditInput}
          disableRipple
        >
          <ModeEditIcon sx={{ width: '.7em', height: '.7em' }} />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="저장" placement="top">
        <IconButton
          size="small"
          id={`confirmID-${index}`}
          onClick={handleConfirm}
          disableRipple
        >
          <DoneIcon sx={{ width: '.7em', height: '.7em' }} />
        </IconButton>
      </Tooltip>
    );
  }
};

const CreateNewButton = ({
  handleAdd,
}: {
  handleAdd: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Box sx={{ padding: '.2rem 0' }}>
      <Button
        disableElevation
        size="small"
        variant="contained"
        endIcon={<Add />}
        sx={{
          verticalAlign: 'middle',
          backgroundColor: '#616161',
          padding: '2px 0',
        }}
        onClick={handleAdd}
      >
        <Typography variant="caption" sx={{ paddingTop: '3px' }}>
          추가
        </Typography>
      </Button>
    </Box>
  );
};

const headerBorderClass = {
  border: '1px solid rgba(224, 224, 224, 1)',
  borderBottomColor: 'transparent',
  borderRadius: '1rem',
};
const rowBorderClass = {
  border: '1px solid rgba(224, 224, 224, 1)',
  borderBottomColor: 'transparent',
  borderTopColor: 'transparent',
};
const textFieldClass = {
  '& .MuiInputBase-root': {
    fontSize: '.9rem',
  },
  '& .MuiInputBase-input': {
    padding: '2px 4px',
  },
};
