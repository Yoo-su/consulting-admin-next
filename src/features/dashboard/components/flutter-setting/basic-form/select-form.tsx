import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

const SelectForm = ({ item, path, handleEdit }: FormItemProps) => {
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
        }}
      >
        <Select size="small" value={selectedValue} onChange={handleSelectChange}>
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
