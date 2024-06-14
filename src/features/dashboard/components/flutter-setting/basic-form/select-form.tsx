import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

type SelectFormProps = {
  item: FlutterRowInfo;
};
const SelectForm = ({ item }: SelectFormProps) => {
  const { transferDefaultValue, children } = item;
  const [selectedValue, setSelectedValue] = useState<string>(transferDefaultValue);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
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
