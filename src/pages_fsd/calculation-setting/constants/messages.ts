export const CONFIG_SETTING_DESCRIPTION =
  '서비스의 점수 계산 설정을 관리합니다. 학생부(HSB)와 수능(SAT) 점수계산에 필요한 설정을 정의하고, CalcMethodConfig를 참조하여 실제 계산로직을 적용합니다';

export const METHOD_SETTING_DESCRIPTION =
  '서비스의 점수 계산 메서드를 관리합니다. ScoreCalcMethodConfig는 점수계산 방식의 상세 로직을 정의하는 테이블입니다. 학생부(HSB)와 수능(SAT)점수 계산에 필요한 단계별 계산 방식을 JSON 형태로 저장하여 관리합니다.';

export const CONVERSION_TABLE_SETTING_DESCRIPTION =
  '서비스의 점수 변환 테이블을 관리합니다. ScoreConversionTable은 서비스별 점수 변환 규칙을 저장하고 관리하는 테이블입니다. 다양한 형태의 점수 체계를 표준화된 방식으로 변환하는 데 사용됩니다';
