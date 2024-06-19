import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { setFlutterCustomConfig } from '@/features/dashboard/apis/set-flutter-custom-config';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';

const BasicTextForm = ({ item }: FormItemProps) => {
  const { currentService } = useUnivService();
  const { transferDefaultValue, RowIdx, RowValue = null } = item;
  const [textValue, setTextValue] = useState(RowValue ? RowValue : transferDefaultValue);

  const inputRef = useOutsideClick(() => {
    setFlutterCustomConfig({ serviceID: currentService!.serviceID, RowIdx, RowValue: textValue });
  });
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter');
      // Add category
      setTextValue((event.target as HTMLInputElement).value);
      setFlutterCustomConfig({ serviceID: currentService!.serviceID, RowIdx, RowValue: textValue });
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };
  return (
    <TextField
      ref={inputRef}
      value={textValue}
      size="small"
      sx={{
        '& .MuiInputBase-root': {
          fontSize: '.9rem',
        },
      }}
      onChange={handleChange}
      onKeyUp={handleInputKey}
    />
  );
};

export default BasicTextForm;
