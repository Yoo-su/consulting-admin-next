import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import UnivServiceCheckGuard from '@/shared/components/guards/univ-service-check-guard';
import CalendarBox from '@/features/dashboard/components/schedule-setting/calendar-box';

const Page = () => {
  return (
    <UnivServiceCheckGuard>
      <Container>
        <Typography variant="h5">스케줄 설정</Typography>
        <CalendarBox />
      </Container>
    </UnivServiceCheckGuard>
  );
};

export default Page;
