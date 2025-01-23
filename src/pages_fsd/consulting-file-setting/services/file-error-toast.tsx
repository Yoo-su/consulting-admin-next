import { Stack, Typography } from '@mui/material';
import { FILE_MESSAGE } from '../constants';

export const getFileTypeErrorToastComponent = (fileName?: string) => {
  return fileName ? (
    <Stack direction="column">
      <Typography variant="body2">{FILE_MESSAGE.INVALID_FILE_TYPE}</Typography>
      <Typography variant="caption" sx={{ backgroundColor: '#fafbeb' }}>
        {fileName}
      </Typography>
    </Stack>
  ) : (
    <Typography variant="body2"> {FILE_MESSAGE.INVALID_FILE_TYPE}</Typography>
  );
};
