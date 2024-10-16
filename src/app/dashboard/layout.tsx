import { ReactNode } from 'react';
import AuthGuard from '@/shared/components/guards/auth-guard';
import { UnivServiceProvider } from '@/shared/contexts';
import DashboardLayout from '@/shared/components/layouts/dashboard-layout';

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
