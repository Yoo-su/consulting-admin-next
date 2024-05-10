import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CalendarBox from '@/features/dashboard/components/schedule-setting/calendar-box';

const Page = () => {
  return (
    <Container>
      <Typography variant="h5">스케줄 설정</Typography>
      <CalendarBox />
    </Container>
  );
};

export default Page;
