import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useShallow } from 'zustand/shallow';

import { BROWSER_SORT_OPTIONS } from '@/shared/constants/browser-sort-options';
import { useBrowserStore } from '@/shared/models';

const SortSelect = () => {
  const { sortOption, setSortOption } = useBrowserStore(
    useShallow((state) => ({
      sortOption: state.sortOption,
      setSortOption: state.setSortOption,
    }))
  );

  const handleSelectOption = (event: SelectChangeEvent) => {
    const newOption =
      BROWSER_SORT_OPTIONS.find(
        (option) => option.keyAttribute === event.target.value
      ) ?? BROWSER_SORT_OPTIONS[0];
    setSortOption(newOption);
  };

  return (
    <Select
      size={'small'}
      sx={{ height: '30px' }}
      value={sortOption.keyAttribute}
      onChange={handleSelectOption}
    >
      {BROWSER_SORT_OPTIONS.map((browserSortOption) => (
        <MenuItem
          key={browserSortOption.keyAttribute}
          value={browserSortOption.keyAttribute}
        >
          <Typography variant={'caption'}>{browserSortOption.title}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortSelect;
