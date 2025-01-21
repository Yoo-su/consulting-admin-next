import { DEFAULT_CONDITION } from '../constants/defalut-condition';
import { ConditionLogic } from '../models';

export const getNewCondition = (idx: number, logic: ConditionLogic) => {
  return {
    ...DEFAULT_CONDITION,
    idx: idx,
    logic: logic,
  };
};
