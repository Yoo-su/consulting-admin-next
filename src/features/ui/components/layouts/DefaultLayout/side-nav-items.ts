'use client';
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings';
import DifferenceIcon from '@mui/icons-material/Difference';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BackupIcon from '@mui/icons-material/Backup';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { NavItemType } from './types';

export const sideNavItems1: NavItemType[] = [
  {
    navkey: 'home',
    title: '홈',
    href: '/',
    Icon: HomeIcon,
  },
  {
    navkey: 'service-setting',
    title: '서비스 설정',
    href: '/service-setting',
    Icon: SettingIcon,
  },
  {
    navkey: 'manage-consulting-files',
    title: '상담 자료 관리',
    href: '/manage-consulting-files',
    Icon: DifferenceIcon,
  },
  {
    navkey: 'excel',
    title: '기초 엑셀 업로드',
    href: '/excel',
    Icon: FileUploadIcon,
  },
  {
    navkey: 'mojip-setting',
    title: '모집요강 설정',
    href: '/mojip-setting',
    Icon: NoteAltIcon,
  },
  {
    navkey: 'chart-setting',
    title: '차트데이터 설정',
    href: '/chart-setting',
    Icon: AddchartIcon,
  },
  {
    navkey: 'schedule-setting',
    title: '입시일정 설정',
    href: '/schedule-setting',
    Icon: EditCalendarIcon,
  },
];

export const sideNavItems2: NavItemType[] = [
  {
    navkey: 'consulting-statistic',
    title: '상담 통계',
    href: '/consulting-statistic',
    Icon: AnalyticsIcon,
  },
  {
    navkey: 'excel-library',
    title: '기초 데이터 자료실',
    href: '/excel-library',
    Icon: BackupIcon,
  },
];

export const sideNavItems3: NavItemType[] = [
  {
    navkey: 'account-setting',
    title: '계정 관리',
    href: '/account-setting',
    Icon: ManageAccountsIcon,
  },
];
