import { Box, SxProps, Typography } from '@mui/material';

import { useGetCalcConfigQuery } from '../../hooks';

type ConfigPreviewCardProps = {
  serviceID: string;
};
const ConfigPreviewCard = ({ serviceID }: ConfigPreviewCardProps) => {
  const { data } = useGetCalcConfigQuery(serviceID);

  return (
    <Box sx={previewCardStyles}>
      <Typography variant={'h5'}>Config 설정</Typography>
      <Typography variant={'h6'}>설정 개수: </Typography>
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
  bgcolor: '#5d7b6f',
  color: '#fff',
  borderRadius: '1rem',
  padding: 2,
  flexGrow: 1,
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'scale(0.98)',
  },
  transition: 'transform 0.1s ease-in',
};
export default ConfigPreviewCard;
