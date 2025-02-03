import { ReactNode } from 'react';

import { AuthLayout, GuestGuard } from '@/shared/components';

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
