import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useSetFlutterSettingMutation } from '@/features/dashboard/hooks/tanstack/use-set-flutter-setting-mutation';

const SelectForm = ({ item }: FormItemProps) => {
  const { currentService } = useUnivService();
  const { transferDefaultValue, children, RowIdx, RowValue = null } = item;
  const [selectedValue, setSelectedValue] = useState<string>(RowValue ?? transferDefaultValue);

  const { mutateAsync } = useSetFlutterSettingMutation();

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    mutateAsync({ serviceID: currentService!.serviceID, RowIdx, RowValue: value });
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
