export const DeveloperChipClass = {
  marginLeft: '3px',
  width: 'fit-content',
  bgcolor: 'rgba(0,0,0,0.75)',
  color: '#fff',
};

export const StateCardClass = {
  p: 1,
  cursor: 'pointer',
  bgcolor: '#fff',
  borderRadius: '.3rem',
  borderColor: 'transparent',
  '&:hover': {
    border: '2px solid rgba(0,0,0,0.2)',
  },
  position: 'relative',
  transition: 'border-color 0.3s ease-in-out',
};

export const StateCardNameClass = {
  bgcolor: '#f3f4f6',
  borderRadius: '5px',
  padding: 0.5,
  width: 'fit-content',
};

export const IconDetailClass = {
  fontSize: '.5rem',
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '.3rem .2rem',
  cursor: 'pointer',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },
  '&:hover': {
    color: 'black',
  },
};

export const IconToGoClass = {
  cursor: 'pointer',
  margin: 0,
  py: 0.5,
  borderRadius: '.2rem',
  '& .MuiSvgIcon-root': {
    fontSize: '.9rem',
  },
  '&:hover': {
    backgroundColor: '#EBFADB',
  },
  transition: 'all 0.1s ease-in-out',
};
