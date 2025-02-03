import { FormControl, InputBase } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent } from 'react';

import { ColorSquareClass } from '../../constants';
import { HSV } from '../../models';
import { hsvToHex } from '../../services';
import { ColorSquareIcon } from './color-square-icon';

type ColorPopoverHeaderProps = {
  hexText: string;
  currentHsv: HSV;
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ColorPopoverHeader = ({ hexText, currentHsv, handleChangeText }: ColorPopoverHeaderProps) => {
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
      <Typography variant="body1">선택된 색상</Typography>
      <Stack direction={'row'} alignItems={'center'}>
        <ColorSquareIcon color={`#${hsvToHex(currentHsv)}`} />
        <FormControl>
          <InputBase
            startAdornment={<InputAdornment position="start">0xff</InputAdornment>}
            size="small"
            sx={ColorSquareClass}
            value={hexText}
            onChange={handleChangeText}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};
