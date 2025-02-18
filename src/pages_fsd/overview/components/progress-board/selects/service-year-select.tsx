import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useBoardStore } from '@/pages_fsd/overview/models';
import { getLastFiveServiceYears } from '@/pages_fsd/overview/services';

export const ServiceYearSelect = () => {
  const selectedServiceYear = useBoardStore((state) => state.selectedServiceYear);
  const setSelectedServiceYear = useBoardStore((state) => state.setSelectedServiceYear);
  const recentFiveServiceYears = getLastFiveServiceYears();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedServiceYear(event.target.value);
  };

  return (
    <Select value={selectedServiceYear} onChange={handleChange} size="small">
      {recentFiveServiceYears.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
};
