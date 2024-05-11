import { ReactNode } from 'react';
import DashboardLayout from '@/features/dashboard/components/layout';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
