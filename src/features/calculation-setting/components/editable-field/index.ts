import { Stack, TextField } from '@mui/material';

import { CalcConfig, CalcMethod, ConversionTable } from '../../models';

type EditableFieldProps = {
  key: keyof CalcConfig | keyof CalcMethod | keyof ConversionTable;
};
const EditableField = () => {};
export default EditableField;
