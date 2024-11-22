import { CalcMethod, ColumnInfo } from '../../models';

export type MethodColumnInfo = Record<keyof CalcMethod, ColumnInfo>;
export const METHOD_COLUMN_INFO: MethodColumnInfo = {
  Description: {
    helperText: '현재 Config 정보를 요약해 설명할 수 있는 텍스트',
    disabled: false,
  },
  CalcMethodID: {
    helperText: '현재 메서드의 고유 ID입니다',
    disabled: true,
  },
  CalcMethodType: {
    helperText: '현재 메서드에서 사용할 계산 방식입니다. (HSB 또는 SAT)',
    disabled: false,
  },
  ConfigJSON: {
    helperText: '설정에 대한 상세한 정보를 담고 있는 JSON 데이터입니다',
    disabled: false,
  },
  ServiceID: {
    helperText: '서비스 ID',
    disabled: true,
  },
};
