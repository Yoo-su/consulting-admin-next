// DirectoryNameInput.tsx
import DirectoryIcon from '@mui/icons-material/Folder';
import { Stack, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { DIALOG_PLACEHOLDER } from '../../constants';
import { FormValues } from '../../models';
import { directoryNameValidation } from './validation-rule';

type DirectoryNameInputProps = {
  control: Control<FormValues, any>;
  errors: any;
};
export const DirectoryNameInput = ({ control, errors }: DirectoryNameInputProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <DirectoryIcon />
      <Controller
        name="directoryName"
        control={control}
        rules={directoryNameValidation}
        render={({ field }) => (
          <TextField
            {...field}
            variant="standard"
            size="small"
            placeholder={DIALOG_PLACEHOLDER}
            error={!!errors.directoryName}
            helperText={errors.directoryName?.message}
          />
        )}
      />
    </Stack>
  );
};
