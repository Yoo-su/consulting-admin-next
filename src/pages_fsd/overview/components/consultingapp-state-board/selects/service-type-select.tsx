import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ServiceType, useStatusBoardStore } from '@/pages_fsd/overview/models';

export const ServiceTypeSelect = () => {
  const selectedServiceType = useStatusBoardStore((state) => state.selectedServiceType);
  const setSelectedServiceType = useStatusBoardStore((state) => state.setSelectedServiceType);
  const serviceMenus = [
    { title: '정시', value: 'J_A' },
    { title: '수시', value: 'S_A' },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedServiceType(event.target.value as ServiceType);
  };

  return (
    <Select value={selectedServiceType} onChange={handleChange} size="small">
      {serviceMenus.map((menu) => (
        <MenuItem key={menu.value} value={menu.value}>
          {menu.title}
        </MenuItem>
      ))}
    </Select>
  );
};
