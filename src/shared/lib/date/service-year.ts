export const getServiceYear = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  if (currentMonth < 4) {
    return currentYear;
  } else {
    return currentYear + 1;
  }
};
