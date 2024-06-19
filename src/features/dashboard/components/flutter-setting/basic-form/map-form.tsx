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

const MapForm = ({ item: originalItem }: Partial<FormItemProps>) => {
  const { currentService } = useUnivService();
  const { transferDefaultValue, RowIdx = null, RowValue = null } = originalItem ?? {};
  const availableDefaultValue = RowValue ? RowValue : transferDefaultValue ?? '{}';
  const dataObj = getConvertedValue(availableDefaultValue);

  const [isAdd, setIsAdd] = useState(originalItem ? false : true);
  const [isEdit, setIsEdit] = useState<boolean[]>(Array(Object.keys(dataObj).length).fill(false));
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
    setIsEdit((prev) => {
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
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const index = event.currentTarget.id.split('-')[1];

    if (validateInput(parseInt(index)) == false) return;
    const newRows = [...rows];

    if (index === 'new') {
      setEditValue(rows.length, false);
      newRows.push({ item: objValue.item, value: objValue.value });
    } else {
      setEditValue(parseInt(index), false);
      newRows[parseInt(index)] = { item: objValue.item, value: objValue.value };
    }
    setRows(newRows);

    if (RowIdx) {
      const rowObject = getArrayToObjectForm(newRows);
      setFlutterCustomConfig({
        serviceID: currentService!.serviceID,
        RowIdx,
        RowValue: rowObject,
      });
    }
    resetValues();
  };
  const handleCancel = () => {
    resetValues();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [type, _] = name.split('-');
    if (type === 'item') {
      setObjValue((prev) => ({ ...prev, item: value }));
    } else {
      setObjValue((prev) => ({ ...prev, value: value }));
    }
  };
  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    setEditValue(index, true);
    setIsAdd(false);
    setObjValue({ item: rows[index].item, value: rows[index].value });
  };
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    const newList = rows.filter((_, i) => i !== index);
    if (newList.length < 1) {
      setIsAdd(true);
    }
    if (RowIdx) {
      const rowObject = getArrayToObjectForm(newList);
      setFlutterCustomConfig({
        serviceID: currentService!.serviceID,
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
                <TableCell component="th" scope="row">
                  {isEdit[index] == false ? (
                    <>{row.item}</>
                  ) : (
                    <TextField
                      fullWidth
                      placeholder="item"
                      name={`item-${index}`}
                      size="small"
                      sx={{ ...textFieldClass }}
                      value={objValue.item}
                      onChange={handleChange}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {isEdit[index] == false ? (
                    <>{row.value}</>
                  ) : (
                    <TextField
                      fullWidth
                      placeholder="value"
                      name={`value-${index}`}
                      size="small"
                      sx={{ ...textFieldClass }}
                      value={objValue.value}
                      onChange={handleChange}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Stack direction={'row'}>
                    {!isEdit[index] ? (
                      <Tooltip title="수정" placement="top">
                        <IconButton size="small" id={`editID-${index}`} onClick={handleEdit} disableRipple>
                          <ModeEditIcon sx={{ width: '.7em', height: '.7em' }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title="저장" placement="top">
                          <IconButton size="small" id={`confirmID-${index}`} onClick={handleConfirm} disableRipple>
                            <DoneIcon sx={{ width: '.7em', height: '.7em' }} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="삭제" placement="top">
                      <IconButton size="small" id={`deleteID-${index}`} onClick={handleDelete} disableRipple>
                        <DeleteIcon sx={{ width: '.7em', height: '.7em' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {isAdd && (
              <TableRow sx={{ ...rowBorderClass }}>
                <TableCell>
                  <TextField
                    fullWidth
                    placeholder="item"
                    name="item-new"
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
                    name="value-new"
                    size="small"
                    sx={{ ...textFieldClass }}
                    value={objValue.value}
                    onChange={handleChange}
                  />
                </TableCell>
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
      {!isAdd && (
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
      )}
    </>
  );
};

export default MapForm;
