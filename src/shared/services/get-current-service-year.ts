export const getCurrentServiceYear = () => {
  const currentDate = new Date();
  const currentSchoolYear =
    currentDate.getMonth() + 1 < 4
      ? currentDate.getFullYear()
      : currentDate.getFullYear() + 1;
  return currentSchoolYear;
};

export const getCurrentServiceType = () => {
  const currentDate = new Date();
  const currentSchoolType =
    currentDate.getMonth() + 1 > 3 && currentDate.getMonth() + 1 < 8
      ? 'susi'
      : 'jungsi';
  return currentSchoolType;
};
