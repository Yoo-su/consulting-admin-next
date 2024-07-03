import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { Box, Button, FormControl, InputBase, Popover } from '@mui/material';
import ColorSpace from './color-space';
import HueSlider from './hue-slider';

type FlutterColorPickerProps = {
  value: string;
  setTextValue: Dispatch<SetStateAction<string>>;
};
type HSV = { h: number; s: number; v: number };

const FlutterColorPicker = ({ value, setTextValue }: FlutterColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [currentHsv, setCurrentHsv] = useState<HSV>(hexToHsv(value));
  const [hexText, setHexText] = useState<string>(value.replace('0xff', '').toUpperCase());

  const handleColorChange = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setTextValue(`0xff${hsvToHex(currentHsv)}`);
  };
  const handleClose = () => {
    setIsOpen(false);
    setCurrentHsv(hexToHsv(value));
  };
  const handleIconClick = (event: MouseEvent<SVGSVGElement>) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };
  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexText(value);
    if (value.length === 6 && isValidHexColor(value)) {
      setCurrentHsv(hexToHsv(value));
    }
  };
  const handleChangeSpace = (args: { s: number; v: number }) => {
    const { s, v } = args;
    // const tinyColor = {
    //   h: currentHsv.h,
    //   a: 0,
    //   s: s,
    //   v: v,
    // };
    setCurrentHsv((prevState) => ({ ...prevState, s, v }));
    // onChange?.(buildValueFromTinyColor(tinyColor, format));
  };
  const handleChangeHue = (event: Event, hue: number | number[]) => {
    if (!matchIsNumber(hue)) {
      return;
    }
    const newHue = clamp((360 * hue) / 100, 0, 359);
    setCurrentHsv((prevState) => ({ ...prevState, h: newHue }));
    // const tinyColor = {
    //   ...currentHsv,
    //   a: 0,
    //   h: newHue,
    // };
    // onChange?.(buildValueFromTinyColor(tinyColor, format));
  };

  useEffect(() => {
    setHexText(hsvToHex(currentHsv));
  }, [currentHsv]);

  return (
    <>
      <SquareRoundedIcon
        sx={{
          marginLeft: '-4px',
          paddingRight: '.5rem',
          paddingTop: '1px',
          '&:hover': {
            cursor: 'pointer',
          },
          color: `#${value.substring(4, 12)}`,
        }}
        onClick={handleIconClick}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
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
                  sx={{
                    width: '90px',
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
                  }}
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
      </Popover>
    </>
  );
};

export default FlutterColorPicker;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function matchIsNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function hsvToRgb(h: number, s: number, v: number) {
  h = h % 360;

  // Check if s and v are in decimal form (0-1) or percentage form (0-100)
  s = s > 1 ? s / 100 : s;
  v = v > 1 ? v / 100 : v;

  // Ensure s and v are within 0-1 range
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;
  switch (Math.floor(h / 60)) {
    case 0:
      [r, g, b] = [c, x, 0];
      break;
    case 1:
      [r, g, b] = [x, c, 0];
      break;
    case 2:
      [r, g, b] = [0, c, x];
      break;
    case 3:
      [r, g, b] = [0, x, c];
      break;
    case 4:
      [r, g, b] = [x, 0, c];
      break;
    default: // case 5
      [r, g, b] = [c, 0, x];
      break;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

const hsvToHex = (hsv: HSV) => {
  const rgbObject = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const r = rgbObject.r.toString(16).toUpperCase().padStart(2, '0');
  const g = rgbObject.g.toString(16).toUpperCase().padStart(2, '0');
  const b = rgbObject.b.toString(16).toUpperCase().padStart(2, '0');
  return `${r}${g}${b}`;
};

function hexToHsv(hex: string) {
  // Remove the hash if it's there
  hex = hex.replace('0xff', '');

  // Parse the hex string
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 8), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = max === 0 ? 0 : (diff / max) * 100;
  let v = max * 100;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h *= 60;
  }

  // // Ensure h is between 0 and 360
  // h = Math.round((h + 360) % 360);

  // // Round s and v to two decimal places
  // s = Math.round(s * 100) / 100;
  // v = Math.round(max * 100);
  h = Math.round((h * 100) / 100);
  s = Math.round((s * 100) / 100);
  v = Math.round((v * 100) / 100);
  return { h, s, v };
}

const isValidHexColor = (input: string) => {
  const regex = /^([0-9A-Fa-f]{3}){1,2}$/;

  return regex.test(input);
};
