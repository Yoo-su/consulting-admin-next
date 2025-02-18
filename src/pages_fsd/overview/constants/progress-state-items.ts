import { ProgressStateColumns } from '../models';

export const PROGRESS_STATE_ITEMS: ProgressStateColumns = {
  notStarted: {
    key: 'notStarted',
    title: '시작하지 않음',
    color: '#d8d8d8',
    bgcolor: '#f3f4f6',
  },
  dataRequested: {
    key: 'dataRequested',
    title: '기초데이터 요청',
    color: '#FDECC8',
    bgcolor: '#FBF9F2',
  },
  developing: {
    key: 'developing',
    title: '개발 진행중',
    color: '#c3e7fd',
    bgcolor: '#f5fbff',
  },
  testing: {
    key: 'testing',
    title: '테스트 진행중',
    color: '#c7acd0',
    bgcolor: '#EAE4F2',
  },
  deployed: {
    key: 'deployed',
    title: '리얼배포 완료',
    color: '#b4d3b2',
    bgcolor: '#DDEDEA',
  },
  running: {
    key: 'running',
    title: '서비스 진행중',
    color: '#d9c4b6',
    bgcolor: '#f5efec',
  },
};
