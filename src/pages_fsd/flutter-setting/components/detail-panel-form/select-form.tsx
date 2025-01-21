import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';

export const SelectForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: FormItemProps) => {
  const {
    transferDefaultValue,
    children,
    RowIdx,
    RowValue = null,
    OriginalRowValue = null,
  } = item;
  const { addToEditedList } = useFlutterSetting();
  const [selectedValue, setSelectedValue] = useState<string>(
    RowValue ?? transferDefaultValue
  );
  const initialValue = OriginalRowValue
    ? OriginalRowValue
    : transferDefaultValue;

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    handleEdit(path, value);
    addToEditedList({ RowIdx, RowValue: value, InitialValue: initialValue });
    setSelectedValue(value);
  };

  useEffect(() => {
    if (RowValue) {
      setSelectedValue(RowValue);
    } else {
      setSelectedValue(transferDefaultValue);
    }
  }, [RowValue]);

  return (
    <>
      <FormControl
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '.9rem',
          },
          '& .Mui-disabled': {
            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
            backgroundColor: '#FAFAFA',
          },
          '& .MuiSvgIcon-root': {
            display: isDisabled ? 'none' : 'block',
          },
        }}
      >
        <Select
          size="small"
          value={selectedValue}
          onChange={handleSelectChange}
          disabled={isDisabled}
        >
          {children.map((child) => {
            return (
              <MenuItem key={child.RowIdx} value={child.DefaultValue}>
                {child.KoreanTitle}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
