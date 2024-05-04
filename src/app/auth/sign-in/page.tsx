import Layout from '@/features/auth/components/layout';
import SignInForm from '@/features/auth/components/sign-in-form';
import GuestGuard from '@/features/auth/components/guest-guard';

const Page = () => {
  return (
    <GuestGuard>
      <Layout>
        <SignInForm />
      </Layout>
    </GuestGuard>
  );
};

export default Page;
