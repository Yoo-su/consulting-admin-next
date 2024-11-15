import { ReactNode } from 'react';

import GuestGuard from '@/shared/components/guards/guest-guard';
import AuthLayout from '@/shared/components/layouts/auth-layout';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
};

export default Layout;
