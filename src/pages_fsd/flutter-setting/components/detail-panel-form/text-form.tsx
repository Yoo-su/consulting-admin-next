'use client';

import { TextField, Typography } from '@mui/material';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { useOutsideClick } from '@/shared/hooks';

import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { FlutterColorPicker } from '../detail-panel-form-color-picker';

export const TextForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: FormItemProps) => {
  const {
    IsRequired,
    Title,
    Type,
    transferDefaultValue,
    RowIdx,
    RowValue = null,
    OriginalRowValue = null,
  } = item;
  const [textValue, setTextValue] = useState<string>(
    RowValue ? RowValue : transferDefaultValue
  );
  const [isActive, setIsActive] = useState(false);
  const { addToEditedList } = useFlutterSetting();
  const initialValue = OriginalRowValue
    ? OriginalRowValue
    : transferDefaultValue;

  const isColorItem = Title.toLowerCase().includes('color');

  const updateEditedValue = () => {
    handleEdit(path, textValue);
    addToEditedList({
      RowIdx,
      RowValue: textValue.toString(),
      InitialValue: initialValue?.toString() ?? '',
    });
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
      toast.error(<Typography variant="body2">필수 입력값입니다</Typography>);
      return;
    }
    // type이 double이거나 number일 때 숫자만 입력 가능
    if (
      value !== '' &&
      (Type === 'double' || Type === 'number') &&
      !regex.test(value)
    ) {
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
          InitialValue={initialValue}
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
