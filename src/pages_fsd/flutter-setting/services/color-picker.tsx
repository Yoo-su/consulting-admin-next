import { useCallback, useRef } from 'react';
import { ARROW_COLOR_SPACE, KEYBOARD_KEY } from '../constants';
import { clamp } from './color-calculation';

export function matchIsArrowKey(key: string): key is keyof typeof ARROW_COLOR_SPACE {
  return (
    key === KEYBOARD_KEY.up || key === KEYBOARD_KEY.down || key === KEYBOARD_KEY.left || key === KEYBOARD_KEY.right
  );
}

export function getNewThumbPosition(
  colorPickerSpace: HTMLDivElement,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const boundingClientRect = colorPickerSpace.getBoundingClientRect();
  const positionX = clientX - boundingClientRect.left;
  const positionY = clientY - boundingClientRect.top;

  return {
    x: clamp(positionX / boundingClientRect.width, 0, 1),
    y: clamp(1 - positionY / boundingClientRect.height, 0, 1),
  };
}

type Fn = (...args: any[]) => void;

export function useEvent(fn: Fn): Fn {
  const fnRef = useRef<Fn>();

  fnRef.current = fn;

  return useCallback((...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return fnRef.current?.(...args);
  }, []);
}
