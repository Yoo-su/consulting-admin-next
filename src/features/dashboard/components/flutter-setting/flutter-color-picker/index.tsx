import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box, Button, FormControl, InputBase } from '@mui/material';
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
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setTextValue(rgbToHex(currentHsv, true));
  };
  const handleCancel = () => {
    setIsOpen(false);
    setCurrentHsv(hexToHsv(value));
  };
  const handleIconClick = (event: MouseEvent<SVGSVGElement>) => {
    console.log('clicked');
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
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
      <Popper open={isOpen} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ padding: '5px', width: '300px' }} ref={colorPickerRef}>
              <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="body1">선택된 색상</Typography>
                <Stack direction={'row'} alignItems={'center'}>
                  <FormControl>
                    <InputBase
                      type="color"
                      value={rgbToHex(currentHsv)}
                      sx={{ '& .MuiInputBase-input': { cursor: 'pointer', height: 30, width: 27, padding: 0 } }}
                    />
                  </FormControl>
                  <TextField
                    size="small"
                    sx={{ width: '85px', '& .MuiInputBase-input': { textAlign: 'center', padding: 0 } }}
                    value={rgbToHex(currentHsv, true)}
                  />
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
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ width: '100%', borderRadius: '5px  0 0 5px' }}
                  onClick={handleColorChange}
                >
                  선택 완료
                </Button>
                <Button variant="outlined" sx={{ width: '30%', borderRadius: '0 5px 5px 0' }} onClick={handleCancel}>
                  취소
                </Button>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
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
  // Ensure input values are in the correct range
  h = Math.max(0, Math.min(360, h)) / 360; // Convert hue to 0-1 range
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
      break;
  }

  // Convert RGB values to 0-255 range
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

const rgbToHex = (hsv: HSV, flutter: boolean = false) => {
  const rgbObject = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const r = rgbObject.r.toString(16).padStart(2, '0');
  const g = rgbObject.g.toString(16).padStart(2, '0');
  const b = rgbObject.b.toString(16).padStart(2, '0');
  if (flutter) return `0xff${r}${g}${b}`;
  return `#${r}${g}${b}`;
};

function hexToHsv(hex: string) {
  // Remove the hash if it's there

  console.log('hex', hex.slice(4, 6), hex.slice(6, 8), hex.slice(8, 10));
  // Parse the hex string
  const r = parseInt(hex.slice(4, 6), 16) / 255;
  const g = parseInt(hex.slice(6, 8), 16) / 255;
  const b = parseInt(hex.slice(8, 10), 16) / 255;

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

  // Ensure h is between 0 and 360
  h = Math.round((h + 360) % 360);

  // Round s and v to two decimal places
  s = Math.round(s * 100) / 100;
  v = Math.round(max * 100);

  return { h, s, v };
}
