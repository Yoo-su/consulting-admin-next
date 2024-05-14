import { ReactNode } from 'react';
import AuthGuard from '@/shared/components/guards/auth-guard';
import UnivServiceProvider from '@/shared/contexts/univ-service-context';
import DashboardLayout from '@/features/dashboard/components/layout';

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
