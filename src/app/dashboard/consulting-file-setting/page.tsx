import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FileListTable } from '@/pages_fsd/consulting-file-setting/components';
import { ConsultingFileSettingsProvider } from '@/pages_fsd/consulting-file-setting/contexts';
import { UnivServiceCheckGuard } from '@/shared/components';

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
