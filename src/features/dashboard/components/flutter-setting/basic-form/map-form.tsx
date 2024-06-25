import { FormItemProps } from '../types/flutter-setting-form.type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState, MouseEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { getConvertedValue } from '@/shared/services/get-converted-value';
import { getArrayToObjectForm } from '@/features/dashboard/services/flutter-setting/get-array-to-object-form';
import { setFlutterCustomConfig } from '@/features/dashboard/apis/set-flutter-custom-config';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useSetFlutterSettingMutation } from '@/features/dashboard/hooks/tanstack/use-set-flutter-setting-mutation';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

type RowType = {
  item: string;
  value: string;
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

const MapForm = ({ item: originalItem, isEdit }: Partial<FormItemProps>) => {
  const { transferDefaultValue, RowIdx = null, RowValue = null } = originalItem ?? {};
  const dataObj = getConvertedValue(RowValue ?? transferDefaultValue ?? '{}');
  const { addToEditedSettingList } = useFlutterSetting();

  const [isAdd, setIsAdd] = useState(originalItem ? false : true);
  const [isEditObj, setIsEditObj] = useState<boolean[]>(Array(Object.keys(dataObj).length).fill(false));
  const [objValue, setObjValue] = useState({ item: '', value: '' });
  const [rows, setRows] = useState<RowType[]>(
    Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
  );

  //#region utilities
  const resetValues = () => {
    setObjValue({ item: '', value: '' });
    setIsAdd(false);
  };
  const setEditValue = (index: number, value: boolean) => {
    setIsEditObj((prev) => {
      const newEdit = [...prev];
      newEdit[index] = value;
      return newEdit;
    });
  };
  const isDuplicateKey = (key: string, index: number) => {
    let i = -1;
    for (const row of rows) {
      ++i;
      if (!isNaN(index) && i === index) continue;
      if (row.item === key) {
        toast.error('item명 중복 불가합니다.');
        return true;
      }
    }
    return false;
  };
  const validateInput = (index: number) => {
    // 수정한 값이 원래 값과 같은 경우
    if (!isNaN(index) && rows[index].item === objValue.item && rows[index].value === objValue.value) {
      setEditValue(index, false);
      resetValues();
      return false;
    }
    // 빈 값이 있는 경우
    if (!objValue.item || !objValue.value) {
      toast.error('빈 값이 있습니다.');
      return false;
    }
    // 중복된 key가 있는 경우
    if (isDuplicateKey(objValue.item, index)) return false;
    return true;
  };
  //#endregion

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
    const { item, value } = objValue;
    newRows[rowIndex] = { item, value };

    setRows(newRows);

    if (RowIdx) {
      const rowObject = getArrayToObjectForm(newRows);
      addToEditedSettingList({
        RowIdx,
        RowValue: rowObject,
      });
    }
    resetValues();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [type, _] = name.split('-');
    setObjValue((prev) => ({ ...prev, [type]: value }));
  };
  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    setEditValue(index, true);
    setIsAdd(false);
    const { item, value } = rows[index];
    setObjValue({ item, value });
  };
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    const newList = rows.filter((_, i) => i !== index);
    // list가 비어있는 경우 추가 모드 활성화
    setIsAdd(newList.length < 1);
    if (RowIdx) {
      const rowObject = getArrayToObjectForm(newList);
      addToEditedSettingList({
        RowIdx,
        RowValue: rowObject,
      });
    }
    setRows(newList);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: '100%' }} size="small" aria-label="map table">
          <TableHead>
            <TableRow sx={{ ...headerBorderClass }}>
              <TableCell sx={{ fontWeight: 'bolder', width: '35%' }}>Item</TableCell>
              <TableCell sx={{ fontWeight: 'bolder', width: '35%' }}>Value</TableCell>
              <TableCell sx={{ width: '30%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {rows.map((row, index) => (
              <TableRow key={row.item} sx={{ ...rowBorderClass }}>
                {isEditObj[index] == false ? (
                  <>
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </>
                ) : (
                  <InputCells index={`${index}`} objValue={objValue} handleChange={handleChange} />
                )}
                <TableCell>
                  <Stack direction={'row'}>
                    {getEditSaveButton(!isEditObj[index], index, handleEdit, handleConfirm)}
                    <Tooltip title="삭제" placement="top">
                      <IconButton size="small" id={`deleteID-${index}`} onClick={handleDelete} disableRipple>
                        <DeleteIcon sx={{ width: '.7em', height: '.7em' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {isAdd && isEdit && (
              <TableRow sx={{ ...rowBorderClass }}>
                <InputCells index="new" objValue={objValue} handleChange={handleChange} />
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
                    <Button onClick={handleCancel} color="error" variant="outlined" size="small">
                      <Typography variant="caption">취소</Typography>
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!isAdd && isEdit && <CreateNewButton handleAdd={handleAdd} />}
    </>
  );
};

export default MapForm;

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
  handleEdit: (event: MouseEvent<HTMLButtonElement>) => void,
  handleConfirm: (event: MouseEvent<HTMLButtonElement>) => void
) => {
  if (isEdit) {
    return (
      <Tooltip title="수정" placement="top">
        <IconButton size="small" id={`editID-${index}`} onClick={handleEdit} disableRipple>
          <ModeEditIcon sx={{ width: '.7em', height: '.7em' }} />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="저장" placement="top">
        <IconButton size="small" id={`confirmID-${index}`} onClick={handleConfirm} disableRipple>
          <DoneIcon sx={{ width: '.7em', height: '.7em' }} />
        </IconButton>
      </Tooltip>
    );
  }
};

const CreateNewButton = ({ handleAdd }: { handleAdd: (event: MouseEvent<HTMLButtonElement>) => void }) => {
  return (
    <Box sx={{ padding: '.2rem 0' }}>
      <Button
        disableElevation
        size="small"
        variant="contained"
        endIcon={<Add />}
        sx={{ verticalAlign: 'middle', backgroundColor: '#616161' }}
        onClick={handleAdd}
      >
        <Typography variant="caption">추가</Typography>
      </Button>
    </Box>
  );
};
