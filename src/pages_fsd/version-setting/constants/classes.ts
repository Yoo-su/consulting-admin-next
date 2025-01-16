import { MIN_LIST_LENGTH } from './version-server';

export const TableContainerClass = {
  mt: { xs: 1, sm: 3, md: 3, lg: 3, xl: 5 },
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '1rem',
  p: 2,
};

export const ArrowButtonClass = {
  borderRadius: '.2rem',
  width: '1.3em',
  height: '1.3em',
  '&:hover': {
    backgroundColor: '#E0E0E0',
  },
};

export const TableBodyClass = {
  '& .MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      backgroundColor: '#FDFDFD',
    },
  },
};

export const TableCellClass = {
  padding: '8px 10px',
};

export const SelectClass = {
  '& .MuiSelect-select': {
    padding: '2px 4px',
    margin: 0,
    fontFamily: '__IBM_Plex_Sans_KR_e39452,__IBM_Plex_Sans_KR_Fallback_e39452',
    fontSize: '1.25rem',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    fontWeight: '700',
    minWidth: '55px !important',
  },
};

export const TableRowClass = (listLength: number) => {
  return {
    height: listLength < MIN_LIST_LENGTH ? `${200 / listLength}px` : 0,
  };
};
