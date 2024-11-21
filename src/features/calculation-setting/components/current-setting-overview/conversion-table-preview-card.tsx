import { Box, SxProps, Typography } from '@mui/material';

const ConversionTablePreviewCard = () => {
  return (
    <Box sx={previewCardStyles}>
      <Typography variant={'h5'}>Conversion Table 설정</Typography>
      <Typography variant={'h6'}>현재 ConfigID: 1</Typography>
      <Typography variant={'h6'}>현재 MethodID: 2</Typography>
    </Box>
  );
};

const previewCardStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  bgcolor: '#3d5168',
  color: '#fff',
  borderRadius: '1rem',
  padding: 2,
  flexGrow: 2,
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'scale(0.98)',
  },
  transition: 'transform 0.1s ease-in',
};
export default ConversionTablePreviewCard;
