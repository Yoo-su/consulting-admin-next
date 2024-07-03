import { Box, styled } from '@mui/material';
import { useCallback, useEffect, useRef, useState, MouseEvent, KeyboardEvent } from 'react';
import { ARROW_COLOR_SPACE, KEYBOARD_KEY } from '../types/color-picker.types';
import { clamp } from '.';

type ColorSpaceProps = {
  hsv: { h: number; s: number; v: number };
  currentHue: number;
  onChange: (args: { s: number; v: number }) => void;
};

const ColorSpace = (props: ColorSpaceProps) => {
  const { hsv, onChange, currentHue } = props;
  const isPointerDown = useRef<boolean>(false);
  const spaceRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const moveThumb = useEvent((clientX: number, clientY: number) => {
    if (!spaceRef.current) {
      return;
    }

    const { x, y } = getNewThumbPosition(spaceRef.current, clientX, clientY);
    onChange({
      s: x,
      v: y,
    });

    if (spaceRef.current && document.activeElement !== spaceRef.current) {
      spaceRef.current.focus();
    }
  });

  const handlePointerUp = useCallback(() => {
    if (isPointerDown.current) {
      isPointerDown.current = false;
      setIsActive(false);
    }
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (isPointerDown.current) {
      moveThumb(event.clientX, event.clientY);
    }
    // moveThumb is a useEvent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove, false);
    document.addEventListener('pointerup', handlePointerUp, false);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove, false);
      document.removeEventListener('pointerup', handlePointerUp, false);
    };
  }, [handlePointerUp, handlePointerMove]);

  const handlePointerDown = (event: MouseEvent<HTMLDivElement, PointerEvent>) => {
    event.preventDefault();
    isPointerDown.current = true;
    moveThumb(event.clientX, event.clientY);
    setIsActive(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (matchIsArrowKey(event.key)) {
      event.preventDefault();
      const { type, value } = ARROW_COLOR_SPACE[event.key];
      const step = event.shiftKey ? 10 : 1;
      const previousHsvTypeValue = type === 'hsvS' ? hsv.s : hsv.v;
      const newHsvTypeValue = clamp(previousHsvTypeValue + value * step * 0.01, 0, 1);
      setIsActive(true);
      onChange({
        s: type === 'hsvS' ? newHsvTypeValue : hsv.s,
        v: type === 'hsvV' ? newHsvTypeValue : hsv.v,
      });
    }
  };

  const saturationInPercent = hsv.s * 100;
  const valueInPercent = hsv.v * 100;

  return (
    <SpaceBox
      onPointerDown={handlePointerDown}
      ref={spaceRef}
      className="MuiColorInput-ColorSpace"
      style={{
        backgroundColor: `hsl(${currentHue} 100% 50%)`,
        touchAction: 'none',
      }}
      role="slider"
      aria-valuetext={`Saturation ${round(saturationInPercent, 0, 0)}%, Brightness ${round(valueInPercent, 0, 0)}%`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ThumbBox
        aria-label="Color space thumb"
        className={isActive ? 'MuiColorInput-Thumb-active' : ''}
        style={{
          left: `${saturationInPercent}%`,
          bottom: `${valueInPercent}%`,
        }}
      />
    </SpaceBox>
  );
};

export default ColorSpace;

const BG_IMAGE_SPACE =
  'linear-gradient(to top, #000000, transparent), linear-gradient(to right, #ffffff, transparent) /*! @noflip */';
const SpaceBox = styled(Box)({
  width: '100%',
  height: '180px',
  boxSizing: 'border-box',
  outline: 0,
  position: 'relative',
  backgroundImage: BG_IMAGE_SPACE,
});
const ThumbBox = styled(Box)({
  position: 'absolute',
  border: '3px solid #ffffff',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  marginLeft: '-10px /*! @noflip */',
  marginBottom: '-10px /*! @noflip */',
  outline: 0,
  boxSizing: 'border-box',
  willChange: 'left, bottom',
  transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

  '&:hover': {
    boxShadow: `0px 0px 0px 4px rgba(255 255 255 / 0.16)`,
  },

  '&.MuiColorInput-Thumb-active': {
    boxShadow: `0px 0px 0px 8px rgba(255 255 255 / 0.16)`,
  },

  '@media (hover: none)': {
    boxShadow: 'none',
  },
});

function matchIsArrowKey(key: string): key is keyof typeof ARROW_COLOR_SPACE {
  return (
    key === KEYBOARD_KEY.up || key === KEYBOARD_KEY.down || key === KEYBOARD_KEY.left || key === KEYBOARD_KEY.right
  );
}

function round(value: number, minimumFractionDigits?: number, maximumFractionDigits?: number): number {
  const formattedValue = value.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return Number(formattedValue);
}

function getNewThumbPosition(colorSpace: HTMLDivElement, clientX: number, clientY: number): { x: number; y: number } {
  const boundingClientRect = colorSpace.getBoundingClientRect();
  const positionX = clientX - boundingClientRect.left;
  const positionY = clientY - boundingClientRect.top;

  return {
    x: clamp(positionX / boundingClientRect.width, 0, 1),
    y: clamp(1 - positionY / boundingClientRect.height, 0, 1),
  };
}

type Fn = (...args: any[]) => void;

function useEvent(fn: Fn): Fn {
  const fnRef = useRef<Fn>();

  fnRef.current = fn;

  return useCallback((...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return fnRef.current?.(...args);
  }, []);
}
