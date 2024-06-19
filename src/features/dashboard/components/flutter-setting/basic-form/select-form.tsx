import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { setFlutterCustomConfig } from '@/features/dashboard/apis/set-flutter-custom-config';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';

const SelectForm = ({ item }: FormItemProps) => {
  const { currentService } = useUnivService();
  const { transferDefaultValue, children, RowIdx, RowValue = null } = item;
  const [selectedValue, setSelectedValue] = useState<string>(RowValue ? RowValue : transferDefaultValue);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFlutterCustomConfig({ serviceID: currentService!.serviceID, RowIdx, RowValue: event.target.value });
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
