import { CalcConfig, ColumnInfo } from '../../models';

export type ConfigColumnInfo = Record<keyof CalcConfig, ColumnInfo>;
export const CONFIG_COLUMN_INFO: ConfigColumnInfo = {
  Description: {
    helperText: '현재 Config 정보를 요약해 설명할 수 있는 텍스트',
    disabled: false,
  },
  SATCalcCaseNo: {
    helperText: '사용할 SAT 계산 케이스의 번호입니다',
    disabled: false,
  },
  HSBCalcCaseNo: {
    helperText: '사용할 HSB 계산 케이스의 번호입니다',
    disabled: false,
  },
  CalcConfigID: {
    helperText: '현재 설정의 고유 ID입니다',
    disabled: true,
  },
  CalcMethodID: {
    helperText: '현재 설정에서 사용할 Method의 고유 ID입니다',
    disabled: false,
  },
  ServiceID: {
    helperText: '서비스 ID',
    disabled: true,
  },
};
