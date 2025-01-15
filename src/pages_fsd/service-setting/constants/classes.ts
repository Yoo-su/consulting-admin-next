export const textFieldStyle = {
  '& .MuiInputBase-root': {
    '&:before': {
      borderBottomStyle: 'hidden !important',
    },
  },
  '& .MuiInputBase-input': {
    maxWidth: '80px',
    padding: '0 .5rem',
    backgroundColor: '#fafafa',
    borderRadius: '.3rem',
    WebkitTextFillColor: '#424242 !important',
  },
};

export const loadingButtonStyle = {
  backgroundColor: '#2C4059',
  color: '#fafafa',
  '&:hover': {
    backgroundColor: '#2C4059',
    color: '#fafafa',
  },
};

export const unselectedIconFilter = 'grayscale(1) opacity(.5)';
