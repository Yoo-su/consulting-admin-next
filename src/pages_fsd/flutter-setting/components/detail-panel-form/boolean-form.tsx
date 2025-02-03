import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { BooleanFormCheckBoxClass, BooleanFromGroupClass, CheckBoxClass } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { getInitialValue, getItemValue } from '../../services';

export const BooleanForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: Partial<Pick<FormItemProps, 'item'>> & Omit<FormItemProps, 'item'>) => {
  const {
    transferDefaultValue = false,
    OriginalRowValue = null,
    Description,
    RowValue = null,
    RowIdx = null,
  } = item ?? {};
  const { addToEditedList } = useFlutterSetting();
  const [checkValue, setCheckValue] = useState<boolean>(getItemValue(RowValue, transferDefaultValue));
  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

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
    setCheckValue(getItemValue(RowValue, transferDefaultValue));
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
