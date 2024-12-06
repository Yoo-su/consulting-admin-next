import InfoIcon from '@mui/icons-material/Info';
import { Fab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { animated, useSpring } from '@react-spring/web';

type SaveDataButtonProps = {
  handleBtnClick: () => void;
};
export const SaveDataButton = ({ handleBtnClick }: SaveDataButtonProps) => {
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));
  const AnimatedFab = animated(Fab);
  const props = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <AnimatedFab
      variant="extended"
      color="primary"
      size={downsm ? 'small' : 'large'}
      style={{ ...props }}
      sx={{
        width: 'fit-content',
        ...(downsm
          ? { my: 2, mx: 'auto' }
          : { position: 'fixed', bottom: 35, right: 35 }),
      }}
      onClick={handleBtnClick}
    >
      <InfoIcon fontSize="inherit" sx={{ mr: 1 }} />
      <Typography variant="body1" fontSize="inherit">
        변경사항이 존재합니다. 버튼을 눌러 변경내용을 적용해주세요
      </Typography>
    </AnimatedFab>
  );
};
