import { ReactNode } from 'react';

import AuthLayout from '@/shared/components/layouts/auth-layout';
import GuestGuard from '@/shared/components/guards/guest-guard';

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
