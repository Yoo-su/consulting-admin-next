import { getCurrentServiceYear } from './get-current-service-year';

export const isCurrentServiceYear = (selectedServiceYear: string) => {
  const currentSchoolYear = getCurrentServiceYear();
  return Number(selectedServiceYear) === currentSchoolYear;
};
