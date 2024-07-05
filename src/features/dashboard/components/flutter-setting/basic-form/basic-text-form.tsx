import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { TextField } from '@mui/material';
import { FormItemProps } from '../types/flutter-setting-form.type';
import toast from 'react-hot-toast';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import FlutterColorPicker from '../flutter-color-picker';

const BasicTextForm = ({ item, path, handleEdit, isDisabled }: FormItemProps) => {
  const { IsRequired, Title, Type, transferDefaultValue, RowIdx, RowValue = null } = item;
  const [textValue, setTextValue] = useState<string>(RowValue ? RowValue : transferDefaultValue);
  const [isActive, setIsActive] = useState(false);
  const { addToEditedList } = useFlutterSetting();

  const isColorItem = Title.endsWith('Color');

  const updateEditedValue = () => {
    handleEdit(path, textValue);
    addToEditedList({ RowIdx, RowValue: textValue });
  };
  const inputRef = useOutsideClick(() => {
    if (isActive) {
      updateEditedValue();
    }
    setIsActive(false);
  });
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateEditedValue();
      setIsActive(false);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^((\d+(\.\d*)?)|(\.\d+))$/;
    const value = event.target.value;

    if (IsRequired && value === '') {
      toast.error('필수 입력값입니다.');
      return;
    }
    // type이 double이거나 number일 때 숫자만 입력 가능
    if (value !== '' && (Type === 'double' || Type === 'number') && !regex.test(value)) {
      return event.preventDefault();
    }
    setIsActive(true);
    setTextValue(value);
  };
  useEffect(() => {
    if (RowValue) {
      setTextValue(RowValue);
    } else {
      setTextValue(transferDefaultValue);
    }
  }, [RowValue]);
  const startAdornment = useCallback(
    () =>
      isColorItem && (
        <FlutterColorPicker
          setTextValue={setTextValue}
          value={textValue}
          handleEdit={handleEdit}
          path={path}
          RowIdx={RowIdx}
        />
      ),
    [textValue]
  );

  return (
    <TextField
      ref={inputRef}
      value={textValue}
      size="small"
      sx={{
        '& .MuiInputBase-root': {
          fontSize: '.9rem',
        },
        '& .Mui-disabled': {
          WebkitTextFillColor: 'rgba(0, 0, 0, 0.87) !important',
          backgroundColor: '#FAFAFA',
        },
      }}
      InputProps={{
        startAdornment: startAdornment(),
      }}
      disabled={isDisabled}
      onChange={handleChange}
      onKeyUp={handleInputKey}
    />
  );
};

export default BasicTextForm;
