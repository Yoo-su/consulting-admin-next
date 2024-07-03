import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { Box, Button, FormControl, InputBase, Popover } from '@mui/material';
import ColorSpace from './color-space';
import HueSlider from './hue-slider';
import { hexToHsv, hsvToHex, isValidHexColor } from '@/features/dashboard/services/flutter-setting/color-utils';
import { HSV } from '../types/color-picker.types';

type FlutterColorPickerProps = {
  value: string;
  setTextValue: Dispatch<SetStateAction<string>>;
};

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
