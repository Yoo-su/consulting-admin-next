import { TableCellProps } from '@mui/material/TableCell';

import { TableBoardType } from '../models';

export const TABLE_HEADER_CELLS: readonly {
  id: keyof TableBoardType;
  label: string;
  align: TableCellProps['align'];
}[] = [
  {
    id: 'univID',
    label: '대학명',
    align: 'left',
  },
  {
    id: 'serviceID',
    label: '서비스ID',
    align: 'right',
  },
  {
    id: 'developerName',
    label: '담당 개발자',
    align: 'right',
  },
  {
    id: 'managerName',
    label: '담당 운영자',
    align: 'right',
  },
  {
    id: 'currentState',
    label: '현재 상태',
    align: 'right',
  },
  {
    id: 'isNew',
    label: '신규앱 여부',
    align: 'right',
  },
];
