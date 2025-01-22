import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { getConvertedValue } from '@/shared/services';

import {
  BooleanFormCheckBoxClass,
  BooleanFromGroupClass,
  CheckBoxClass,
} from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';

export const BooleanForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: Partial<Pick<FormItemProps, 'item'>> & Omit<FormItemProps, 'item'>) => {
  const {
    transferDefaultValue = false,
    Description,
    RowValue = null,
    RowIdx = null,
    OriginalRowValue = null,
  } = item ?? {};
  const { addToEditedList } = useFlutterSetting();
  const [checkValue, setCheckValue] = useState<boolean>(
    RowValue ? getConvertedValue(RowValue) : transferDefaultValue
  );
  const initialValue = OriginalRowValue
    ? OriginalRowValue
    : transferDefaultValue;

  const handleBooleanChange = (event: ChangeEvent<HTMLInputElement>) => {
    const booleanValue = event.target.checked;
    setCheckValue(booleanValue);
    if (RowIdx !== null) {
      handleEdit(path, booleanValue.toString());
      addToEditedList({
        RowIdx,
        RowValue: booleanValue.toString(),
        InitialValue: initialValue.toString(),
      });
    }
  };

  useEffect(() => {
    if (RowValue) {
      setCheckValue(getConvertedValue(RowValue));
    } else {
      setCheckValue(transferDefaultValue);
    }
  }, [RowValue]);

  return (
    <>
      <FormGroup sx={BooleanFromGroupClass}>
        <FormControlLabel
          label={<Box component="span">{Description}</Box>}
          control={
            <Checkbox
              disableRipple
              checked={checkValue}
              onChange={handleBooleanChange}
              disabled={isDisabled}
              sx={BooleanFormCheckBoxClass(isDisabled)}
            />
          }
          sx={CheckBoxClass}
        />
      </FormGroup>
    </>
  );
};
