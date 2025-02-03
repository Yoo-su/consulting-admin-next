import { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { ARROW_COLOR_SPACE } from '../../constants';
import { clamp, getNewThumbPosition, matchIsArrowKey, round, useEvent } from '../../services';
import { SpaceBox } from './color-picker-space-box.styled';
import { ThumbBox } from './color-picker-thumb-box.styled';

type ColorPickerSpaceProps = {
  hsv: { h: number; s: number; v: number };
  currentHue: number;
  onChange: (args: { s: number; v: number }) => void;
};

export const ColorPickerSpace = (props: ColorPickerSpaceProps) => {
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

  const saturationInPercent = hsv.s <= 1 ? hsv.s * 100 : hsv.s;
  const valueInPercent = hsv.v <= 1 ? hsv.v * 100 : hsv.v;

  return (
    <SpaceBox
      onPointerDown={handlePointerDown}
      ref={spaceRef}
      className="MuiColorInput-ColorPickerSpace"
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
