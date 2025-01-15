import { TableCellProps } from '@mui/material';

export enum ServiceTypeNum {
  SUSI = '1',
  JUNGSI = '0',
}
export const serviceTypeList = [
  { label: '수시', value: ServiceTypeNum.SUSI },
  { label: '정시', value: ServiceTypeNum.JUNGSI },
];

export const ServiceTableHeader: ({
  label: string;
  value: string;
} & Partial<TableCellProps>)[] = [
  {
    label: '서비스ID',
    value: 'serviceID',
  },
  {
    label: '서비스년도',
    value: 'schoolYear',
  },
  {
    label: '서비스유형',
    value: 'serviceType',
  },
  {
    label: '앱 타입',
    value: 'isNew',
    align: 'center',
  },
  // {
  //   label: '담당 개발자',
  //   value: 'developer',
  // align: 'center',
  // },
  // {
  //   label: '담당 운영자',
  //   value: 'operator',
  // align: 'center',
  // },
];
