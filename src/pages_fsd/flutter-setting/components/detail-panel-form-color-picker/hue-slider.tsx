import { Slider, SliderProps, styled } from '@mui/material';

type HueSliderProps = SliderProps;

export const HueSlider = (props: HueSliderProps) => {
  return <StyledSlider {...props} />;
};

const StyledSlider = styled(Slider)({
  height: 8,

  '& .MuiSlider-rail': {
    opacity: 1,
    background:
      'linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%) /*! @noflip */',
  },

  '& .MuiSlider-track': {
    color: 'transparent',
    border: 0,
  },

  '& .MuiSlider-thumb': {
    backgroundColor: '#ffffff',
    border: '3px solid currentColor',
  },
});
