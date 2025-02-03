'use client';

import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { memo, useCallback } from 'react';

import { BROWSER_SORT_OPTIONS } from '@/features/browser/constants/browser-sort-options';

import { useBrowserStore } from '../../models';

export const SortSelect = memo(() => {
  const sortOption = useBrowserStore((state) => state.sortOption);
  const setSortOption = useBrowserStore((state) => state.setSortOption);

  const handleSelectOption = useCallback((event: SelectChangeEvent) => {
    const newOption =
      BROWSER_SORT_OPTIONS.find((option) => option.keyAttribute === event.target.value) ?? BROWSER_SORT_OPTIONS[0];
    setSortOption(newOption);
  }, []);

  return (
    <Select size={'small'} sx={{ height: '30px' }} value={sortOption.keyAttribute} onChange={handleSelectOption}>
      {BROWSER_SORT_OPTIONS.map((browserSortOption) => (
        <MenuItem key={browserSortOption.keyAttribute} value={browserSortOption.keyAttribute}>
          <Typography variant={'caption'}>{browserSortOption.title}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
});
SortSelect.displayName = 'SortSelect';
