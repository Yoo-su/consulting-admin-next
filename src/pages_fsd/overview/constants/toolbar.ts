import PeopleIcon from '@mui/icons-material/People';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SplitscreenRoundedIcon from '@mui/icons-material/SplitscreenRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import ViewWeekRoundedIcon from '@mui/icons-material/ViewWeekRounded';

import { ToolbarMenuItem, ToolbarViewOption } from '../models';

export const TOOLBAR_MENU_ITEMS: ToolbarMenuItem[] = [
  {
    title: '나의 진행현황',
    displayType: 'mainUser',
    Icon: PersonRoundedIcon,
  },
  {
    title: '전체 진행현황',
    displayType: 'all',
    Icon: PeopleIcon,
  },
];

export const VIEW_OPTIONS: ToolbarViewOption[] = [
  {
    title: '기본',
    displayType: 'basic',
    Icon: ViewWeekRoundedIcon,
  },
  {
    title: '개발자별',
    displayType: 'separated',
    Icon: SplitscreenRoundedIcon,
  },
  {
    title: '목록',
    displayType: 'table',
    Icon: TableRowsRoundedIcon,
  },
];
