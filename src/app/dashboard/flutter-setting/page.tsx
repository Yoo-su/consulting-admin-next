import Box from '@mui/material/Box';

import { DupService, FlutterSettingContainer } from '@/pages_fsd/flutter-setting/components';
import { FlutterSettingProvider } from '@/pages_fsd/flutter-setting/contexts';
import { UnivServiceCheckGuard } from '@/shared/components';

export const metadata = {
  title: '상담앱 관리자 | 앱 사용자 설정',
  description: 'Generated by Next.js',
};

const Page = () => {
  return (
    <UnivServiceCheckGuard>
      <FlutterSettingProvider>
        <Box sx={{ minWidth: '752px' }}>
          <DupService />
          <FlutterSettingContainer />
        </Box>
      </FlutterSettingProvider>
    </UnivServiceCheckGuard>
  );
};

export default Page;
