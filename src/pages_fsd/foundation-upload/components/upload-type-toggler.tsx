import { FormControlLabel, Switch, Typography, useMediaQuery, useTheme } from '@mui/material';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useOptionStore } from '../models/stores';

export const UploadTypeToggler = memo(() => {
  const { isFileOnly, toggleIsFileOnly } = useOptionStore(
    useShallow((state) => ({
      isFileOnly: state.isFileOnly,
      toggleIsFileOnly: state.toggleIsFileOnly,
    }))
  );
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FormControlLabel
      control={
        <Switch
          size={downsm ? 'small' : 'medium'}
          value={isFileOnly}
          checked={isFileOnly}
          onChange={toggleIsFileOnly}
        />
      }
      label={<Typography fontSize={downsm ? '12px' : '16px'}>파일만 업로드</Typography>}
    />
  );
});
UploadTypeToggler.displayName = 'UploadTypeToggler';
