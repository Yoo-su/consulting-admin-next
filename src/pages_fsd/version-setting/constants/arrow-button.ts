export const allArrowButtonList = [
  {
    title: '전체 버전을 1씩 내립니다.',
    id: 'all-down',
    classes: { backgroundColor: '#FAFAFA' },
    isUp: false,
  },
  {
    title: '전체 버전을 1씩 추가합니다.',
    id: 'all-up',
    classes: { backgroundColor: '#FAFAFA' },
    isUp: true,
  },
] as const;

export const arrowButtonList = {
  down: {
    title: '버전을 1씩 내립니다.',
    isUp: false,
  },
  up: {
    title: '버전을 1씩 추가합니다.',
    isUp: true,
  },
} as const;
