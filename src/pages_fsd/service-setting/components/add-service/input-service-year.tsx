import { InputLabel, Stack, TextField } from '@mui/material';

import { textFieldStyle } from '../../constants';

type InputServiceYearProps = {
  currentServiceYear: number;
};

export const InputServiceYear = ({
  currentServiceYear,
}: InputServiceYearProps) => {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <InputLabel>서비스 년도</InputLabel>
      <TextField
        disabled
        variant="standard"
        value={currentServiceYear}
        sx={textFieldStyle}
        size="small"
      />
    </Stack>
  );
};
