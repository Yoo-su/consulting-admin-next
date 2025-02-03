import { ArrowColorSpace } from '../models';

export const PRE_COLORS = [
  'E03131',
  'F2C94C',
  '219653',
  '2F80ED',
  '9B51E0',
  'F2994A',
  'EB5757',
  '56CCF2',
  '2D9CDB',
] as const;

export const BG_IMAGE_SPACE =
  'linear-gradient(to top, #000000, transparent), linear-gradient(to right, #ffffff, transparent) /*! @noflip */' as const;

export const ARROW_COLOR_SPACE: ArrowColorSpace = {
  ArrowUp: {
    type: 'hsvV',
    value: +1,
  },
  ArrowDown: {
    type: 'hsvV',
    value: -1,
  },
  ArrowLeft: {
    type: 'hsvS',
    value: -1,
  },
  ArrowRight: {
    type: 'hsvS',
    value: +1,
  },
};

export const KEYBOARD_KEY: Record<string, KeyboardEvent['key']> = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};
