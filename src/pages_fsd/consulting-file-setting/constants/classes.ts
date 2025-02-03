export const TableContainerBoxStyle = {
  backgroundColor: 'var(--mui-palette-background-paper)',
  color: 'var(--mui-palette-text-primary)',
  WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow: 'var(--mui-shadows-1)',
  backgroundImage: 'var(--mui-overlays-1)',
  width: '100%',
  overflowX: 'auto',
};
export const TableBoxStyle = {
  display: 'table',
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: '0',
};
export const TableRowBoxStyle = {
  color: 'inherit',
  display: 'flex',
  verticalAlign: 'middle',
  justifyContent: 'space-between',
  outline: '0',
  width: '100%',
  backgroundColor: 'var(--mui-palette-background-paper)',
};

export const CellBoxCustomWidthStyle = {
  padding: '16px ',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '400',
  fontSize: '0.875rem',
  lineHeight: '1.43',
  letterSpacing: '0.01071em',
  verticalAlign: 'inherit',
  borderBottom: '1px solid var(--mui-palette-TableCell-border)',
  color: 'var(--mui-palette-text-primary)',
};

export const DownloaderClass = {
  minWidth: '350px',
  '& .MuiButton-icon': {
    margin: 0,
    paddingRight: '2px',
    paddingTop: '2px',
  },
};

export const NameEditorClass = {
  '& .MuiInputBase-input': {
    width: 'calc(100%)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  '& .MuiInput-root': {
    '&.Mui-disabled:before': {
      border: '0px solid black',
    },
    '&.Mui-disabled:hover:before': {
      border: '0px solid black',
    },
    '&:before': {
      borderBottom: '1px solid #1976d2',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #1976d2',
    },
  },
  '& .MuiInput-input': {
    fontSize: '0.875rem',
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: '#777 !important',
    letterSpacing: '0.1rem',
    '& .MuiSvgIcon-root': {
      width: '.8rem',
      color: '#9e9e9e',
    },
  },
  '& .MuiSvgIcon-root': {
    width: '1rem',
    color: '#1976d2',
  },
};
