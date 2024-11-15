import { ReactNode } from 'react';

import AuthGuard from '@/shared/components/guards/auth-guard';
import DashboardLayout from '@/shared/components/layouts/dashboard-layout';
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
