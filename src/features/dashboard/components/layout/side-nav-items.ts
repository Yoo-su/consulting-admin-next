'use client';
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings';
import DifferenceIcon from '@mui/icons-material/Difference';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import UploadIcon from '@mui/icons-material/Upload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { paths } from '@/shared/constants/paths';
import { NavItemType } from '../../types/nav-item.type';

export const sideNavItems1: NavItemType[] = [
  {
    navkey: 'home',
    title: '홈',
    href: paths.dashboard.overview,
    Icon: HomeIcon,
  },
  {
    navkey: 'service-setting',
    title: '서비스 설정',
    href: paths.dashboard.serviceSetting,
    Icon: SettingIcon,
  },
  {
    navkey: 'excel',
    title: '기초 엑셀 업로드',
    href: paths.dashboard.excelUpload,
    Icon: UploadFileIcon,
  },
  {
    navkey: 'excel-library',
    title: '기초 데이터 자료실',
    href: paths.dashboard.excelLibrary,
    Icon: LibraryBooksIcon,
  },
  {
    navkey: 'consulting-files-setting',
    title: '상담 자료 관리',
    href: paths.dashboard.consultingFilesSetting,
    Icon: DifferenceIcon,
  },
  {
    navkey: 'app-deploy',
    title: '상담앱 배포',
    href: paths.dashboard.appDeploy,
    Icon: CloudUploadIcon,
  },
];

export const sideNavItems2: NavItemType[] = [
  {
    navkey: 'consulting-statistic',
    title: '상담 통계',
    href: paths.dashboard.consultingStatistic,
    Icon: AnalyticsIcon,
  },

  {
    navkey: 'mojip-setting',
    title: '모집요강 설정',
    href: paths.dashboard.mojipSetting,
    Icon: NoteAltIcon,
  },
  {
    navkey: 'chart-setting',
    title: '차트데이터 설정',
    href: paths.dashboard.chartSetting,
    Icon: AddchartIcon,
  },
  {
    navkey: 'schedule-setting',
    title: '입시일정 설정',
    href: paths.dashboard.scheduleSetting,
    Icon: EditCalendarIcon,
  },
];

export const sideNavItems3: NavItemType[] = [
  {
    navkey: 'account-setting',
    title: '계정 관리',
    href: paths.dashboard.accountSetting,
    Icon: ManageAccountsIcon,
  },
];
