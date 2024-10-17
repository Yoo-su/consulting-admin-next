export const getLastFiveServiceYears = (): string[] => {
  const currentYear = new Date().getFullYear() + 1; // 현재 년도
  return Array.from({ length: 5 }, (_, i) => String(currentYear - 4 + i));
};
