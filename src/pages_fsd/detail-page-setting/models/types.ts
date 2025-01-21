import { COMPARISON_OPERATORS } from '../constants';

export type Operator = keyof typeof COMPARISON_OPERATORS;

export type Mode = 'calc' | 'detail';

export type ConditionLogic = 'and' | 'or' | '';
export type Condition = {
  idx: number;
  logic: ConditionLogic;
  dataType: string;
  value: any;
  eqValue: Operator;
};

export type DetailPageData = {
  serviceID: string;
  rowNum: number;
  condition: string;
  htmlCard: string;
  conditionText: string;
  mode: Mode;
};
