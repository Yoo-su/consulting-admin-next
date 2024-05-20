import Typography from '@mui/material/Typography';
import UnivServiceCheckGuard from '@/shared/components/guards/univ-service-check-guard';
import Container from '@mui/material/Container';
import FileListTable from '@/features/dashboard/components/consulting-files-setting/file-list-table';
import ConsultingFileSettingsProvider from '@/features/dashboard/contexts/consulting-file-settings-context';

export const metadata = {
  title: '상담앱 관리자 | 상담 자료 관리',
  description: 'consulting files setting',
};

const Page = () => {
  return (
    <UnivServiceCheckGuard>
      <ConsultingFileSettingsProvider>
        <Container>
          <Typography variant="h5">상담 자료 관리</Typography>
          <FileListTable />
        </Container>
      </ConsultingFileSettingsProvider>
    </UnivServiceCheckGuard>
  );
};

export default Page;
