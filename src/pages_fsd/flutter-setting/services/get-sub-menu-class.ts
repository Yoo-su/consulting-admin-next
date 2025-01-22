import { SUB_MENU_SETTING } from '../constants';

export const getSubMenuClass = (
  level: number,
  properties: Array<keyof typeof SUB_MENU_SETTING>
) => {
  return properties.reduce(
    (styles, property) => ({
      ...styles,
      [property]: SUB_MENU_SETTING[property][level],
    }),
    {} as Record<keyof typeof SUB_MENU_SETTING, string | number>
  );
};
