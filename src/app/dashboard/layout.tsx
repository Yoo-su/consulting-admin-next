import { ReactNode } from 'react';
import DashboardLayout from '@/features/dashboard/components/layout';
import ServiceCheckGuard from '@/shared/components/guards/univ-service-check-guard';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <DashboardLayout>
      <ServiceCheckGuard>{children}</ServiceCheckGuard>
    </DashboardLayout>
  );
};

export default Layout;
