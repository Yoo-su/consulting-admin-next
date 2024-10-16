import { getCurrentServiceYear } from '.';

export const isCurrentServiceYear = (selectedServiceYear: string) => {
  const currentSchoolYear = getCurrentServiceYear();
  return Number(selectedServiceYear) === currentSchoolYear;
};
