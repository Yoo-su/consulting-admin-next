import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { setFlutterCustomConfig } from '@/features/dashboard/apis/set-flutter-custom-config';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import toast from 'react-hot-toast';

const BasicTextForm = ({ item }: FormItemProps) => {
  const { currentService } = useUnivService();
  const { IsRequired, Type, transferDefaultValue, RowIdx, RowValue = null } = item;
  const originalValue = RowValue ? RowValue : transferDefaultValue;
  const [textValue, setTextValue] = useState(originalValue);

  const inputRef = useOutsideClick(() => {
    setFlutterCustomConfig({ serviceID: currentService!.serviceID, RowIdx, RowValue: textValue });
  });
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFlutterCustomConfig({ serviceID: currentService!.serviceID, RowIdx, RowValue: textValue });
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^((\d+(\.\d*)?)|(\.\d+))$/;
    const value = event.target.value;

    if (IsRequired && value === '') {
      toast.error('필수 입력값입니다.');
      return setTextValue(originalValue);
    }
    if (value !== '' && (Type === 'double' || Type === 'number')) {
      if (!regex.test(value)) return event.preventDefault();
    }
    setTextValue(value);
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
