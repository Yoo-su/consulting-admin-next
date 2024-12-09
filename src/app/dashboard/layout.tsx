import { ReactNode } from 'react';

import { AuthGuard, DashboardLayout } from '@/shared/components';
import { UnivServiceProvider } from '@/shared/contexts';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <UnivServiceProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </UnivServiceProvider>
    </AuthGuard>
  );
};

export default Layout;
