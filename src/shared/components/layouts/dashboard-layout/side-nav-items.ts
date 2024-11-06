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
import StorageIcon from '@mui/icons-material/Storage';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { PATHS } from '@/shared/constants/paths';
import { NavItemGroup, NavItemType } from '@/shared/models';

const basicItems: NavItemType[] = [
  {
    navkey: 'home',
    title: '진행 현황판',
    href: PATHS.dashboard.overview,
    Icon: HomeIcon,
  },
  {
    navkey: 'service-setting',
    title: '서비스 설정',
    href: PATHS.dashboard.serviceSetting,
    Icon: SettingIcon,
  },
  {
    navkey: 'version-setting',
    title: '버전 설정',
    href: PATHS.dashboard.versionSetting,
    Icon: PlusOneIcon,
  },
];
const excelItems: NavItemType[] = [
  {
    navkey: 'excel',
    title: '기초 데이터 업로드',
    href: PATHS.dashboard.excelUpload,
    Icon: UploadFileIcon,
  },
  {
    navkey: 'excel-library',
    title: '기초 데이터 자료실',
    href: PATHS.dashboard.excelLibrary,
    Icon: LibraryBooksIcon,
  },
];

const settingItems: NavItemType[] = [
  {
    navkey: 'consulting-files-setting',
    title: '상담 자료 관리',
    href: PATHS.dashboard.consultingFilesSetting,
    Icon: DifferenceIcon,
  },
  {
    navkey: 'app-version-history',
    title: '앱 주소 & 배포 목록',
    href: PATHS.dashboard.appVersionHistory,
    Icon: DownloadIcon,
  },
  {
    navkey: 'major-file-library',
    title: '학과 자료실',
    href: PATHS.dashboard.majorFileLibrary,
    Icon: PictureAsPdfIcon,
  },
  {
    navkey: 'etc-files',
    title: '기타 자료실',
    href: PATHS.dashboard.etcFiles,
    Icon: FolderCopyIcon,
  },
];

const flutterItems: NavItemType[] = [
  {
    navkey: 'flutter-setting',
    title: '앱 사용자 설정',
    href: PATHS.dashboard.flutterUserSettigs,
    Icon: ListAltIcon,
  },
  {
    navkey: 'consulting-statistic',
    title: '상담 통계',
    href: PATHS.dashboard.consultingStatistic,
    Icon: AnalyticsIcon,
  },
  {
    navkey: 'mojip-setting',
    title: '모집요강 설정',
    href: PATHS.dashboard.mojipSetting,
    Icon: NoteAltIcon,
  },
  {
    navkey: 'mojip-data-manage',
    title: '모집요강 데이터 관리',
    href: PATHS.dashboard.mojipDataManage,
    Icon: StorageIcon,
  },
  {
    navkey: 'chart-setting',
    title: '차트데이터 설정',
    href: PATHS.dashboard.chartSetting,
    Icon: AddchartIcon,
  },
  {
    navkey: 'schedule-setting',
    title: '입시일정 설정',
    href: PATHS.dashboard.scheduleSetting,
    Icon: EditCalendarIcon,
  },
];

const deployItems: NavItemType[] = [
  {
    navkey: 'data-deploy',
    title: '데이터 동기화 & 배포',
    href: PATHS.dashboard.dataDeploy,
    Icon: LanIcon,
  },
  {
    navkey: 'app-deploy',
    title: 'Flutter앱 배포',
    href: PATHS.dashboard.appDeploy,
    Icon: CloudUploadIcon,
  },
];
const profileItems: NavItemType[] = [
  {
    navkey: 'account-setting',
    title: '계정 관리',
    href: PATHS.dashboard.accountSetting,
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
    items: profileItems,
  },
];
