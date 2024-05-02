'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/features/auth/components/layout';
import SignInForm from '@/features/auth/components/sign-in-form';
import { useUser } from '@/features/auth/hooks/use-user';
import { paths } from '@/shared/constants/paths';

const Page = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) return;
  if (user) {
    router.replace(paths.dashboard.overview);
    return;
  }
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
};

export default Page;
