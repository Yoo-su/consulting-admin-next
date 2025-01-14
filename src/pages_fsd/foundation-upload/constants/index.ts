import { CODE_SHEET } from './code-sheet';
import { COLLEGE_SHEET } from './college-sheet';
import { CONSTRAINT_CASE_SHEET } from './constraint-case-sheet';
import { HSB_CASE_SHEET } from './hsb-case-sheet';
import { HSB_INPUT_SHEET } from './hsb-input-sheet';
import { MAJOR_SHEET } from './major-sheet';
import { ORDER_SHEET } from './order-sheet';
import { SAT_CASE_SHEET } from './sat-case-sheet';
import { SAT_SELECT_SHEET } from './sat-select-sheet';
import { SCHEDULE_SHEET } from './schedule-sheet';
import { SELTYPE_SHEET } from './seltype-sheet';
import { SERVICE_SHEET } from './service-sheet';
export { BASE_LAYOUT_URL } from './base-layout-url';
export { EXCEL_UPLOAD_STEPS } from './excel-upload-steps';
export { SHEET_FLAG } from './sheet-flag';
export { SHEET_NAME_MAP } from './sheet-name-map';

export const EXCEL_LAYOUT: any = {
  Service: SERVICE_SHEET,
  Code: CODE_SHEET,
  Seltype: SELTYPE_SHEET,
  College: COLLEGE_SHEET,
  Order: ORDER_SHEET,
  Major: MAJOR_SHEET,
  ConstraintCase: CONSTRAINT_CASE_SHEET,
  SATCase: SAT_CASE_SHEET,
  SATSelect: SAT_SELECT_SHEET,
  HSBCase: HSB_CASE_SHEET,
  HSBInput: HSB_INPUT_SHEET,
  Schedule: SCHEDULE_SHEET,
};
