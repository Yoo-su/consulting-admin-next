import { FormItemProps } from '../types/flutter-setting-form.type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState, MouseEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

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
  const { transferDefaultValue } = originalItem ?? {};
  const dataObj = JSON.parse(transferDefaultValue ?? '{}');

  const [isAdd, setIsAdd] = useState(originalItem ? false : true);
  const [itemValue, setItemValue] = useState<string>('');
  const [valueValue, setValueValue] = useState<string>('');
  const [rows, setRows] = useState<RowType[]>(
    Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
  );

  const resetValues = () => {
    setItemValue('');
    setValueValue('');
    setIsAdd(false);
  };

  const handleClick = () => {
    setIsAdd(true);
  };
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (itemValue && valueValue) {
      setRows((prev) => [...prev, { item: itemValue, value: valueValue }]);
      resetValues();
    } else {
      toast.error('Please fill in the blanks');
    }
  };
  const handleCancel = () => {
    resetValues();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'item') {
      setItemValue(value);
    } else {
      setValueValue(value);
    }
  };

  return (
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
          {rows.map((row) => (
            <TableRow key={row.item} sx={{ ...rowBorderClass }}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          {isAdd && (
            <TableRow sx={{ ...rowBorderClass }}>
              <TableCell>
                <TextField
                  fullWidth
                  placeholder="item"
                  name="item"
                  size="small"
                  sx={{ ...textFieldClass }}
                  value={itemValue}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  placeholder="value"
                  name="value"
                  size="small"
                  sx={{ ...textFieldClass }}
                  value={valueValue}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <Stack direction={'row'} spacing={1}>
                  <Button
                    onClick={handleConfirm}
                    variant="contained"
                    size="small"
                    disableElevation
                    disabled={!(valueValue && itemValue)}
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
          {!isAdd && (
            <Box sx={{ padding: '.2rem 0' }}>
              <Button
                disableElevation
                size="small"
                variant="contained"
                endIcon={<Add />}
                sx={{ verticalAlign: 'middle', backgroundColor: '#616161' }}
                onClick={handleClick}
              >
                <Typography variant="caption">추가</Typography>
              </Button>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MapForm;
