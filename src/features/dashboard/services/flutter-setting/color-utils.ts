import { HSV, RGB } from '../../components/flutter-setting/types/color-picker.types';

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function matchIsNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
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

export const hsvToHex = (hsv: HSV) => {
  const rgbObject = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const r = rgbObject.r.toString(16).toUpperCase().padStart(2, '0');
  const g = rgbObject.g.toString(16).toUpperCase().padStart(2, '0');
  const b = rgbObject.b.toString(16).toUpperCase().padStart(2, '0');
  return `${r}${g}${b}`;
};

export function hexToHsv(hex: string): HSV {
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

export const isValidHexColor = (input: string) => {
  const regex = /^([0-9A-Fa-f]{3}){1,2}$/;

  return regex.test(input);
};

export function round(value: number, minimumFractionDigits?: number, maximumFractionDigits?: number): number {
  const formattedValue = value.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return Number(formattedValue);
}
