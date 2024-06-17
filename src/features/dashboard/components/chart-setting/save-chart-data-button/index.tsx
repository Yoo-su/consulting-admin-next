import { Fab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import InfoIcon from '@mui/icons-material/Info';

import { useUpdateChartDataMutation } from '@/features/dashboard/hooks/tanstack/use-update-chart-data-mutation';
import { useChartSetting } from '@/features/dashboard/hooks/context/use-chart-setting';
import toast from 'react-hot-toast';

const SaveChartDataButton = () => {
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));
  const { hasChanges, syncChartData } = useChartSetting();
  const { mutateAsync } = useUpdateChartDataMutation();

  const handleBtnClick = () => {
    toast.promise(
      mutateAsync().then(() => {
        syncChartData();
      }),
      {
        loading: <Typography variant="body2">차트 정보를 업데이트하는 중입니다...</Typography>,
        success: <Typography variant="body2">차트정보 업데이트 완료!</Typography>,
        error: <Typography variant="body2">차트정보 업데이트 중 문제가 발생했습니다</Typography>,
      }
    );
  };

  if (!hasChanges) return null;
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

export default SaveChartDataButton;
