export const isCurrentServiceYear = (selectedServiceYear: string) => {
  const currentDate = new Date();
  const currentSchoolYear = currentDate.getMonth() + 1 < 4 ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
  return Number(selectedServiceYear) === currentSchoolYear;
};
