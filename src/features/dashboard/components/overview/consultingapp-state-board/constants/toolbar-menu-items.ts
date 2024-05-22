import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import TableChartIcon from '@mui/icons-material/TableChart';

import { ToolbarMenuItem } from '../types/toolbar-menu-item.type';

export const toolbarMenuItems: ToolbarMenuItem[] = [
  {
    title: '진행현황',
    displayType: 'basic',
    Icon: LanguageIcon,
  },
  {
    title: '개발자별 진행현황',
    displayType: 'developer',
    Icon: PeopleIcon,
  },
  {
    title: '전체 리스트',
    displayType: 'table',
    Icon: TableChartIcon,
  },
];
