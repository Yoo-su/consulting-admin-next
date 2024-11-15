export const getCurrentServiceYear = () => {
  const currentDate = new Date();
  const currentSchoolYear =
    currentDate.getMonth() + 1 < 4
      ? currentDate.getFullYear()
      : currentDate.getFullYear() + 1;
  return currentSchoolYear;
};
