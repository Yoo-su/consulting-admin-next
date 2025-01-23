import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { SelectFormClass } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { getInitialValue, getItemValue } from '../../services';

export const SelectForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: FormItemProps) => {
  const {
    transferDefaultValue,
    OriginalRowValue,
    children,
    RowIdx,
    RowValue = null,
  } = item;
  const { addToEditedList } = useFlutterSetting();
  const [selectedValue, setSelectedValue] = useState<string>(
    getItemValue(RowValue, transferDefaultValue)
  );

  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

  const handleSelectChange = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value;
      handleEdit(path, value);
      addToEditedList({ RowIdx, RowValue: value, InitialValue: initialValue });
      setSelectedValue(value);
    },
    [handleEdit, initialValue, RowIdx, addToEditedList, setSelectedValue, path]
  );

  useEffect(() => {
    setSelectedValue(getItemValue(RowValue, transferDefaultValue));
  }, [RowValue]);

  return (
    <FormControl sx={SelectFormClass(isDisabled)}>
      <Select
        size="small"
        value={selectedValue}
        onChange={handleSelectChange}
        disabled={isDisabled}
      >
        {children.map((child) => (
          <MenuItem key={child.RowIdx} value={child.DefaultValue}>
            {child.KoreanTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
