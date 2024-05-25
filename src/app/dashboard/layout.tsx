import { ReactNode } from 'react';
import AuthGuard from '@/shared/components/guards/auth-guard';
import UnivServiceProvider from '@/features/dashboard/contexts/univ-service-context';
import DashboardLayout from '@/features/dashboard/components/layout';
import { Univ } from '@/features/dashboard/types/univ.type';
import { apiUrls } from '@/shared/constants/api-urls';

type Props = {
  children: ReactNode;
};
const Layout = async ({ children }: Props) => {
  const univList = await getUnivList();
  return (
    <AuthGuard>
      <UnivServiceProvider univs={univList}>
        <DashboardLayout>{children}</DashboardLayout>
      </UnivServiceProvider>
    </AuthGuard>
  );
};

type GetUnivListResponse = {
  UnivID: string;
  UnivName: string;
  UnivAddress: string;
  Longitude: string;
  Latitude: string;
  isActive: boolean;
};
async function getUnivList() {
  try {
    const result = await fetch(`${process.env.BASE_URL}${apiUrls.admin.getUnivList}`, {
      next: { revalidate: false },
    });
    const jsonData = await result.json();
    const transformed: Univ[] = jsonData.map((item: GetUnivListResponse) => {
      return {
        univID: item.UnivID,
        univName: item.UnivName,
        univAddress: item.UnivAddress,
        longitude: item.Longitude,
        latitude: item.Latitude,
        isActive: item.isActive,
      };
    });
    return transformed.filter((item) => item.isActive === true);
  } catch (error) {
    return [];
  }
}

export default Layout;
