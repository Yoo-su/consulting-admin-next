import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useStatusBoardStore } from '@/features/overview/models';
import { getLastFiveServiceYears } from '@/features/overview/services';

const ServiceYearSelect = () => {
  const { selectedServiceYear, setSelectedServiceYear } = useStatusBoardStore();
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

export default ServiceYearSelect;
