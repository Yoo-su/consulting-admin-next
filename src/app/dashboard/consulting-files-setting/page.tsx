import Typography from '@mui/material/Typography';
import UnivServiceCheckGuard from '@/shared/components/guards/univ-service-check-guard';
import Box from '@mui/material/Box';

import FileListTable from '@/features/consulting-files-setting/components/file-list-table';
import ConsultingFileSettingsProvider from '@/features/consulting-files-setting/contexts';

export const metadata = {
  title: '상담앱 관리자 | 상담 자료 관리',
  description: 'consulting files setting',
};

const Page = () => {
  return (
    <UnivServiceCheckGuard>
      <ConsultingFileSettingsProvider>
        <Box>
          <Typography variant="h5">상담 자료 관리</Typography>
          <FileListTable />
        </Box>
      </ConsultingFileSettingsProvider>
    </UnivServiceCheckGuard>
  );
};

export default Page;
