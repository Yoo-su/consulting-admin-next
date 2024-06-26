import { Fab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import InfoIcon from '@mui/icons-material/Info';

type SaveDataButtonProps = {
  handleBtnClick: () => void;
};
const SaveDataButton = ({ handleBtnClick }: SaveDataButtonProps) => {
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fab
      variant="extended"
      color="primary"
      size={downsm ? 'small' : 'large'}
      sx={{
        width: 'fit-content',
        ...(downsm ? { my: 2, mx: 'auto' } : { position: 'fixed', bottom: 35, right: 35 }),
      }}
      onClick={handleBtnClick}
    >
      <InfoIcon fontSize="inherit" sx={{ mr: 1 }} />
      <Typography variant="body1" fontSize="inherit">
        변경사항이 존재합니다. 버튼을 눌러 변경내용을 적용해주세요
      </Typography>
    </Fab>
  );
};

export default SaveDataButton;
