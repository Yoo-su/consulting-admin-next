import { ReactNode } from 'react';

import { AuthGuard, DashboardLayout } from '@/shared/components';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
