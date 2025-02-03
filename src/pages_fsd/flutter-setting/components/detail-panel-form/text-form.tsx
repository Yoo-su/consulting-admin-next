'use client';

import { TextField } from '@mui/material';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useOutsideClick, useTypographyToast } from '@/shared/hooks';

import { TEXT_ERROR_MESSAGE, TextFormClass } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { getInitialValue, getItemValue } from '../../services';
import { TextFormAdornment } from './text-form-adornment';

export const TextForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: FormItemProps) => {
  const { showError } = useTypographyToast();
  const {
    IsRequired,
    Type,
    transferDefaultValue,
    OriginalRowValue,
    RowIdx,
    RowValue = null,
  } = item;
  const [textValue, setTextValue] = useState<string>(
    getItemValue(RowValue, transferDefaultValue)
  );
  const [isActive, setIsActive] = useState(false);
  const { addToEditedList } = useFlutterSetting();

  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

  const updateEditedValue = useCallback(() => {
    handleEdit(path, textValue);
    addToEditedList({
      RowIdx,
      RowValue: textValue.toString(),
      InitialValue: initialValue?.toString() ?? '',
    });
  }, [handleEdit, textValue, RowIdx, addToEditedList, path, initialValue]);
  // type이 double이거나 number일 때 숫자만 입력 가능
  const isNumbersOnly = useCallback((value: string) => {
    // decimal point 포함하는 숫자 regex pattern
    const regex = /^((\d+(\.\d*)?)|(\.\d+))$/;
    return (
      value !== '' && ['double', 'number'].includes(Type) && !regex.test(value)
    );
  }, []);

  const inputRef = useOutsideClick(() => {
    if (isActive) {
      updateEditedValue();
    }
    setIsActive(false);
  });

  //#region handle functions
  const handleInputKey = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      updateEditedValue();
      setIsActive(false);
    },
    [updateEditedValue, setIsActive]
  );
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (IsRequired && value === '') {
        showError(TEXT_ERROR_MESSAGE.REQUIRED);
        return;
      }
      if (isNumbersOnly(value)) return event.preventDefault();

      setIsActive(true);
      setTextValue(value);
    },
    [IsRequired, Type]
  );
  //#endregion handle functions

  useEffect(() => {
    setTextValue(getItemValue(RowValue, transferDefaultValue));
  }, [RowValue]);

  return (
    <TextField
      ref={inputRef}
      value={textValue}
      size="small"
      sx={TextFormClass}
      InputProps={{
        startAdornment: (
          <TextFormAdornment
            path={path}
            item={item}
            textValue={textValue}
            setTextValue={setTextValue}
            handleEdit={handleEdit}
          />
        ),
      }}
      disabled={isDisabled}
      onChange={handleChange}
      onKeyUp={handleInputKey}
    />
  );
};
