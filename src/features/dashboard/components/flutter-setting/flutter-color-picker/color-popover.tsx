import { Dispatch, SetStateAction, MouseEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { Box, Button, FormControl, InputBase, Popover } from '@mui/material';
import ColorSpace from './color-space';
import HueSlider from './hue-slider';
import {
  clamp,
  hexToHsv,
  hsvToHex,
  isValidHexColor,
  matchIsNumber,
} from '@/features/dashboard/services/flutter-setting/color-utils';
import { HSV } from '../types/color-picker.types';

type ColorPopoverProps = {
  hexText: string;
  setHexText: Dispatch<SetStateAction<string>>;
  currentHsv: HSV;
  setCurrentHsv: Dispatch<SetStateAction<HSV>>;
  handleColorChange: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ColorPopover = ({ hexText, setHexText, currentHsv, setCurrentHsv, handleColorChange }: ColorPopoverProps) => {
  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 6) return;

    setHexText(value);
    if (value.length === 6 && isValidHexColor(value)) {
      setCurrentHsv(hexToHsv(value));
    }
  };
  const handleChangeSpace = (args: { s: number; v: number }) => {
    const { s, v } = args;
    setCurrentHsv((prevState) => ({ ...prevState, s, v }));
  };
  const handleChangeHue = (event: Event, hue: number | number[]) => {
    if (!matchIsNumber(hue)) {
      return;
    }
    const newHue = clamp((360 * hue) / 100, 0, 359);
    setCurrentHsv((prevState) => ({ ...prevState, h: newHue }));
  };

  return (
    <Paper sx={{ padding: '5px', width: '300px' }}>
      <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">선택된 색상</Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <FormControl>
            <InputBase
              type="color"
              value={`#${hsvToHex(currentHsv)}`}
              sx={{ '& .MuiInputBase-input': { cursor: 'pointer', height: 30, width: 27, padding: 0 } }}
            />
          </FormControl>
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

      <ColorSpace currentHue={currentHsv.h} hsv={currentHsv} onChange={handleChangeSpace} />
      <Box>
        <HueSlider
          min={0}
          max={100}
          step={1}
          onChange={handleChangeHue}
          aria-label="hue"
          value={(currentHsv.h * 100) / 360}
        />
      </Box>
      <Stack direction={'row'}>
        <Button variant="contained" disableElevation sx={{ width: '100%' }} onClick={handleColorChange}>
          선택 완료
        </Button>
      </Stack>
    </Paper>
  );
};

export default ColorPopover;

const ColorSquareClass = {
  width: '93px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '5%',
  marginLeft: '1px',
  '& .MuiInputBase-input': { padding: 0 },
  '& .MuiInputAdornment-root': {
    marginRight: '1px',
    paddingBottom: '1px',
    paddingLeft: '1.5px',
  },
  '& .MuiTypography-root': {
    color: 'rgba(0, 0, 0, 0.84)',
  },
};
