import { Dispatch, SetStateAction } from 'react';

import { FlutterRowInfo, Path } from '../../models';
import { getInitialValue } from '../../services';
import { FormColorPicker } from '../detail-panel-form-color-picker';

type TextFormAdornmentProps = {
  item: FlutterRowInfo;
  path: Path;
  handleEdit: (path: Path, value: string) => void;
  textValue: string;
  setTextValue: Dispatch<SetStateAction<string>>;
};

export const TextFormAdornment = ({ path, handleEdit, textValue, setTextValue, item }: TextFormAdornmentProps) => {
  const { Title, transferDefaultValue, OriginalRowValue, RowIdx } = item;

  const isColorItem = Title.toLowerCase().includes('color');
  if (!isColorItem) return null;

  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

  return (
    <FormColorPicker
      setTextValue={setTextValue}
      value={textValue}
      handleEdit={handleEdit}
      path={path}
      RowIdx={RowIdx}
      InitialValue={initialValue}
    />
  );
};
