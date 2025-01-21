import { getServiceYear } from '@/shared/lib/date/service-year';

export const getLastFiveServiceYears = (): string[] => {
  const currentYear = getServiceYear();
  return Array.from({ length: 5 }, (_, i) => String(currentYear - 4 + i));
};
