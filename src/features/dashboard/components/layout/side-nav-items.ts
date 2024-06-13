'use client';
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings';
import DifferenceIcon from '@mui/icons-material/Difference';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DownloadIcon from '@mui/icons-material/Download';
import LanIcon from '@mui/icons-material/Lan';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { paths } from '@/shared/constants/paths';
import { NavItemGroup, NavItemType } from '../../types/nav-item.type';

const basicItems: NavItemType[] = [
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
];
const excelItems: NavItemType[] = [
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
];

const settingItems: NavItemType[] = [
  {
    navkey: 'consulting-files-setting',
    title: '상담 자료 관리',
    href: paths.dashboard.consultingFilesSetting,
    Icon: DifferenceIcon,
  },
  {
    navkey: 'app-version-history',
    title: '앱 다운로드 정보',
    href: paths.dashboard.appVersionHistory,
    Icon: DownloadIcon,
  },
  {
    navkey: 'etc-files',
    title: '기타 자료실',
    href: paths.dashboard.etcFiles,
    Icon: FolderCopyIcon,
  },
];

const flutterItems: NavItemType[] = [
  {
    navkey: 'flutter-setting',
    title: '앱 사용자 설정',
    href: paths.dashboard.flutterUserSettigs,
    Icon: ListAltIcon,
  },
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

const deployItems: NavItemType[] = [
  {
    navkey: 'data-deploy',
    title: '데이터 배포',
    href: paths.dashboard.dataDeploy,
    Icon: LanIcon,
  },
  {
    navkey: 'app-deploy',
    title: '상담앱 배포',
    href: paths.dashboard.appDeploy,
    Icon: CloudUploadIcon,
  },
];
const sideNavItems4: NavItemType[] = [
  {
    navkey: 'account-setting',
    title: '계정 관리',
    href: paths.dashboard.accountSetting,
    Icon: ManageAccountsIcon,
  },
];

export const sideNavGroup: NavItemGroup[] = [
  {
    title: '기본',
    items: basicItems,
    isExpanded: true,
  },
  {
    title: '기초 설정',
    items: excelItems,
    isExpanded: true,
  },
  {
    title: '공용 설정',
    items: settingItems,
    isExpanded: true,
  },
  {
    title: '배포 설정',
    items: deployItems,
    isExpanded: true,
  },
  {
    title: '플러터앱 설정',
    items: flutterItems,
  },
  {
    title: '계정',
    items: sideNavItems4,
  },
];
