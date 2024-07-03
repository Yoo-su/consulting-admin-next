import { COMPARISON_OPERATORS, DATA_TYPES } from '../constants';

export type Operator = keyof typeof COMPARISON_OPERATORS;

export type Condition = {
  idx: number;
  logic: 'and' | 'or' | '';
  dataType: string;
  value: any;
  eqValue: Operator;
};
