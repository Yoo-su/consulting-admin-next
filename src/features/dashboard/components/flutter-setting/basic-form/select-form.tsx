import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

const SelectForm = ({ item, path, handleEdit, isDisabled }: FormItemProps) => {
  const { transferDefaultValue, children, RowIdx, RowValue = null } = item;
  const { addToEditedList } = useFlutterSetting();
  const [selectedValue, setSelectedValue] = useState<string>(RowValue ?? transferDefaultValue);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    handleEdit(path, value);
    addToEditedList({ RowIdx, RowValue: value });
    setSelectedValue(value);
  };

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
        <Select size="small" value={selectedValue} onChange={handleSelectChange} disabled={isDisabled}>
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

export default SelectForm;
