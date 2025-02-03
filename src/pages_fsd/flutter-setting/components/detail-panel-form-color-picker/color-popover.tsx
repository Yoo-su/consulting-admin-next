import { Box, Button, FormControl, InputBase } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';

import { ColorSquareClass, PRE_COLORS } from '../../constants';
import { HSV } from '../../models';
import {
  clamp,
  hexToHsv,
  hsvToHex,
  isValidHexColor,
  matchIsNumber,
} from '../../services';
import { ColorSpace } from './color-space';
import { ColorSquareIcon } from './color-square-icon';
import { HueSlider } from './hue-slider';

type ColorPopoverProps = {
  hexText: string;
  setHexText: Dispatch<SetStateAction<string>>;
  currentHsv: HSV;
  setCurrentHsv: Dispatch<SetStateAction<HSV>>;
  handleColorChange: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ColorPopover = ({
  hexText,
  setHexText,
  currentHsv,
  setCurrentHsv,
  handleColorChange,
}: ColorPopoverProps) => {
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
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="body1">선택된 색상</Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <ColorSquareIcon color={`#${hsvToHex(currentHsv)}`} />
          <FormControl>
            <InputBase
              startAdornment={
                <InputAdornment position="start">0xff</InputAdornment>
              }
              size="small"
              sx={ColorSquareClass}
              value={hexText}
              onChange={handleChangeText}
            />
          </FormControl>
        </Stack>
      </Stack>

      <ColorSpace
        currentHue={currentHsv.h}
        hsv={currentHsv}
        onChange={handleChangeSpace}
      />
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
      <Box>
        {PRE_COLORS.map((color, index) => (
          <ColorSquareIcon
            key={index}
            color={`#${color}`}
            onClick={() => {
              setHexText(color);
              setCurrentHsv(hexToHsv(color));
            }}
          />
        ))}
      </Box>
      <Stack direction={'row'}>
        <Button
          variant="contained"
          disableElevation
          sx={{ width: '100%' }}
          onClick={handleColorChange}
        >
          선택 완료
        </Button>
      </Stack>
    </Paper>
  );
};
