import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { TextField } from '@mui/material';
import { KeyboardEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';

const BasicTextForm = ({ item }: FormItemProps) => {
  const { transferDefaultValue } = item;
  const [textValue, setTextValue] = useState(transferDefaultValue);

  const inputRef = useOutsideClick(() => {});
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter');
      // Add category
      setTextValue(event.target);
    }
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
    />
  );
};

export default BasicTextForm;
