import FoundationLibraryListBox from '@/features/dashboard/components/excel-library';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import UnivServiceCheckGuard from '@/shared/components/guards/univ-service-check-guard';

const Page = () => {
  return (
    <UnivServiceCheckGuard>
      <Container>
        <Typography variant="h5">기초데이터 엑셀 자료실</Typography>
        <FoundationLibraryListBox />
      </Container>
    </UnivServiceCheckGuard>
  );
};

export default Page;
