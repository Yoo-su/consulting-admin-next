import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';

import { HSV, PreColors } from '../../models';
import { clamp, hexToHsv, isValidHexColor, matchIsNumber } from '../../services';
import { ColorPickerSpace } from './color-picker-space';
import { ColorPopoverHeader } from './color-popover-header';
import { ColorPopoverPrecolor } from './color-popover-precolor';
import { HueSlider } from './hue-slider.styled';

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
  const handleChangeHue = (_: Event, hue: number | number[]) => {
    if (!matchIsNumber(hue)) {
      return;
    }
    const newHue = clamp((360 * hue) / 100, 0, 359);
    setCurrentHsv((prevState) => ({ ...prevState, h: newHue }));
  };
  const handlePrecolorChange = (color: PreColors) => {
    setHexText(color);
    setCurrentHsv(hexToHsv(color));
  };

  return (
    <Paper sx={{ padding: '5px', width: '300px' }}>
      <ColorPopoverHeader hexText={hexText} currentHsv={currentHsv} handleChangeText={handleChangeText} />

      <ColorPickerSpace currentHue={currentHsv.h} hsv={currentHsv} onChange={handleChangeSpace} />
      <HueSlider
        min={0}
        max={100}
        step={1}
        onChange={handleChangeHue}
        aria-label="hue"
        value={(currentHsv.h * 100) / 360}
      />
      <ColorPopoverPrecolor handlePrecolorChange={handlePrecolorChange} />
      <Stack direction={'row'}>
        <Button variant="contained" disableElevation sx={{ width: '100%' }} onClick={handleColorChange}>
          선택 완료
        </Button>
      </Stack>
    </Paper>
  );
};
